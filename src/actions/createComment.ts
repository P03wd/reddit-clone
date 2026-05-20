"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/currentUser";
import { revalidatePath } from "next/cache";

export async function createComment(formData: FormData) {
  // Get logged in user
  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  // Get form data
  const postId = formData.get("postId") as string;
  const content = formData.get("content") as string;

  // Create comment
  await prisma.comment.create({
    data: {
      postId,
      content,
      userId: user.id,
    },
  });

  // Refresh page
  revalidatePath(`/post/${postId}`);
}