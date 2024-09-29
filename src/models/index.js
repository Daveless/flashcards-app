const sequelize = require('../config/database');
const User = require('./user')(sequelize);
const BlogEntry = require('./blogEntry')(sequelize);
const Deck = require('./deck')(sequelize);
const Word = require('./word')(sequelize);
const Category = require('./category')(sequelize);

const models = {
  User,
  BlogEntry,
  Deck,
  Word,
  Category,
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

module.exports = {
  ...models,
  sequelize,
};