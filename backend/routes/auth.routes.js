const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../frontend/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, 'avatar-' + req.user.id + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', auth, authController.getUser);
router.put('/update-profile', auth, authController.updateProfile);
router.put('/change-password', auth, authController.changePassword);

// Upload profile picture with multer error forwarding
router.post('/upload-profile-picture', auth, (req, res, next) => {
  upload.single('avatar')(req, res, (err) => {
    if (err) return next(err); // pass multer errors to global JSON error handler
    next();
  });
}, authController.uploadProfilePicture);

module.exports = router;
