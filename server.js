require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CSE341 Project 2 API',
      version: '1.0.0',
      description: 'REST API with full CRUD operations on a MongoDB database',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? 'https://your-app.onrender.com'
          : `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

// Routes
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);

// Root
app.get('/', (req, res) => {
  res.json({ message: 'CSE341 Project 2 API is running. Visit /api-docs for documentation.' });
});

// MongoDB connection + server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });