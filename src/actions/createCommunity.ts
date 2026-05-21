"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/currentUser";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

  revalidatePath("/");

  redirect(`/r/${community.name}`);
}