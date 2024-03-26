// flashcard.controller.js
const Flashcard = require('../models/flashcard.model');
const User = require('../models/user.model');
const Category = require('../models/category.model');
const Tag = require('../models/tag.model');

const flashcardController = {
  // Create Flashcard
  createFlashcard: async (req, res) => {
    try {
      const { question, answer, categories, tags } = req.body;
      const createdBy = req.user._id;

      // Check if categories exist
      const existingCategories = await Category.find({ _id: { $in: categories } });
      if (existingCategories.length !== categories.length) {
        return res.status(400).json({ message: 'One or more categories do not exist.' });
      }

      // Check if tags exist
      const existingTags = await Tag.find({ _id: { $in: tags } });
      if (existingTags.length !== tags.length) {
        return res.status(400).json({ message: 'One or more tags do not exist.' });
      }

      const newFlashcard = new Flashcard({
        question,
        answer,
        categories,
        tags,
        createdBy,
      });

      await newFlashcard.save();

      res.status(201).json({ flashcard: newFlashcard });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Get Single Flashcard
  getFlashcard: async (req, res) => {
    try {
      const flashcardId = req.params.flashcardId;

      const flashcard = await Flashcard.findById(flashcardId).populate('categories tags');

      if (!flashcard) {
        return res.status(404).json({ message: 'Flashcard not found.' });
      }

      res.status(200).json({ flashcard });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // List Flashcards
  listFlashcards: async (req, res) => {
    try {
      const flashcards = await Flashcard.find().populate('categories tags');

      res.status(200).json({ flashcards });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Update Flashcard
  updateFlashcard: async (req, res) => {
    try {
      const flashcardId = req.params.flashcardId;
      const { question, answer, categories, tags } = req.body;
      const createdBy = req.user._id;

      // Check if the flashcard exists
      const flashcard = await Flashcard.findById(flashcardId);
      if (!flashcard) {
        return res.status(404).json({ message: 'Flashcard not found.' });
      }

      // Check if the user is the creator of the flashcard
      if (flashcard.createdBy.toString() !== createdBy.toString()) {
        return res.status(403).json({ message: 'You do not have permission to update this flashcard.' });
      }

      // Check if categories exist
      const existingCategories = await Category.find({ _id: { $in: categories } });
      if (existingCategories.length !== categories.length) {
        return res.status(400).json({ message: 'One or more categories do not exist.' });
      }

      // Check if tags exist
      const existingTags = await Tag.find({ _id: { $in: tags } });
      if (existingTags.length !== tags.length) {
        return res.status(400).json({ message: 'One or more tags do not exist.' });
      }

      // Update the flashcard
      flashcard.question = question;
      flashcard.answer = answer;
      flashcard.categories = categories;
      flashcard.tags = tags;
      await flashcard.save();

      res.status(200).json({ flashcard });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Delete Flashcard
  deleteFlashcard: async (req, res) => {
    try {
      const flashcardId = req.params.flashcardId;
      const createdBy = req.user._id;

      // Check if the flashcard exists
      const flashcard = await Flashcard.findById(flashcardId);
      if (!flashcard) {
        return res.status(404).json({ message: 'Flashcard not found.' });
      }

      // Check if the user is the creator of the flashcard
      if (flashcard.createdBy.toString() !== createdBy.toString()) {
        return res.status(403).json({ message: 'You do not have permission to delete this flashcard.' });
      }

      // Delete the flashcard
      await Flashcard.deleteOne({ _id: flashcardId });

      res.status(200).json({ message: 'Flashcard deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = flashcardController;

