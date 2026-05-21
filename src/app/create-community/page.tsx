"use client";

import { createCommunity } from "@/actions/createCommunity";
import { useRouter } from "next/navigation";

export default function CreateCommunityPage() {
  const router = useRouter();

  async function handleSubmit(
    formData: FormData
  ) {
    const result = await createCommunity(formData);

    if (result?.success) {
      router.push(`/r/${result.communityName}`);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Community
      </h1>

      <form
        action={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Community Name"
          className="border p-3 rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-3 rounded-lg h-32"
        />

        <button
          type="submit"
          className="bg-black text-white border border-gray-300 hover:bg-gray-800 py-3 rounded-lg font-medium transition"
        >
          Create Community
        </button>
      </form>
    </div>
  );
}