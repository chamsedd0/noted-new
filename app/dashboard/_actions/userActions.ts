"use server";

import { userApi } from "@/api/FirebaseUserApi";
import { User } from "@/types/User";

export async function getUser(userId: string) {
  try {
    const userData = await userApi.getUser(userId);
    return userData as User;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function updateUser(userId: string, userData: Partial<User>) {
  try {
    await userApi.updateUser(userId, userData);
    return userData;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
