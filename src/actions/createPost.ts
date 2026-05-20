"use server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/currentUser";

import { redirect } from "next/navigation";

export async function createPost(
  formData: FormData
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  const title = formData.get("title") as string;

  const content = formData.get("content") as string;

  const imageUrl = formData.get("imageUrl") as string;

  const post = await prisma.post.create({
    data: {
      title,
      content,
      imageUrl,

      userId: currentUser.id,
    },
  });

  redirect(`/post/${post.id}`);
}