const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// Create Category
router.post('/', categoryController.createCategory);

// List Categories
router.get('/', categoryController.listCategories);

// Update Category
router.put('/:categoryId', categoryController.updateCategory);

// Delete Category
router.delete('/:categoryId', categoryController.deleteCategory);

module.exports = router;

