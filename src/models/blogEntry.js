const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BlogEntry = sequelize.define('BlogEntry', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: DataTypes.STRING,
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    score: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  });

  BlogEntry.associate = (models) => {
    BlogEntry.belongsToMany(models.User, { 
      through: 'UserScoredPosts',
      as: 'scoringUsers',
      foreignKey: 'blogEntryId'
    });
  };

  return BlogEntry;
};