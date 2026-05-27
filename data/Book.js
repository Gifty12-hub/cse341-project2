const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      trim: true,
    },
    publishedYear: {
      type: Number,
      required: [true, 'Published year is required'],
      min: [1000, 'Year must be 1000 or later'],
      max: [new Date().getFullYear(), 'Year cannot be in the future'],
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
      trim: true,
    },
    pageCount: {
      type: Number,
      min: [1, 'Page count must be at least 1'],
    },
    language: {
      type: String,
      default: 'English',
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: [true, 'Author ID is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);