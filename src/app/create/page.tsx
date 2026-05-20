"use client";

import { useState } from "react";

import { createPost } from "@/actions/createPost";

import ImageUpload from "@/components/ImageUpload";

export default function CreatePage() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Post
      </h1>

      <form
        action={createPost}
        className="flex flex-col gap-4"
      >
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border p-3 rounded-lg"
          required
        />

        {/* Content */}
        <textarea
          name="content"
          placeholder="Content"
          className="border p-3 rounded-lg h-40"
          required
        />

        {/* Hidden image URL */}
        <input
          type="hidden"
          name="imageUrl"
          value={imageUrl}
        />

        {/* Upload */}
        <ImageUpload onChange={setImageUrl} />

        {/* Preview */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="rounded-xl"
          />
        )}

        {/* Submit */}
        <button className="bg-orange-500 text-white py-3 rounded-lg">
          Create Post
        </button>
      </form>
    </div>
  );
}