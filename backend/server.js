require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(503).json({ status: 'unavailable' });
  }
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/lessons', require('./routes/lessons.routes'));
app.use('/api/progress', require('./routes/progress.routes'));
app.use('/api/projects', require('./routes/projects.routes'));
app.use('/api/notes', require('./routes/notes.routes'));

// Serve static frontend (including /uploads)
app.use(express.static(path.join(__dirname, '../frontend')));

// Catch-all for unhandled API routes (prevents Express default HTML 404)
app.use('/api', (req, res) => {
  res.status(404).json({ msg: 'API route not found: ' + req.path });
});

// Fallback: only for non-API page routes
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Global JSON error handler — catches multer and other errors
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(err.status || 500).json({ msg: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
