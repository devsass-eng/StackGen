const jwt = require('jsonwebtoken');
const db = require('../db');

module.exports = async function(req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.replace('Bearer ', '');

  // Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
    return;
  }

  try {
    const result = await db.query('SELECT auth_version FROM users WHERE id = $1', [decoded.user.id]);
    const tokenVersion = Number(decoded.user.authVersion || 0);
    if (!result.rows.length || Number(result.rows[0].auth_version) !== tokenVersion) {
      return res.status(401).json({ msg: 'Session expired. Please log in again.' });
    }
    req.user = decoded.user;
    return next();
  } catch (err) {
    return next(err);
  }
};
