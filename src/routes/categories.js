const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const auth = require('../middlewares/auth');

// @route   GET api/categories
// @desc    Get all categories
// @access  Public
router.get('/', getAllCategories);

// @route   GET api/categories/:id
// @desc    Get category by ID
// @access  Public
router.get('/:id', getCategoryById);

// @route   POST api/categories
// @desc    Create a new category
// @access  Private
router.post('/', auth, createCategory);

// @route   PUT api/categories/:id
// @desc    Update a category
// @access  Private
router.put('/:id', auth, updateCategory);

// @route   DELETE api/categories/:id
// @desc    Delete a category
// @access  Private
router.delete('/:id', auth, deleteCategory);

module.exports = router;