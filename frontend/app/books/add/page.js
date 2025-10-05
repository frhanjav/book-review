"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BookForm from "@/components/BookForm";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/app/context/AuthContext";

export default function AddBookPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Protected route
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleSubmit = async (bookData) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/books`,
        bookData
      );
      router.push(`/books/${data._id}`);
    } catch (error) {
      console.error("Failed to add book", error);
      alert("Failed to add book. Please try again.");
    }
  };

  if (loading || !user) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen py-8">
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
}
