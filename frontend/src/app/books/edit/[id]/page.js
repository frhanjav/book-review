"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BookForm from "../../../../components/BookForm";
import Spinner from "../../../../components/Spinner";
import { useAuth } from "../../../context/AuthContext";

export default function EditBookPage() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!id) return;
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`
        );
        setBook(data);
        // Authorization check
        if (!authLoading && user?._id !== data.addedBy) {
          alert("You are not authorized to edit this book.");
          router.push("/");
        }
      } catch (error) {
        console.error("Failed to fetch book for editing", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, router, user, authLoading]);

  const handleSubmit = async (bookData) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
        bookData
      );
      router.push(`/books/${id}`);
    } catch (error) {
      console.error("Failed to update book", error);
      alert("Failed to update book. Please try again.");
    }
  };

  if (loading || authLoading) {
    return <Spinner />;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div className="min-h-screen py-8">
      <BookForm onSubmit={handleSubmit} initialData={book} isEdit={true} />
    </div>
  );
}
