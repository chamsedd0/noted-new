"use server";

import { userApi } from "@/api/FirebaseUserApi";
import { User } from "@/types/User";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/utils/jwt";
import { redirect } from "next/navigation";

async function verifyAuth() {
  const token = cookies().get("token");
  if (!token) {
    redirect("/login");
  }

  try {
    const { userId } = await verifyToken(token.value);
    return userId;
  } catch (error) {
    console.error("Token verification failed:", error);
    redirect("/login");
  }
}

export async function getUserData() {
  try {
    const userId = await verifyAuth();
    const user = await userApi.getUser(userId);

    if (!user) {
      redirect("/login");
    }

    return user;
  } catch (error) {
    console.error("Error getting user data:", error);
    redirect("/login");
  }
}

export async function saveUser(userData: User): Promise<void> {
  try {
    const userId = await verifyAuth();

    if (userId !== userData.uid) {
      throw new Error("Unauthorized: User ID mismatch");
    }

    // Save the complete user data including courses and events
    await userApi.updateUser(userData.uid, userData);
  } catch (error) {
    console.error("Error saving user:", error);
    throw new Error("Failed to save user data");
  }
}
