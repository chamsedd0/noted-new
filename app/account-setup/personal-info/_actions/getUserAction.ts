"use server";
import { userApi } from "@/api/FireBaseUserAPI";
import { verifyIdToken } from "@/lib/firebase-admin";
import { User } from "@/types/User";
export async function getUser(idToken: string): Promise<User | null> {
  try {
    // Verify the ID token to get the user's UID from Firebase-admin SDK which runs on the server
    const decodedToken = await verifyIdToken(idToken);

    if (!decodedToken) {
      return null;
    }

    return await userApi.getUser(decodedToken.uid);
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}
