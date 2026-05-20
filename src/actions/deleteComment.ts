"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/currentUser";
import { revalidatePath } from "next/cache";

export async function deleteComment(
  commentId: string,
  postId: string
) {
  // Get current user
  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  // Find comment
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  // Comment not found
  if (!comment) {
    return;
  }

  // Prevent deleting others comments
  if (comment.userId !== user.id) {
    return;
  }

  // Delete comment
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  // Refresh post page
  revalidatePath(`/post/${postId}`);
}