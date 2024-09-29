const { User, Deck, BlogEntry } = require('../models');

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Deck, as: 'activeDecks' },
        { model: Deck, as: 'savedDecks' },
        { model: BlogEntry, as: 'scoredPosts' }
      ]
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, lastname, avatar_model } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.name = name || user.name;
    user.lastname = lastname || user.lastname;
    user.avatar_model = avatar_model || user.avatar_model;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getUserDecks = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        { model: Deck, as: 'activeDecks' },
        { model: Deck, as: 'savedDecks' }
      ]
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      activeDecks: user.activeDecks,
      savedDecks: user.savedDecks
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addNotification = async (req, res) => {
  try {
    const { body } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.notifications = [...user.notifications, { body, checked_status: false }];
    await user.save();
    res.json(user.notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateNotificationStatus = async (req, res) => {
  try {
    const { notificationIndex } = req.params;
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (notificationIndex >= user.notifications.length) {
      return res.status(400).json({ error: 'Invalid notification index' });
    }
    user.notifications[notificationIndex].checked_status = true;
    await user.save();
    res.json(user.notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};