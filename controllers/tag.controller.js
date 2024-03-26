// tag.controller.js
const Tag = require('../models/tag.model');

const tagController = {
  // Create Tag
  createTag: async (req, res) => {
    try {
      const { name } = req.body;

      const existingTag = await Tag.findOne({ name });
      if (existingTag) {
        return res.status(400).json({ message: 'Tag already exists.' });
      }

      const newTag = new Tag({ name });
      await newTag.save();

      res.status(201).json({ tag: newTag });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // List Tags
  listTags: async (req, res) => {
    try {
      const tags = await Tag.find();

      res.status(200).json({ tags });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Update Tag
  updateTag: async (req, res) => {
    try {
      const tagId = req.params.tagId;
      const { name } = req.body;

      const tag = await Tag.findById(tagId);
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found.' });
      }

      tag.name = name;
      await tag.save();

      res.status(200).json({ tag });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Delete Tag
  deleteTag: async (req, res) => {
    try {
      const tagId = req.params.tagId;

      const tag = await Tag.findById(tagId);
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found.' });
      }

      await tag.deleteOne();

      res.status(200).json({ message: 'Tag deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = tagController;

