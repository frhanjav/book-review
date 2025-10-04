const Book = require("../models/Book");
const Review = require("../models/Review");

const getBooks = async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Book.countDocuments();
  const books = await Book.find()
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ books, page, pages: Math.ceil(count / pageSize) });
};

const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  const reviews = await Review.find({ bookId: req.params.id }).populate(
    "userId",
    "name"
  );

  if (book) {
    res.json({ ...book.toObject(), reviews });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

const addBook = async (req, res) => {
  const { title, author, description, genre, publishedYear } = req.body;

  const book = new Book({
    title,
    author,
    description,
    genre,
    publishedYear,
    addedBy: req.user._id,
  });

  const createdBook = await book.save();
  res.status(201).json(createdBook);
};

// @desc Update a book
// @route PUT /api/books/:id
// @access Private
const updateBook = async (req, res) => {
  const { title, author, description, genre, publishedYear } = req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "User not authorized" });
    }
    book.title = title;
    book.author = author;
    book.description = description;
    book.genre = genre;
    book.publishedYear = publishedYear;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "User not authorized" });
    }
    await book.deleteOne();
    await Review.deleteMany({ bookId: req.params.id });
    res.json({ message: "Book removed" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};