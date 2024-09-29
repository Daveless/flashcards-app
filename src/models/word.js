const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Word = sequelize.define('Word', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    acquisition_level: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    img: {
      type: DataTypes.STRING,  // Asumimos que la ruta de la imagen será almacenada como string
    },
    meaning: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    example: DataTypes.TEXT,
  });

  Word.associate = (models) => {
    Word.belongsToMany(models.Deck, { through: 'DeckWords', as: 'decks', foreignKey: 'wordId' });
  };

  return Word;
};