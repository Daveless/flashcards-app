const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');

// Import routes
const authRoutes = require('./routes/auth');
const blogEntryRoutes = require('./routes/blogEntries');
const categoryRoutes = require('./routes/categories');
const deckRoutes = require('./routes/decks');
const userRoutes = require('./routes/users');
const wordRoutes = require('./routes/words');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/blog-entries', blogEntryRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/decks', deckRoutes);
app.use('/api/users', userRoutes);
app.use('/api/words', wordRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    await sequelize.sync({ force: false });
    console.log('All models were synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();

module.exports = app;