// category.controller.js
const Category = require('../models/category.model');

const categoryController = {
  // Create Category
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;

      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category already exists.' });
      }

      const newCategory = new Category({ name });
      await newCategory.save();

      res.status(201).json({ category: newCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // List Categories
  listCategories: async (req, res) => {
    try {
      const categories = await Category.find();

      res.status(200).json({ categories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Update Category
  updateCategory: async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const { name } = req.body;

      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found.' });
      }

      category.name = name;
      await category.save();

      res.status(200).json({ category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

    // Delete Category
  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.categoryId;

      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found.' });
      }

      await category.deleteOne();

      res.status(200).json({ message: 'Category deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = categoryController;

