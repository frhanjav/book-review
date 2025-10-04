const express = require('express');
const router = express.Router();
const {
    getBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
} = require('../controllers/bookController');
const { addReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getBooks).post(protect, addBook);
router.route('/:id').get(getBookById).put(protect, updateBook).delete(protect, deleteBook);
router.route('/:id/reviews').post(protect, addReview);

module.exports = router;