"use client";

import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
  localStorage.setItem("loggedIn", "true");
  router.push("/blog/create");
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded w-80 text-gray-900 shadow-md">
        <h1 className="text-xl mb-4 font-semibold text-gray-900">
          Login
        </h1>

        {/* EMAIL */}
        <input
          className="w-full mb-3 p-2 border rounded text-gray-900"
          placeholder="Email"
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="w-full mb-3 p-2 border rounded text-gray-900"
          placeholder="Password"
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 text-white py-2 rounded font-semibold hover:bg-orange-600"
        >
          Login
        </button>
      </div>
    </div>
  );
}
