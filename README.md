# Book Review Platform

Complete Book Review Platform built with the MERN stack. It allows users to register, log in, add books, and post reviews with ratings.

## Features

-   User authentication (Register/Login) with JWT.
-   CRUD operations for books (Create, Read, Update, Delete).
-   Users can only edit/delete books they have added.
-   CRUD operations for reviews.
-   Users can only edit/delete their own reviews.
-   Pagination for the book list.
-   Average rating calculation and display.
-   Protected routes for authenticated users.

## Technical Stack

-   **Backend:** Node.js, Express.js, MongoDB, Mongoose
-   **Frontend:** Next.js (with App Router)
-   **Authentication:** JSON Web Tokens (JWT), bcrypt
-   **Styling:** Tailwind CSS