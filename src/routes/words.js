const express = require('express');
const router = express.Router();
const {
  getAllWords,
  getWordById,
  createWord,
  updateWord,
  deleteWord,
  getWordsByDeckId
} = require('../controllers/wordController');
const auth = require('../middlewares/auth');

// @route   GET api/words
// @desc    Get all words
// @access  Public
router.get('/', getAllWords);

// @route   GET api/words/:id
// @desc    Get word by ID
// @access  Public
router.get('/:id', getWordById);

// @route   POST api/words
// @desc    Create a new word
// @access  Private
router.post('/', auth, createWord);

// @route   PUT api/words/:id
// @desc    Update a word
// @access  Private
router.put('/:id', auth, updateWord);

// @route   DELETE api/words/:id
// @desc    Delete a word
// @access  Private
router.delete('/:id', auth, deleteWord);

// @route   GET api/words/deck/:deckId
// @desc    Get words by deck ID
// @access  Public
router.get('/deck/:deckId', getWordsByDeckId);

module.exports = router;