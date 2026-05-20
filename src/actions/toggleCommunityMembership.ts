"use server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/currentUser";

import { revalidatePath } from "next/cache";

export async function toggleCommunityMembership(
  communityId: string
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  const existingMembership =
    await prisma.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId: currentUser.id,
          communityId,
        },
      },
    });

  if (existingMembership) {
    await prisma.communityMember.delete({
      where: {
        id: existingMembership.id,
      },
    });
  } else {
    await prisma.communityMember.create({
      data: {
        userId: currentUser.id,
        communityId,
      },
    });
  }

  revalidatePath("/");
}