require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Author = require('./Author');
const Book = require('./Book');

const authors = [
  {
    firstName: 'George',
    lastName: 'Orwell',
    nationality: 'British',
    birthYear: 1903,
    email: 'george.orwell@example.com',
  },
  {
    firstName: 'Chimamanda',
    lastName: 'Ngozi Adichie',
    nationality: 'Nigerian',
    birthYear: 1977,
    email: 'chimamanda@example.com',
  },
  {
    firstName: 'J.K.',
    lastName: 'Rowling',
    nationality: 'British',
    birthYear: 1965,
    email: 'jk.rowling@example.com',
  },
  {
    firstName: 'Chinua',
    lastName: 'Achebe',
    nationality: 'Nigerian',
    birthYear: 1930,
    email: 'chinua.achebe@example.com',
  },
  {
    firstName: 'Yuval Noah',
    lastName: 'Harari',
    nationality: 'Israeli',
    birthYear: 1976,
    email: 'yuval@example.com',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Author.deleteMany();
    await Book.deleteMany();
    console.log('Cleared existing data');

    // Insert authors
    const insertedAuthors = await Author.insertMany(authors);
    console.log('Authors inserted');

    // Insert books using the inserted author IDs
    const books = [
      {
        title: '1984',
        genre: 'Dystopian Fiction',
        publishedYear: 1949,
        isbn: '978-0-452-28423-4',
        pageCount: 328,
        language: 'English',
        available: true,
        authorId: insertedAuthors[0]._id,
      },
      {
        title: 'Animal Farm',
        genre: 'Political Satire',
        publishedYear: 1945,
        isbn: '978-0-452-28424-1',
        pageCount: 112,
        language: 'English',
        available: true,
        authorId: insertedAuthors[0]._id,
      },
      {
        title: 'Purple Hibiscus',
        genre: 'Literary Fiction',
        publishedYear: 2003,
        isbn: '978-1-61620-290-0',
        pageCount: 307,
        language: 'English',
        available: true,
        authorId: insertedAuthors[1]._id,
      },
      {
        title: 'Half of a Yellow Sun',
        genre: 'Historical Fiction',
        publishedYear: 2006,
        isbn: '978-1-4000-95819',
        pageCount: 433,
        language: 'English',
        available: false,
        authorId: insertedAuthors[1]._id,
      },
      {
        title: "Harry Potter and the Philosopher's Stone",
        genre: 'Fantasy',
        publishedYear: 1997,
        isbn: '978-0-7475-3269-9',
        pageCount: 223,
        language: 'English',
        available: true,
        authorId: insertedAuthors[2]._id,
      },
      {
        title: 'Harry Potter and the Chamber of Secrets',
        genre: 'Fantasy',
        publishedYear: 1998,
        isbn: '978-0-7475-3849-3',
        pageCount: 251,
        language: 'English',
        available: true,
        authorId: insertedAuthors[2]._id,
      },
      {
        title: 'Things Fall Apart',
        genre: 'African Literature',
        publishedYear: 1958,
        isbn: '978-0-385-47454-2',
        pageCount: 209,
        language: 'English',
        available: true,
        authorId: insertedAuthors[3]._id,
      },
      {
        title: 'Arrow of God',
        genre: 'African Literature',
        publishedYear: 1964,
        isbn: '978-0-385-01480-3',
        pageCount: 230,
        language: 'English',
        available: false,
        authorId: insertedAuthors[3]._id,
      },
      {
        title: 'Sapiens: A Brief History of Humankind',
        genre: 'Non-Fiction',
        publishedYear: 2011,
        isbn: '978-0-06-231609-7',
        pageCount: 443,
        language: 'English',
        available: true,
        authorId: insertedAuthors[4]._id,
      },
      {
        title: 'Homo Deus: A Brief History of Tomorrow',
        genre: 'Non-Fiction',
        publishedYear: 2015,
        isbn: '978-1-91055-279-2',
        pageCount: 450,
        language: 'English',
        available: true,
        authorId: insertedAuthors[4]._id,
      },
    ];

    await Book.insertMany(books);
    console.log('Books inserted');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
};

seedDB();