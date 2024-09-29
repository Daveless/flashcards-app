const { Word, Deck } = require('../models');

exports.getAllWords = async (req, res) => {
  try {
    const words = await Word.findAll();
    res.json(words);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getWordById = async (req, res) => {
  try {
    const word = await Word.findByPk(req.params.id);
    if (!word) {
      return res.status(404).json({ error: 'Word not found' });
    }
    res.json(word);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createWord = async (req, res) => {
  try {
    const { meaning, example, img } = req.body;
    const word = await Word.create({
      meaning,
      example,
      img
    });
    res.status(201).json(word);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateWord = async (req, res) => {
  try {
    const { meaning, example, img, acquisition_level } = req.body;
    const word = await Word.findByPk(req.params.id);
    if (!word) {
      return res.status(404).json({ error: 'Word not found' });
    }
    await word.update({
      meaning,
      example,
      img,
      acquisition_level
    });
    res.json(word);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteWord = async (req, res) => {
  try {
    const word = await Word.findByPk(req.params.id);
    if (!word) {
      return res.status(404).json({ error: 'Word not found' });
    }
    await word.destroy();
    res.json({ message: 'Word deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getWordsByDeckId = async (req, res) => {
  try {
    const deck = await Deck.findByPk(req.params.deckId, {
      include: [{ model: Word, as: 'words' }]
    });
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }
    res.json(deck.words);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};