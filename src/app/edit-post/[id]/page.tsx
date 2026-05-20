import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import { editPost } from "@/actions/editPost";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPostPage({
  params,
}: Props) {
  const { id } = await params;

  // Find post
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  // Post not found
  if (!post) {
    return notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit Post
      </h1>

      <form
        action={async (formData) => {
          "use server";

          await editPost(id, formData);
        }}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          name="title"
          defaultValue={post.title}
          className="border p-3 rounded-lg"
          required
        />

        <textarea
          name="content"
          defaultValue={post.content}
          className="border p-3 rounded-lg h-40"
          required
        />

        <button className="bg-orange-500 text-white py-3 rounded-lg">
          Save Changes
        </button>
      </form>
    </div>
  );
}