"use client";

import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const handleRegister = () => {
  
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded w-80 text-gray-900 shadow-md">
        <h1 className="text-xl mb-4 font-semibold text-gray-900">
          Register
        </h1>

        <input
          className="w-full mb-3 p-2 border rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Email"
        />

        <input
          type="password"
          className="w-full mb-3 p-2 border rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Password"
        />

        <input
          type="password"
          className="w-full mb-4 p-2 border rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Confirm Password"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-orange-500 text-white py-2 rounded font-semibold hover:bg-orange-600 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}
