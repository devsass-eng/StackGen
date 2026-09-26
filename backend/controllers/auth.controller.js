const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, password_hash]
    );

    const payload = { user: { id: newUser.rows[0].id } };
    
    // Seed initial progress for the user based on instructions:
    // HTML, CSS, Responsive Design -> completed
    // JavaScript -> in_progress
    // All others -> not_started
    
    const lessons = await db.query('SELECT id, category_id FROM lessons');
    
    // category_id mapping from seed.sql: 
    // 1: HTML, 2: CSS, 3: Responsive Design, 4: JavaScript
    
    for (let lesson of lessons.rows) {
      let status = 'not_started';
      if (lesson.category_id <= 3) {
        status = 'completed';
      } else if (lesson.category_id === 4) {
        status = 'in_progress'; // Let's mark all JS lessons as not_started by default except first one maybe? No, instructions say JS = In Progress. We can set them to not_started and just have the category "in_progress", or mark the first JS lesson as in_progress. Let's just default them to not_started, and mark the very first JS lesson as in_progress to make the category active.
      }
      
      let completedAt = status === 'completed' ? new Date() : null;
      
      // If JS, let's mark just the first one as in_progress
      if (lesson.category_id === 4 && status !== 'completed') {
        const firstJsLesson = await db.query('SELECT id FROM lessons WHERE category_id = 4 ORDER BY order_index ASC LIMIT 1');
        if (firstJsLesson.rows.length > 0 && lesson.id === firstJsLesson.rows[0].id) {
          status = 'in_progress';
        }
      }

      await db.query(
        'INSERT INTO user_progress (user_id, lesson_id, status, completed_at) VALUES ($1, $2, $3, $4)',
        [newUser.rows[0].id, lesson.id, status, completedAt]
      );
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: newUser.rows[0] });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = { user: { id: user.id } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, profile_picture: user.profile_picture, phone: user.phone, address: user.address, bio: user.bio } });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userResult = await db.query('SELECT id, name, email, created_at, profile_picture, phone, address, bio, date_of_birth FROM users WHERE id = $1', [req.user.id]);
    res.json(userResult.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    
    // The file is saved by multer in frontend/uploads. We store the relative URL.
    const fileUrl = `/uploads/${req.file.filename}`;
    
    await db.query('UPDATE users SET profile_picture = $1 WHERE id = $2', [fileUrl, req.user.id]);
    
    res.json({ msg: 'Profile picture updated', profile_picture: fileUrl });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, email, phone, address, bio, date_of_birth } = req.body;
  try {
    // Check if email is taken by another user
    if (email) {
      const emailCheck = await db.query('SELECT id FROM users WHERE email = $1 AND id != $2', [email, req.user.id]);
      if (emailCheck.rows.length > 0) {
        return res.status(400).json({ msg: 'Email is already in use by another account' });
      }
    }

    const result = await db.query(
      'UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), phone = $3, address = $4, bio = $5, date_of_birth = $6 WHERE id = $7 RETURNING id, name, email, profile_picture, phone, address, bio, date_of_birth',
      [name, email, phone || null, address || null, bio || null, date_of_birth || null, req.user.id]
    );

    const updatedUser = result.rows[0];
    res.json({ msg: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ msg: 'Enter your current password and a new password' });
  }
  if (newPassword.length < 8) {
    return res.status(400).json({ msg: 'New password must be at least 8 characters long' });
  }

  try {
    const result = await db.query('SELECT password_hash FROM users WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) return res.status(404).json({ msg: 'User not found' });
    const matches = await bcrypt.compare(currentPassword, result.rows[0].password_hash);
    if (!matches) return res.status(400).json({ msg: 'Current password is incorrect' });

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [passwordHash, req.user.id]);
    res.json({ msg: 'Password changed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
