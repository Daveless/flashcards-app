const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.Deck, { as: 'decks', foreignKey: 'category_id' });
  };

  return Category;
};