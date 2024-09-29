const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Deck = sequelize.define('Deck', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    study_status: DataTypes.STRING,
    difficulty: DataTypes.INTEGER,
    streak_days: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    learned_percentage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    description: DataTypes.STRING,
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: DataTypes.STRING,
    last_session_score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    amount_learned_words: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  Deck.associate = (models) => {
    Deck.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
    Deck.belongsToMany(models.Word, { through: 'DeckWords', as: 'words', foreignKey: 'deckId' });
    Deck.belongsToMany(models.User, { 
      through: 'UserActiveDecks',
      as: 'activeUsers',
      foreignKey: 'deckId'
    });
    Deck.belongsToMany(models.User, { 
      through: 'UserSavedDecks',
      as: 'savingUsers',
      foreignKey: 'deckId'
    });
  };

  return Deck;
};