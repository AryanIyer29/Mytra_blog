"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Blog = {
  id: number;
  title: string;
  slug?: string; 
  content: string;
  ratings: number[];
  comments: string[];
  createdAt: string;
};

export default function BlogList() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const storedBlogs: Blog[] = JSON.parse(localStorage.getItem("blogs") || "[]");
    
    // Sort by Newest First
    storedBlogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setBlogs(storedBlogs);
  }, []);

  const avgRating = (ratings: number[]) => {
    if (!ratings || ratings.length === 0) return "No rating";
    return (
      ratings.reduce((a, b) => a + b, 0) / ratings.length
    ).toFixed(1);
  };

  const handleBlogClick = (blog: Blog) => {
  // Use slug for URL if available (Better SEO)
  router.push(`/blog/${blog.slug || blog.id}`);
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0b2d] to-[#1b145a] p-6 text-white">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Bike Blogs</h1>
          
         
        </div>

        {/* BLOG LIST */}
        {blogs.length === 0 ? (
          <p className="text-gray-300">No blogs published yet.</p>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => handleBlogClick(blog)}
                className="bg-[#120e3a] p-4 rounded-lg cursor-pointer hover:bg-[#1b145a] transition flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{blog.title}</h2>
                  <p className="text-sm text-gray-300">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                  ⭐ {avgRating(blog.ratings)}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}