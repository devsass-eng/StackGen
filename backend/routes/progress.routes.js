const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress.controller');
const auth = require('../middleware/auth');

router.put('/:lessonId', auth, progressController.updateProgress);
router.get('/stats', auth, progressController.getProgressStats);

module.exports = router;
