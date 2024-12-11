"use server";

import { userApi } from "@/api/FirebaseUserApi";
import { verifyToken } from "@/app/utils/jwt";
import { cookies } from "next/headers";
import { User } from "@/types/User";
import { redirect } from "next/navigation";

export async function getUser() {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);

    const userData = await userApi.getUser(userId);
    return userData as User;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function updateUser(userData: Partial<User>) {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);

    await userApi.updateUser(userId, userData);
    return userData;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
