"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/currentUser";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editComment(
  commentId: string,
  formData: FormData
) {
  // Get logged in user
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

  // Prevent editing others comments
  if (comment.userId !== user.id) {
    return;
  }

  // Get new content
  const content = formData.get("content") as string;

  // Update comment
  await prisma.comment.update({
    where: {
      id: commentId,
    },

    data: {
      content,
    },
  });

  // Refresh post page
  revalidatePath(`/post/${comment.postId}`);

  // Redirect back
  redirect(`/post/${comment.postId}`);
}