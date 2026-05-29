require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

// Passport config
require('./config/passport');

const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CSE341 Project 2 API',
      version: '1.0.0',
      description: 'REST API with full CRUD operations and Google OAuth authentication',
    },
    servers: [
      {
        url: 'https://cse341-project2-smh8.onrender.com',
        description: 'Production (Render)',
      },
      {
        url: 'http://localhost:3000',
        description: 'Local development',
      },
    ],
  },
  apis: ['./routes/*.js'],
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

// Routes
app.use('/auth', authRouter);
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