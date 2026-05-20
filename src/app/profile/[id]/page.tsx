import Link from "next/link";

import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";

import { getCurrentUser } from "@/lib/currentUser";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProfilePage({
  params,
}: Props) {
  const { id } = await params;

  // Current logged in user
  const currentUser = await getCurrentUser();

  // Find user
  const user = await prisma.user.findUnique({
    where: {
      id,
    },

    include: {
      posts: {
        orderBy: {
          createdAt: "desc",
        },
      },

      comments: true,
      likes: true,
    },
  });

  // User not found
  if (!user) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Profile Card */}
      <div className="border rounded-2xl p-6 shadow-sm">
        {/* Profile Image */}
        {user.imageUrl && (
          <img
            src={user.imageUrl}
            alt={user.username}
            className="w-24 h-24 rounded-full mb-4"
          />
        )}

        {/* Username */}
        <h1 className="text-3xl font-bold">
          {user.username}
        </h1>

        {/* Email */}
        <p className="text-gray-500 mt-2">
          {user.email}
        </p>

        {/* Edit Profile Button */}
        {currentUser?.id === user.id && (
          <div className="mt-4">
            <Link
              href="/edit-profile"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg inline-block"
            >
              Edit Profile
            </Link>
          </div>
        )}

        {/* Bio */}
        <div className="mt-6">
          <h2 className="font-semibold text-lg">
            Bio
          </h2>

          <p className="text-gray-600 mt-1">
            {user.bio || "No bio added yet."}
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mt-6">
          <div>
            <div className="text-2xl font-bold">
              {user.posts.length}
            </div>

            <div className="text-gray-500 text-sm">
              Posts
            </div>
          </div>

          <div>
            <div className="text-2xl font-bold">
              {user.comments.length}
            </div>

            <div className="text-gray-500 text-sm">
              Comments
            </div>
          </div>

          <div>
            <div className="text-2xl font-bold">
              {user.likes.length}
            </div>

            <div className="text-gray-500 text-sm">
              Likes
            </div>
          </div>
        </div>
      </div>

      {/* User Posts */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Posts by {user.username}
        </h2>

        <div className="flex flex-col gap-4">
          {user.posts.map((post) => (
            <div
              key={post.id}
              className="border rounded-xl p-5"
            >
              <Link href={`/post/${post.id}`}>
                <h3 className="text-xl font-bold cursor-pointer">
                  {post.title}
                </h3>
              </Link>

              <p className="text-gray-600 mt-2">
                {post.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}