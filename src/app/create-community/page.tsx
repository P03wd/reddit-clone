import { createCommunity } from "@/actions/createCommunity";

export default function CreateCommunityPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Community
      </h1>

      <form
        action={createCommunity}
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