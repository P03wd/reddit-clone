"use server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/currentUser";

import { redirect } from "next/navigation";

export async function updateProfile(
  formData: FormData
) {
  // Current logged in user
  const currentUser = await getCurrentUser();

  // Not logged in
  if (!currentUser) {
    return;
  }

  // Get bio from form
  const bio = formData.get("bio") as string;

  // Update user
  await prisma.user.update({
    where: {
      id: currentUser.id,
    },

    data: {
      bio,
    },
  });

  // Redirect back to profile
  redirect(`/profile/${currentUser.id}`);
}