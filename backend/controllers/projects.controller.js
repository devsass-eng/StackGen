const db = require('../db');

exports.getProjects = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createProject = async (req, res) => {
  const { name, description, technologies, status, start_date, completion_date, notes } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO projects (user_id, name, description, technologies, status, start_date, completion_date, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [req.user.id, name, description, technologies, status || 'planned', start_date || null, completion_date || null, notes]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, technologies, status, start_date, completion_date, notes } = req.body;
  try {
    const check = await db.query('SELECT * FROM projects WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    if (check.rows.length === 0) return res.status(404).json({ msg: 'Project not found' });
    
    const result = await db.query(
      'UPDATE projects SET name = $1, description = $2, technologies = $3, status = $4, start_date = $5, completion_date = $6, notes = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8 AND user_id = $9 RETURNING *',
      [name, description, technologies, status, start_date, completion_date, notes, id, req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const check = await db.query('SELECT * FROM projects WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    if (check.rows.length === 0) return res.status(404).json({ msg: 'Project not found' });
    
    await db.query('DELETE FROM projects WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
