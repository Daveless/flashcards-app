const express = require('express');
const router = express.Router();
const {
  getAllDecks,
  getDeckById,
  createDeck,
  updateDeck,
  deleteDeck,
  filterDecks,
  addWordToDeck,
  updateDeckScore
} = require('../controllers/deckController');
const auth = require('../middlewares/auth');

// @route   GET api/decks
// @desc    Get all decks
// @access  Public
router.get('/', getAllDecks);

// @route   GET api/decks/filter
// @desc    Filter decks
// @access  Public
router.get('/filter', filterDecks);

// @route   GET api/decks/:id
// @desc    Get deck by ID
// @access  Public
router.get('/:id', getDeckById);

// @route   POST api/decks
// @desc    Create a new deck
// @access  Private
router.post('/', auth, createDeck);

// @route   PUT api/decks/:id
// @desc    Update a deck
// @access  Private
router.put('/:id', auth, updateDeck);

// @route   DELETE api/decks/:id
// @desc    Delete a deck
// @access  Private
router.delete('/:id', auth, deleteDeck);

// @route   POST api/decks/:id/words
// @desc    Add a word to a deck
// @access  Private
router.post('/:id/words', auth, addWordToDeck);

// @route   PUT api/decks/:id/score
// @desc    Update deck score
// @access  Private
router.put('/:id/score', auth, updateDeckScore);

module.exports = router;