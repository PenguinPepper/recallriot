const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const flashcardRoutes = require('./routes/flashcard.routes');
const categoryRoutes = require('./routes/category.routes');
const tagRoutes = require('./routes/tag.routes');

dotenv.config();

// Load environment variables
const { MONGODB_URI, PORT } = process.env;

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  // Add your MongoDB configuration options if needed
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB, you can now start to test your endpoint');
});

// Routes
app.get('/', (req, res) => res.send('Hello RecallRiot!'));

// Authentication routes
app.use('/auth', authRoutes);

// Flashcard routes
app.use('/flashcards', flashcardRoutes);

// Category routes
app.use('/categories', categoryRoutes);

// Tag routes
app.use('/tags', tagRoutes);

// Start server
const PORT_NUMBER = PORT || 3003;
app.listen(PORT_NUMBER, () => console.log(`Server running on port ${PORT_NUMBER}`));

