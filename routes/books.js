const router = require('express').Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/booksController');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management endpoints
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *       500:
 *         description: Server error
 */
router.get('/', getAllBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Retrieve a single book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the book
 *     responses:
 *       200:
 *         description: Book found
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getBookById);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - genre
 *               - publishedYear
 *               - isbn
 *               - authorId
 *             properties:
 *               title:
 *                 type: string
 *                 example: The Great Gatsby
 *               genre:
 *                 type: string
 *                 example: Fiction
 *               publishedYear:
 *                 type: integer
 *                 example: 1925
 *               isbn:
 *                 type: string
 *                 example: 978-0-7432-7356-5
 *               pageCount:
 *                 type: integer
 *                 example: 180
 *               language:
 *                 type: string
 *                 example: English
 *               available:
 *                 type: boolean
 *                 example: true
 *               authorId:
 *                 type: string
 *                 example: 665f1a2b3c4d5e6f7a8b9c0d
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: ISBN already exists
 *       500:
 *         description: Server error
 */
router.post('/', createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *               isbn:
 *                 type: string
 *               pageCount:
 *                 type: integer
 *               language:
 *                 type: string
 *               available:
 *                 type: boolean
 *               authorId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid ID or validation error
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the book
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteBook);

module.exports = router;