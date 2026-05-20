import Link from "next/link";

import { prisma } from "@/lib/prisma";

import { toggleLike } from "@/actions/toggleLike";

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      user: true,
      likes: true,
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border rounded-xl p-5 shadow-sm"
          >
            <Link href={`/post/${post.id}`}>
              <h2 className="text-2xl font-bold cursor-pointer">
                {post.title}
              </h2>
            </Link>

            <p className="text-gray-600 mt-2">
              {post.content}
            </p>

            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="Post image"
                className="mt-4 rounded-lg"
              />
            )}

            <div className="mt-4 flex items-center gap-4">
              <form
                action={async () => {
                  "use server";

                  await toggleLike(post.id);
                }}
              >
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                  👍 {post.likes.length}
                </button>
              </form>

              <Link
                href={`/profile/${post.user.id}`}
                className="text-sm text-gray-400 hover:underline"
              >
                Posted by {post.user.username}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}