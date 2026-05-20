import Link from "next/link";

import { auth } from "@clerk/nextjs/server";

import { UserButton } from "@clerk/nextjs";

export default async function Navbar() {
  const { userId } = await auth();

  return (
    <div className="border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-orange-500"
        >
          Reddit Clone 🚀
        </Link>

        {/* Search */}
        <form
          action="/search"
          className="flex-1 max-w-xl"
        >
          <input
            type="text"
            name="q"
            placeholder="Search..."
            className="w-full border rounded-lg px-4 py-2"
          />
        </form>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link
            href="/create"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            Create Post
          </Link>

<Link
  href="/create-community"
  className="bg-white text-black border border-gray-300 hover:bg-gray-100 font-medium px-4 py-2 rounded-lg transition"
>
  Create Community
</Link>

          {!userId ? (
            <>
              <Link
                href="/sign-in"
                className="font-medium"
              >
                Sign in
              </Link>

              <Link
                href="/sign-up"
                className="font-medium"
              >
                Sign up
              </Link>
            </>
          ) : (
            <UserButton />
          )}
        </div>
      </div>
    </div>
  );
}