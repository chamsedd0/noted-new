"use server";
import { userApi } from "@/api/FireBaseUserAPI";
import { verifyIdToken } from "@/lib/firebase-admin";

export async function getUser(idToken: string) {
  try {
    const decodedToken = await verifyIdToken(idToken);
    if (!decodedToken) return null;

    const user = await userApi.getUser(decodedToken.uid);
    if (!user) return null;

    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}
