"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/currentUser";

export async function toggleLike(postId: string) {
  // Get logged in user
  const user = await getCurrentUser();

  // Stop if not logged in
  if (!user) {
    return;
  }

  // Check existing like
  const existingLike = await prisma.like.findUnique({
    where: {
      postId_userId: {
        postId,
        userId: user.id,
      },
    },
  });

  // Unlike
  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  }

  // Like
  else {
    await prisma.like.create({
      data: {
        postId,
        userId: user.id,
      },
    });
  }

  // Refresh homepage
  revalidatePath("/");
}