const db = require('../db');

exports.getNotes = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT n.*, c.name as category_name, l.title as lesson_title
      FROM notes n
      LEFT JOIN learning_categories c ON n.category_id = c.id
      LEFT JOIN lessons l ON n.lesson_id = l.id
      WHERE n.user_id = $1
      ORDER BY n.created_at DESC
    `, [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createNote = async (req, res) => {
  const { title, content, category_id, lesson_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO notes (user_id, title, content, category_id, lesson_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, title, content, category_id || null, lesson_id || null]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, category_id, lesson_id } = req.body;
  try {
    const check = await db.query('SELECT * FROM notes WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    if (check.rows.length === 0) return res.status(404).json({ msg: 'Note not found' });
    
    const result = await db.query(
      'UPDATE notes SET title = $1, content = $2, category_id = $3, lesson_id = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 AND user_id = $6 RETURNING *',
      [title, content, category_id || null, lesson_id || null, id, req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const check = await db.query('SELECT * FROM notes WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    if (check.rows.length === 0) return res.status(404).json({ msg: 'Note not found' });
    
    await db.query('DELETE FROM notes WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    res.json({ msg: 'Note removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
