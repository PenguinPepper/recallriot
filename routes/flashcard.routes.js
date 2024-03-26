const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const flashcardController = require('../controllers/flashcard.controller');

// Create Flashcard
router.post('/', authMiddleware, flashcardController.createFlashcard);

// List Flashcards
router.get('/', authMiddleware, flashcardController.listFlashcards);

// Update Flashcard
router.put('/:flashcardId', authMiddleware, flashcardController.updateFlashcard);

// Delete Flashcard
router.delete('/:flashcardId', authMiddleware, flashcardController.deleteFlashcard);

module.exports = router;

