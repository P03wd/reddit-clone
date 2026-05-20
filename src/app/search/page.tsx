import Link from "next/link";

import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({
  searchParams,
}: Props) {
  const { q } = await searchParams;

  // Search posts
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: q,
            mode: "insensitive",
          },
        },

        {
          content: {
            contains: q,
            mode: "insensitive",
          },
        },
      ],
    },

    include: {
      user: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  // Search users
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          username: {
            contains: q,
            mode: "insensitive",
          },
        },

        {
          email: {
            contains: q,
            mode: "insensitive",
          },
        },
      ],
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Search Form */}
      <form className="mb-8">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search posts or users..."
          className="w-full border p-4 rounded-xl"
        />
      </form>

      {/* Users */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Users
        </h2>

        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <Link
              key={user.id}
              href={`/profile/${user.id}`}
              className="border rounded-xl p-4 hover:bg-gray-50"
            >
              <div className="font-bold">
                {user.username}
              </div>

              <div className="text-gray-500 text-sm">
                {user.email}
              </div>
            </Link>
          ))}

          {users.length === 0 && (
            <p className="text-gray-500">
              No users found.
            </p>
          )}
        </div>
      </div>

      {/* Posts */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Posts
        </h2>

        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className="border rounded-xl p-4 hover:bg-gray-50"
            >
              <div className="font-bold text-xl">
                {post.title}
              </div>

              <div className="text-gray-600 mt-2">
                {post.content}
              </div>

              <div className="text-sm text-gray-400 mt-2">
                Posted by {post.user.username}
              </div>
            </Link>
          ))}

          {posts.length === 0 && (
            <p className="text-gray-500">
              No posts found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}