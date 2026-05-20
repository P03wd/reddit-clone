import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";

import { createComment } from "@/actions/createComment";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostPage({
  params,
}: Props) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: {
      id,
    },

    include: {
      user: true,

      comments: {
        include: {
          user: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Post */}
      <div className="border rounded-xl p-6 shadow-sm">
        {/* Title */}
        <h1 className="text-4xl font-bold">
          {post.title}
        </h1>

        {/* Content */}
        <p className="text-gray-600 mt-4 text-lg">
          {post.content}
        </p>

        {/* Image */}
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="rounded-xl mt-4"
          />
        )}

        {/* User */}
        <div className="mt-6 text-sm text-gray-400">
          Posted by {post.user.username}
        </div>
      </div>

      {/* Comments */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Comments
        </h2>

        {/* Add Comment */}
        <form
          action={createComment}
          className="flex flex-col gap-4"
        >
          <input
            type="hidden"
            name="postId"
            value={post.id}
          />

          <textarea
            name="content"
            placeholder="Write a comment..."
            className="border p-3 rounded-lg h-32"
          />

          <button className="bg-orange-500 text-white p-3 rounded-lg">
            Add Comment
          </button>
        </form>

        {/* Comments List */}
        <div className="mt-8 flex flex-col gap-4">
          {post.comments.map((comment) => (
            <div
              key={comment.id}
              className="border rounded-lg p-4"
            >
              <p>{comment.content}</p>

              <div className="text-sm text-gray-400 mt-2">
                Comment by {comment.user.username}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}