"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Color from "@tiptap/extension-color";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(false);


  // 🔐 auth check
  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      router.push("/login");
    }
  }, [router]);

  // ✍️ editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      Blockquote,
      CodeBlock,
      Underline,
      TextStyle,
      FontFamily,
      Color,
    ],
    content: "",
    immediatelyRender: false,
  });

// 🚀 publish blog
const handlePublish = () => {
  if (!title || !editor?.getText().trim()) {
    alert("Please enter title and content");
    return;
  }

  const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");

  blogs.push({
    id: Date.now(),
    title,
    content: editor.getHTML(),
    ratings: [],
    comments: [],
    createdAt: new Date().toISOString(),
  });

  localStorage.setItem("blogs", JSON.stringify(blogs));

  setPublished(true);   // 👈 YAHI LINE
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0b2d] to-[#1b145a] p-6 text-white">
      <div className="max-w-4xl mx-auto bg-[#120e3a] p-6 rounded-xl shadow-xl">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Write Blog
        </h1>

        {/* TITLE */}
        <input
          className="w-full p-3 mb-4 rounded bg-white text-black font-semibold"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* TOOLBAR */}
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <button className="btn" onClick={() => editor?.chain().focus().setParagraph().run()}>P</button>
          <button className="btn" onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</button>
          <button className="btn" onClick={() => editor?.chain().focus().toggleItalic().run()}>Italic</button>
          <button className="btn" onClick={() => editor?.chain().focus().toggleUnderline().run()}>Underline</button>
          <button className="btn" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
          <button className="btn" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
          <button className="btn" onClick={() => editor?.chain().focus().toggleBulletList().run()}>• List</button>
          <button className="btn" onClick={() => editor?.chain().focus().toggleOrderedList().run()}>1. List</button>
          <button className="btn" onClick={() => editor?.chain().focus().toggleBlockquote().run()}>Quote</button>
          <button className="btn" onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>Code</button>

          <select
            onChange={(e) => editor?.chain().focus().setFontFamily(e.target.value).run()}
            className="bg-white text-black px-2 py-1 rounded"
          >
            <option value="">Font</option>
            <option value="sans-serif">Sans</option>
            <option value="serif">Serif</option>
            <option value="monospace">Mono</option>
          </select>

          <input
            type="color"
            onChange={(e) => editor?.chain().focus().setColor(e.target.value).run()}
            className="w-8 h-8"
          />

          <button className="btn" onClick={() => editor?.chain().focus().undo().run()}>Undo</button>
          <button className="btn" onClick={() => editor?.chain().focus().redo().run()}>Redo</button>

          <button
            className="bg-gray-700 px-3 py-1 rounded text-white text-sm"
            onClick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()}
          >
            Clear
          </button>
        </div>

        {/* EDITOR */}
        <div className="bg-white text-black rounded p-4 min-h-[300px]">
          <EditorContent editor={editor} />
        </div>

        {/* PUBLISH */}
        <button
          onClick={handlePublish}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 py-3 rounded text-lg font-semibold"
        >
          Publish Blog
        </button>

      </div>

      {/* button style */}
      <style jsx>{`
        .btn {
          background: #ff7a00;
          color: white;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 14px;
        }
        .btn:hover {
          background: #ff8c1a;
        }
      `}</style>
    </div>
  );
}
