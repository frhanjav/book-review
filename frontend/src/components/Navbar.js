"use client";

import Link from "next/link";
import { useAuth } from "../app/context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="group flex items-center space-x-2">
            <span className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-tight group-hover:scale-105 transition-transform">
              📚 BookReviews
            </span>
          </Link>
          <div className="flex items-center space-x-1 sm:space-x-2">
            {user ? (
              <>
                <Link
                  href="/books/add"
                  className="px-2 py-1.5 sm:px-4 md:px-5 sm:py-2 md:py-2.5 bg-white bg-opacity-20 text-indigo-600 rounded-lg hover:bg-opacity-30 text-xs sm:text-sm md:text-base font-medium backdrop-blur-sm transition-all hover:scale-105 hover:shadow-lg whitespace-nowrap"
                >
                  <span className="hidden sm:inline">➕ Add Book</span>
                  <span className="sm:hidden">➕ Add</span>
                </Link>
                <button
                  onClick={logout}
                  className="px-2 py-1.5 sm:px-4 md:px-5 sm:py-2 md:py-2.5 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 text-xs sm:text-sm md:text-base font-medium transition-all hover:scale-105 hover:shadow-lg whitespace-nowrap"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-2 py-1.5 sm:px-4 md:px-5 sm:py-2 md:py-2.5 text-white text-xs sm:text-sm md:text-base font-medium hover:bg-white hover:bg-opacity-20 rounded-lg transition-all whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-2 py-1.5 sm:px-4 md:px-5 sm:py-2 md:py-2.5 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 text-xs sm:text-sm md:text-base font-medium transition-all hover:scale-105 hover:shadow-lg whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
