const express = require('express');
const passwordValidator = require('password-validator');
const { userController } = require('../controllers/user.controller.js');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const upload = require('../middlewares/upload');
const multer = require('multer');

// Create a password schema
const passwordSchema = new passwordValidator();
passwordSchema
  .is().min(6)            // Minimum length 6
  .has().uppercase()      // Must have uppercase letters
  .has().lowercase()      // Must have lowercase letters
  .has().digits(1)        // Must have at least 1 digit
  .has().symbols(1)       // Must have at least 1 symbol
  .is().not().spaces();   // Should not have spaces

// Signup route
router.post('/signup', (req, res, next) => {
  // Validate password
  const password = req.body.password;
  const isPasswordValid = passwordSchema.validate(password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: 'Password does not meet the required criteria.',
      errors: passwordSchema.validate(password, { list: true }),
    });
  }

  // Continue with signup logic if password is valid
  userController.signup(req, res, next);
});


// Login route
router.post('/login', userController.login);
// update profile-image-route
router.post('/upload-profile-image', authMiddleware, upload.single('profileImage'), userController.uploadProfileImage);
// Delete Account route
router.delete('/delete-account', authMiddleware, userController.deleteAccount);


module.exports = router;

