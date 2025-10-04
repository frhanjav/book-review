"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/books?pageNumber=${page}`
        );
        setBooks(data.books);
        setPage(data.page);
        setPages(data.pages);
        setLoading(false);
      } catch {
        setError("Failed to fetch books.");
        setLoading(false);
      }
    };
    fetchBooks();
  }, [page]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 rounded-2xl p-8 mb-12 shadow-sm">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
          Discover Amazing Books
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Explore our curated collection of books and share your reviews with
          the community
        </p>
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div
                key={book._id}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl p-6 border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-lg p-3">
                    <span className="text-3xl">📖</span>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-full">
                    {book.genre || "Book"}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                  <span className="mr-2">✍️</span>
                  {book.author}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-5 line-clamp-3">
                  {book.description.substring(0, 120)}...
                </p>
                <Link
                  href={`/books/${book._id}`}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-medium transition-all hover:shadow-lg"
                >
                  View Details
                  <span className="ml-2">→</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                ← Previous
              </button>
              {[...Array(pages).keys()].map((x) => (
                <button
                  key={x + 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    page === x + 1
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-110"
                      : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setPage(x + 1)}
                >
                  {x + 1}
                </button>
              ))}
              <button
                disabled={page === pages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
