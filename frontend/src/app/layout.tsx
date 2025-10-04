import Navbar from "../components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "Book Review Platform",
  description: "A platform to review your favorite books",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
