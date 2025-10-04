
const Review = require('../models/Review');
const Book = require('../models/Book');

const addReview = async (req, res) => {
    const { rating, reviewText } = req.body;
    const book = await Book.findById(req.params.id);

    if (book) {
        const review = new Review({
            rating,
            reviewText,
            userId: req.user._id,
            bookId: book._id,
        });

        const createdReview = await review.save();
        res.status(201).json(createdReview);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
};

const updateReview = async (req, res) => {
    const { rating, reviewText } = req.body;
    const review = await Review.findById(req.params.id);

    if (review) {
        if (review.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        review.rating = rating;
        review.reviewText = reviewText;
        const updatedReview = await review.save();
        res.json(updatedReview);
    } else {
        res.status(404).json({ message: 'Review not found' });
    }
};

const deleteReview = async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (review) {
        if (review.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        await review.deleteOne();
        res.json({ message: 'Review removed' });
    } else {
        res.status(404).json({ message: 'Review not found' });
    }
};

module.exports = {
    addReview,
    updateReview,
    deleteReview,
};