"use server";

import { userApi } from "@/api/FirebaseUserApi";
import { verifyIdToken } from "@/lib/firebase-admin";
import { User } from "@/types/User";

export async function getUserProfile(idToken: string) {
  try {
    const decodedToken = await verifyIdToken(idToken);
    const userData = await userApi.getUser(decodedToken.uid);
    return { success: true, data: userData };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { success: false, error: "Failed to fetch profile" };
  }
}

export async function updateProfileAction(
  idToken: string,
  updates: Partial<User>
) {
  if (!updates.name?.trim()) {
    return { success: false, error: "Name is required" };
  }

  if (!updates.email?.trim()) {
    return { success: false, error: "Email is required" };
  }

  try {
    const decodedToken = await verifyIdToken(idToken);
    await userApi.updateUser(decodedToken.uid, updates);
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}
