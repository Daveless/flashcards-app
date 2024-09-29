const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    avatar_model: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    notifications: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
  });

  User.associate = (models) => {
    User.belongsToMany(models.Deck, { 
      through: 'UserActiveDecks',
      as: 'activeDecks',
      foreignKey: 'userId'
    });
    User.belongsToMany(models.Deck, { 
      through: 'UserSavedDecks',
      as: 'savedDecks',
      foreignKey: 'userId'
    });
    User.belongsToMany(models.BlogEntry, { 
      through: 'UserScoredPosts',
      as: 'scoredPosts',
      foreignKey: 'userId'
    });
  };

  return User;
};