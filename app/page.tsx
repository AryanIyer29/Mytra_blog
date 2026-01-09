"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("loggedIn"));
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900">
        Mytra Blog Section
      </h1>

      <div className="flex gap-6">
        <Link href="/login" className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold">
          Login
        </Link>

        <Link href="/register" className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold">
          Register
        </Link>

        <Link href="/blog" className="bg-white border border-gray-300 text-gray-800 px-6 py-3 rounded-md font-semibold">
          Blogs
        </Link>

      </div>
    </main>
  );
}
