"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/currentUser";

export async function createCommunity(
  formData: FormData
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { success: false };
  }

  const name = formData.get("name") as string;

  const description = formData.get(
    "description"
  ) as string;

  const community =
    await prisma.community.create({
      data: {
        name,
        description,
        creatorId: currentUser.id,
      },
    });

  return {
    success: true,
    communityName: community.name,
  };
}