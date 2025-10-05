"use client";

import { useState } from "react";

export default function BookForm({
  onSubmit,
  initialData = {},
  isEdit = false,
}) {
  const [title, setTitle] = useState(initialData.title || "");
  const [author, setAuthor] = useState(initialData.author || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [genre, setGenre] = useState(initialData.genre || "");
  const [publishedYear, setPublishedYear] = useState(
    initialData.publishedYear || ""
  );
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !description || !genre || !publishedYear) {
      setError("All fields are required.");
      return;
    }
    onSubmit({ title, author, description, genre, publishedYear });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl px-10 pt-8 pb-10 border border-gray-100"
    >
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full p-4 mb-4">
          <span className="text-5xl">{isEdit ? "📝" : "📚"}</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
          {isEdit ? "Edit Book" : "Add a New Book"}
        </h1>
        <p className="text-gray-600 mt-2">
          {isEdit
            ? "Update the book information"
            : "Share a great book with the community"}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
          <span className="mr-2">⚠️</span>
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-indigo-600 text-sm font-semibold mb-2">
            📖 Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 transition-all"
            placeholder="Enter book title"
          />
        </div>

        <div>
          <label className="block text-indigo-600 text-sm font-semibold mb-2">
            ✍️ Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 transition-all"
            placeholder="Enter author name"
          />
        </div>

        <div>
          <label className="block text-indigo-600 text-sm font-semibold mb-2">
            📝 Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 h-32 resize-none transition-all"
            placeholder="Tell us about this book..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              🎭 Genre
            </label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 transition-all"
              placeholder="e.g., Fiction, Mystery"
            />
          </div>

          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              📅 Published Year
            </label>
            <input
              type="number"
              value={publishedYear}
              onChange={(e) => setPublishedYear(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 transition-all"
              placeholder="YYYY"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          {isEdit ? "✅ Update Book" : "➕ Add Book"}
        </button>
      </div>
    </form>
  );
}
