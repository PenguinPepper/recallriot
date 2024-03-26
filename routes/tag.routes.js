const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const tagController = require('../controllers/tag.controller');

// Create Tag
router.post('/', authMiddleware, tagController.createTag);

// List Tags
router.get('/', tagController.listTags);

// Update Tag
router.put('/:tagId', authMiddleware, tagController.updateTag);

// Delete Tag
router.delete('/:tagId', authMiddleware, tagController.deleteTag);

module.exports = router;

