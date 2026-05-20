import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import { editComment } from "@/actions/editComment";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCommentPage({
  params,
}: Props) {
  const { id } = await params;

  // Find comment
  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
  });

  // Comment not found
  if (!comment) {
    return notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit Comment
      </h1>

      <form
        action={async (formData) => {
          "use server";

          await editComment(id, formData);
        }}
        className="flex flex-col gap-4"
      >
        <textarea
          name="content"
          defaultValue={comment.content}
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