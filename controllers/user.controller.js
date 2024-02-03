const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json')
const upload = require('../middlewares/upload');
const stream = require('stream');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://recallriot-flashcard.appspot.com', // firebase storage updated
});

dotenv.config();

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ _id: user._id, username: user.username, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
};
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});


const bucket = admin.storage().bucket();

const userController = {
  // Signup
  signup: async function (req, res) {
    try {
      const { username, email, password } = req.body;

      // Check if the username or email already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists.' });
      }

      // Create a new user
      const newUser = new User({ username, email, password });

      // Save the user to the database
      await newUser.save();

      // Generate a verification token
      const verificationToken = jwt.sign({ userId: newUser._id }, process.env.VERIFICATION_SECRET, {
        expiresIn: '1h', // Set an expiration time for the verification token
      });

      // Construct the verification link
      const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

      // Send the verification email
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Email Verification',
        text: `Click the following link to verify your email: ${verificationLink}`,
      };

      // Send verification email using nodemailer transporter
      await transporter.sendMail(mailOptions);

      res.status(201).json({ message: 'Account created successfully. Check your email for verification.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Login
  login: async function (req, res) {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Check if the password is valid
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password.' });
      }

      // Generate JWT token
      const token = generateToken(user);

      // Return the token and user information
      res.status(200).json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  //upload profile picture
  uploadProfileImage: async function (req, res) {
  try {
    const userId = req.user._id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const destination = `profile-images/${userId}/${file.originalname}`;
    const uploadOptions = {
      destination,
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    };

    // Create a writable stream
    const fileStream = bucket.file(destination).createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    // Pipe the buffer into the writable stream
    fileStream.end(file.buffer);

    // Wait for the upload to finish
    await new Promise((resolve, reject) => {
      fileStream.on('error', reject);
      fileStream.on('finish', resolve);
    });

    // Get the signed URL
    const [url] = await bucket.file(destination).getSignedUrl({ action: 'read', expires: '01-01-2500' });

    await User.findByIdAndUpdate(userId, { profileImageUrl: url });

    res.status(200).json({ message: 'Profile image uploaded successfully.', imageUrl: url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}, 
   // Delete Account
  deleteAccount: async function (req, res) {
    try {
      const userId = req.user._id;

      // Delete the user account
      await User.findByIdAndDelete(userId);

      // Return a success message
      res.status(200).json({ message: 'Account deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
 
};

module.exports = { userController };

