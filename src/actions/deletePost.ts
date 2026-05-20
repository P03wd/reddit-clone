"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/currentUser";
import { revalidatePath } from "next/cache";

export async function deletePost(postId: string) {
  // Get logged in user
  const user = await getCurrentUser();

  // Stop if not logged in
  if (!user) {
    return;
  }

  // Find post
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  // Post not found
  if (!post) {
    return;
  }

  // Prevent deleting others posts
  if (post.userId !== user.id) {
    return;
  }

  // Delete comments first
  await prisma.comment.deleteMany({
    where: {
      postId,
    },
  });

  // Delete likes first
  await prisma.like.deleteMany({
    where: {
      postId,
    },
  });

  // Delete post
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  // Refresh homepage
  revalidatePath("/");
}