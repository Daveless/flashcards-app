const { BlogEntry, User } = require('../models');

exports.getAllBlogEntries = async (req, res) => {
  try {
    const entries = await BlogEntry.findAll({
      include: [{ model: User, as: 'scoringUsers', attributes: ['id', 'name'] }]
    });
    res.json(entries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getBlogEntryById = async (req, res) => {
  try {
    const entry = await BlogEntry.findByPk(req.params.id, {
      include: [{ model: User, as: 'scoringUsers', attributes: ['id', 'name'] }]
    });
    if (!entry) {
      return res.status(404).json({ error: 'Blog entry not found' });
    }
    res.json(entry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createBlogEntry = async (req, res) => {
  try {
    const { title, desc, body } = req.body;
    const entry = await BlogEntry.create({
      title,
      desc,
      body,
      author: req.user.name, // Assuming the user's name is stored in req.user
    });
    res.status(201).json(entry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateBlogEntry = async (req, res) => {
  try {
    const { title, desc, body } = req.body;
    const entry = await BlogEntry.findByPk(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Blog entry not found' });
    }
    if (entry.author !== req.user.name) {
      return res.status(403).json({ error: 'Not authorized to update this blog entry' });
    }
    await entry.update({ title, desc, body });
    res.json(entry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteBlogEntry = async (req, res) => {
  try {
    const entry = await BlogEntry.findByPk(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Blog entry not found' });
    }
    if (entry.author !== req.user.name) {
      return res.status(403).json({ error: 'Not authorized to delete this blog entry' });
    }
    await entry.destroy();
    res.json({ message: 'Blog entry deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.scoreBlogEntry = async (req, res) => {
  try {
    const { score } = req.body;
    const entry = await BlogEntry.findByPk(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Blog entry not found' });
    }
    await entry.addScoringUser(req.user.id, { through: { score } });
    // Recalculate average score
    const scores = await entry.getScoringUsers({ attributes: ['UserScoredPosts.score'] });
    const avgScore = scores.reduce((sum, user) => sum + user.UserScoredPosts.score, 0) / scores.length;
    entry.score = avgScore;
    await entry.save();
    res.json(entry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};