const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');
const multer = require('multer');
// Keep uploads in memory; the controller saves them to durable database storage.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      const error = new Error('Upload a JPEG, PNG, or WebP image (maximum 2 MB).');
      error.status = 400;
      return cb(error);
    }
    cb(null, true);
  }
});

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
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
