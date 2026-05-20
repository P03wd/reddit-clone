"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/currentUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editPost(
  postId: string,
  formData: FormData
) {
  // Get logged in user
  const user = await getCurrentUser();

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

  // Prevent editing others posts
  if (post.userId !== user.id) {
    return;
  }

  // Get form values
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  // Update post
  await prisma.post.update({
    where: {
      id: postId,
    },

    data: {
      title,
      content,
    },
  });

  revalidatePath("/");

  redirect("/");
}