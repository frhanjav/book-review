"use client";

import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import { useAuth } from "../../context/AuthContext";

export default function BookDetailsPage() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`
        );
        setBook(data);
        setLoading(false);
      } catch {
        setError("Failed to fetch book details.");
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !reviewText) {
      alert("Please provide a rating and review text.");
      return;
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${id}/reviews`,
        {
          rating,
          reviewText,
        }
      );
      setRating(0);
      setReviewText("");
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`
      );
      setBook(data);
    } catch {
      setError("Failed to submit review. Make sure you are logged in.");
    }
  };

  const handleDeleteBook = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`);
        router.push("/");
      } catch {
        setError("Failed to delete book. You may not be the owner.");
      }
    }
  };

  const calculateAverageRating = () => {
    if (!book || !book.reviews || book.reviews.length === 0) return 0;
    const total = book.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / book.reviews.length).toFixed(1);
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Book Details Card */}
      <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-950 shadow-2xl rounded-2xl p-8 mb-10 border border-indigo-100 dark:border-indigo-900">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-lg p-3">
                <span className="text-4xl">📖</span>
              </div>
              <div>
                <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-2">
                  {book.title}
                </h1>
                <p className="text-2xl text-gray-600 dark:text-gray-400 flex items-center">
                  <span className="mr-2">✍️</span>
                  {book.author}
                </p>
              </div>
            </div>
          </div>
          {user && user._id === book.addedBy && (
            <div className="flex gap-3">
              <Link
                href={`/books/edit/${book._id}`}
                className="px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                ✏️ Edit
              </Link>
              <button
                onClick={handleDeleteBook}
                className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Genre
            </p>
            <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              🎭 {book.genre}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Published Year
            </p>
            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
              📅 {book.publishedYear}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Average Rating
            </p>
            <p className="text-2xl font-bold text-yellow-500">
              ⭐ {calculateAverageRating()}{" "}
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({book.reviews.length})
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            📝 Description
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {book.description}
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
          💬 Reviews ({book.reviews.length})
        </h2>
        {book.reviews.length > 0 ? (
          <div className="space-y-4">
            {book.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full w-10 h-10 flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {review.userId.name}
                      </p>
                      <div className="flex items-center">
                        <span className="text-yellow-500 font-bold">
                          {review.rating} ⭐
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {review.reviewText}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 p-8 rounded-xl text-center border border-indigo-100 dark:border-indigo-900">
            <span className="text-5xl mb-3 block">📝</span>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No reviews yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>

      {/* Add Review Form */}
      {user && (
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-lg p-3">
              <span className="text-3xl">✍️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Write Your Review
            </h2>
          </div>
          <form onSubmit={handleReviewSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                ⭐ Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
              >
                <option value="0" disabled>
                  Select your rating
                </option>
                <option value="1">⭐ 1 - Poor</option>
                <option value="2">⭐⭐ 2 - Fair</option>
                <option value="3">⭐⭐⭐ 3 - Good</option>
                <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                💭 Your Review
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white h-32 resize-none transition-all"
                placeholder="Share your thoughts about this book..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              📤 Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
