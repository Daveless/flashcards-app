const express = require('express');
const router = express.Router();
const {
  getCurrentUser,
  updateUser,
  getUserDecks,
  addNotification,
  updateNotificationStatus
} = require('../controllers/userController');
const auth = require('../middlewares/auth');

// @route   GET api/users/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, getCurrentUser);

// @route   PUT api/users/me
// @desc    Update current user
// @access  Private
router.put('/me', auth, updateUser);

// @route   GET api/users/me/decks
// @desc    Get current user's decks
// @access  Private
router.get('/me/decks', auth, getUserDecks);

// @route   POST api/users/me/notifications
// @desc    Add a notification to current user
// @access  Private
router.post('/me/notifications', auth, addNotification);

// @route   PUT api/users/me/notifications/:notificationIndex
// @desc    Update notification status
// @access  Private
router.put('/me/notifications/:notificationIndex', auth, updateNotificationStatus);

module.exports = router;