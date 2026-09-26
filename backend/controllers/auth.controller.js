const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
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
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, auth_version',
      [name, email, password_hash]
    );

    const payload = { user: { id: newUser.rows[0].id, authVersion: newUser.rows[0].auth_version } };
    
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

    const payload = { user: { id: user.id, authVersion: user.auth_version || 0 } };

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
    await db.query('DELETE FROM password_reset_tokens WHERE user_id = $1', [req.user.id]);
    res.json({ msg: 'Password changed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  const email = String(req.body.email || '').trim();
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ msg: 'Enter a valid email address.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.PASSWORD_RESET_FROM;
  if (!apiKey || !sender) {
    return res.status(503).json({ msg: 'Password recovery email is not configured yet. Please contact StackGen support.' });
  }

  let pendingTokenHash = null;
  try {
    const userResult = await db.query(
      'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1',
      [email]
    );
    const genericMessage = 'If an account exists for that email, password reset instructions will be sent shortly.';
    if (userResult.rows.length === 0) return res.json({ msg: genericMessage });

    const user = userResult.rows[0];
    const recentRequest = await db.query(
      "SELECT 1 FROM password_reset_tokens WHERE user_id = $1 AND created_at > NOW() - INTERVAL '1 minute' LIMIT 1",
      [user.id]
    );
    if (recentRequest.rows.length) return res.json({ msg: genericMessage });

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    pendingTokenHash = tokenHash;
    await db.query('DELETE FROM password_reset_tokens WHERE user_id = $1 OR expires_at <= NOW()', [user.id]);
    await db.query(
      'INSERT INTO password_reset_tokens (token_hash, user_id, expires_at) VALUES ($1, $2, NOW() + INTERVAL \'1 hour\')',
      [tokenHash, user.id]
    );

    const appUrl = (process.env.APP_URL || (process.env.NODE_ENV === 'production'
      ? 'https://stackgen.onrender.com'
      : 'http://localhost:5000')).replace(/\/+$/, '');
    const resetUrl = `${appUrl}/reset-password.html?token=${rawToken}`;
    const safeName = String(user.name || 'there').replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));

    setImmediate(async () => {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: sender,
            to: [user.email],
            subject: 'Reset your StackGen password',
            html: `<p>Hi ${safeName},</p><p>We received a request to reset your StackGen password.</p><p><a href="${resetUrl}">Choose a new password</a></p><p>This link expires in one hour. If you did not request this, you can ignore this email.</p>`,
            text: `Hi ${user.name || 'there'},\n\nUse this link to reset your StackGen password: ${resetUrl}\n\nThis link expires in one hour. If you did not request this, you can ignore this email.`
          }),
          signal: AbortSignal.timeout(10000)
        });
        if (!emailResponse.ok) {
          console.error('Password reset email delivery failed:', emailResponse.status, await emailResponse.text());
          await db.query('DELETE FROM password_reset_tokens WHERE token_hash = $1', [tokenHash]);
        }
      } catch (err) {
        console.error('Password reset email delivery failed:', err.message);
        try { await db.query('DELETE FROM password_reset_tokens WHERE token_hash = $1', [tokenHash]); } catch (_) {}
      }
    });

    return res.json({ msg: genericMessage });
  } catch (err) {
    if (pendingTokenHash) {
      try { await db.query('DELETE FROM password_reset_tokens WHERE token_hash = $1', [pendingTokenHash]); } catch (_) {}
    }
    console.error('Password reset request failed:', err.message);
    return res.status(500).json({ msg: 'Could not process the password reset request. Please try again later.' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  if (typeof token !== 'string' || !/^[a-f0-9]{64}$/i.test(token)) {
    return res.status(400).json({ msg: 'This password reset link is invalid or has expired.' });
  }
  if (typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ msg: 'Your new password must be at least 8 characters long.' });
  }

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');
    const tokenResult = await client.query(
      'SELECT user_id FROM password_reset_tokens WHERE token_hash = $1 AND expires_at > NOW() FOR UPDATE',
      [tokenHash]
    );
    if (!tokenResult.rows.length) {
      await client.query('ROLLBACK');
      return res.status(400).json({ msg: 'This password reset link is invalid or has expired.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = tokenResult.rows[0].user_id;
    await client.query('UPDATE users SET password_hash = $1, auth_version = auth_version + 1 WHERE id = $2', [passwordHash, userId]);
    await client.query('DELETE FROM password_reset_tokens WHERE user_id = $1', [userId]);
    await client.query('COMMIT');
    return res.json({ msg: 'Your password has been reset. You can now log in with your new password.' });
  } catch (err) {
    try { await client.query('ROLLBACK'); } catch (_) {}
    console.error('Password reset failed:', err.message);
    return res.status(500).json({ msg: 'Could not reset your password. Please try again later.' });
  } finally {
    client.release();
  }
};
