"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Blog = {
  id: number;
  title: string;
  content: string;
  ratings: number[];      // ✅ FIXED
  comments: string[];
  createdAt: string;
};

export default function SingleBlog() {
  const params = useParams();
  const id = Number(params.id);

  const [blog, setBlog] = useState<Blog | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const blogs: Blog[] = JSON.parse(localStorage.getItem("blogs") || "[]");
    const found = blogs.find((b) => b.id === id);

    if (found) {
      // 🛡 safety: ensure arrays exist
      setBlog({
        ...found,
        ratings: found.ratings || [],
        comments: found.comments || [],
      });
    }
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0f0b2d] flex items-center justify-center text-white">
        Blog not found
      </div>
    );
  }

  const submitFeedback = () => {
    if (!rating) {
      alert("Please select rating");
      return;
    }

    const blogs: Blog[] = JSON.parse(localStorage.getItem("blogs") || "[]");
    const index = blogs.findIndex((b) => b.id === blog.id);

    if (index === -1) return;

    blogs[index].ratings = [...(blogs[index].ratings || []), rating];

    if (comment.trim()) {
      blogs[index].comments = [...(blogs[index].comments || []), comment];
    }

    localStorage.setItem("blogs", JSON.stringify(blogs));
    setBlog(blogs[index]);

    setRating(null);
    setComment("");
  };

  const avgRating =
    blog.ratings.length > 0
      ? (
          blog.ratings.reduce((a, b) => a + b, 0) / blog.ratings.length
        ).toFixed(1)
      : "No ratings yet";

  return (
    <div className="min-h-screen bg-[#0f0b2d] p-6 text-white">
      <div className="max-w-4xl mx-auto bg-[#120e3a] p-6 rounded-xl shadow-xl">

        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-sm text-gray-300 mb-4">
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        {/* BLOG CONTENT */}
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* AVG RATING */}
        <div className="mt-6 text-lg">
          ⭐ Average Rating: <b>{avgRating}</b>
        </div>

        {/* RATE */}
        <div className="mt-6">
          <p className="mb-2 font-semibold">Rate this blog</p>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setRating(n)}
                className={`px-4 py-2 rounded text-lg transition ${
                  rating === n
                    ? "bg-orange-500 text-white"
                    : "bg-white text-black hover:bg-orange-100"
                }`}
              >
                {"⭐".repeat(n)}
              </button>
            ))}
          </div>
        </div>

        {/* FEEDBACK */}
       <textarea
  value={comment}
  onChange={(e) => setComment(e.target.value)}
  placeholder="Write feedback (optional)"
  className="
    w-full mt-4 p-3 rounded
    bg-[#1b145a]
    text-white
    placeholder-gray-300
    border border-gray-500
    focus:outline-none
    focus:ring-2
    focus:ring-orange-500
  "
/>


        <button
          onClick={submitFeedback}
          className="mt-4 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded font-semibold"
        >
          Submit Feedback
        </button>

        {/* COMMENTS */}
        {blog.comments.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-3">Feedback</h3>
            <ul className="space-y-2 text-gray-200">
              {blog.comments.map((c, i) => (
                <li key={i} className="bg-[#1b145a] p-3 rounded">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}
