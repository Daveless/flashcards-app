const { Deck, Word, Category, User } = require('../models');
const { Op } = require('sequelize');

exports.getAllDecks = async (req, res) => {
  try {
    const decks = await Deck.findAll({
      include: [
        { model: Category, as: 'category' },
        { model: Word, as: 'words' }
      ]
    });
    res.json(decks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getDeckById = async (req, res) => {
  try {
    const deck = await Deck.findByPk(req.params.id, {
      include: [
        { model: Category, as: 'category' },
        { model: Word, as: 'words' }
      ]
    });
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }
    res.json(deck);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createDeck = async (req, res) => {
  try {
    const { study_status, difficulty, description, type, category_id } = req.body;
    const deck = await Deck.create({
      study_status,
      difficulty,
      description,
      type,
      category_id,
      owner_id: req.user.id
    });
    res.status(201).json(deck);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateDeck = async (req, res) => {
  try {
    const { study_status, difficulty, description, type, category_id } = req.body;
    const deck = await Deck.findByPk(req.params.id);
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }
    if (deck.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this deck' });
    }
    await deck.update({
      study_status,
      difficulty,
      description,
      type,
      category_id
    });
    res.json(deck);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteDeck = async (req, res) => {
  try {
    const deck = await Deck.findByPk(req.params.id);
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }
    if (deck.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this deck' });
    }
    await deck.destroy();
    res.json({ message: 'Deck deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.filterDecks = async (req, res) => {
  try {
    const { category, name, minScore } = req.query;
    const whereClause = {};
    if (category) {
      whereClause.category_id = category;
    }
    if (name) {
      whereClause.description = { [Op.iLike]: `%${name}%` };
    }
    if (minScore) {
      whereClause.score = { [Op.gte]: minScore };
    }
    const decks = await Deck.findAll({
      where: whereClause,
      include: [
        { model: Category, as: 'category' },
        { model: Word, as: 'words' }
      ]
    });
    res.json(decks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addWordToDeck = async (req, res) => {
  try {
    const { deckId, wordId } = req.body;
    const deck = await Deck.findByPk(deckId);
    const word = await Word.findByPk(wordId);
    if (!deck || !word) {
      return res.status(404).json({ error: 'Deck or Word not found' });
    }
    await deck.addWord(word);
    res.json({ message: 'Word added to deck successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateDeckScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { score } = req.body;
    const deck = await Deck.findByPk(id);
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }
    deck.score = score;
    await deck.save();
    res.json(deck);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};