const express = require('express');
const router = express.Router();
const lessonsController = require('../controllers/lessons.controller');
const auth = require('../middleware/auth');

router.get('/', auth, lessonsController.getLessons);
router.get('/:id', auth, lessonsController.getLessonById);

module.exports = router;
