import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";

import { getCurrentUser } from "@/lib/currentUser";

import { toggleCommunityMembership } from "@/actions/toggleCommunityMembership";

interface Props {
  params: Promise<{
    name: string;
  }>;
}

export default async function CommunityPage({
  params,
}: Props) {
  const { name } = await params;

  const currentUser = await getCurrentUser();

  const community =
    await prisma.community.findUnique({
      where: {
        name,
      },

      include: {
        posts: {
          include: {
            user: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        },

        members: true,
      },
    });

  if (!community) {
    return notFound();
  }

  const isMember =
    community.members.some(
      (member) =>
        member.userId === currentUser?.id
    );

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="border rounded-xl p-6">
          <h1 className="text-4xl font-bold">
            r/{community.name}
          </h1>

          <p className="text-gray-600 mt-3">
            {community.description}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {community.posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            community.posts.map((post: any) => (
              <div
                key={post.id}
                className="border rounded-xl p-5"
              >
                <h2 className="text-2xl font-bold">
                  {post.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {post.content}
                </p>

                <div className="text-sm text-gray-400 mt-4">
                  Posted by {post.user.username}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <div className="border rounded-xl p-6 sticky top-6">
          <h2 className="text-2xl font-bold">
            Community Info
          </h2>

          <p className="mt-4 text-gray-600">
            {community.members.length} Members
          </p>

          <form
            action={async () => {
              "use server";

              await toggleCommunityMembership(
                community.id
              );
            }}
          >
            <button
              className={`w-full mt-6 py-3 rounded-lg text-white ${
                isMember
                  ? "bg-red-500"
                  : "bg-blue-500"
              }`}
            >
              {isMember
                ? "Leave Community"
                : "Join Community"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}