import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  // Get logged in Clerk user ID
  const { userId } = await auth();

  // If not logged in
  if (!userId) {
    return null;
  }

  // Get full Clerk user data
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  // Check if user already exists in database
  let user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  // If user does NOT exist → create user in database
  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,

        username:
          clerkUser.username ||
          clerkUser.firstName ||
          "user",

        email:
          clerkUser.emailAddresses[0].emailAddress,

        imageUrl: clerkUser.imageUrl,
      },
    });
  }

  // Return database user
  return user;
}