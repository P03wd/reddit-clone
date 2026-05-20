"use server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/currentUser";

import { redirect } from "next/navigation";

export async function createCommunity(
  formData: FormData
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
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

  redirect(`/r/${community.name}`);
}