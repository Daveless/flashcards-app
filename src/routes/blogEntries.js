const express = require('express');
const router = express.Router();
const {
  getAllBlogEntries,
  getBlogEntryById,
  createBlogEntry,
  updateBlogEntry,
  deleteBlogEntry,
  scoreBlogEntry
} = require('../controllers/blogEntryController');
const auth = require('../middlewares/auth');

// @route   GET api/blog-entries
// @desc    Get all blog entries
// @access  Public
router.get('/', getAllBlogEntries);

// @route   GET api/blog-entries/:id
// @desc    Get blog entry by ID
// @access  Public
router.get('/:id', getBlogEntryById);

// @route   POST api/blog-entries
// @desc    Create a new blog entry
// @access  Private
router.post('/', auth, createBlogEntry);

// @route   PUT api/blog-entries/:id
// @desc    Update a blog entry
// @access  Private
router.put('/:id', auth, updateBlogEntry);

// @route   DELETE api/blog-entries/:id
// @desc    Delete a blog entry
// @access  Private
router.delete('/:id', auth, deleteBlogEntry);

// @route   POST api/blog-entries/:id/score
// @desc    Score a blog entry
// @access  Private
router.post('/:id/score', auth, scoreBlogEntry);

module.exports = router;