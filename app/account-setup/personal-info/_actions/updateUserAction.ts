"use server";

import { userApi } from "@/api/FireBaseUserAPI";
import { AccountSetupStage } from "@/types/User";
import { redirect } from "next/navigation";
import { verifyIdToken } from "@/lib/firebase-admin";
import { PersonalInfoFormValues } from "../schema";

export async function updateUser(
  idToken: string,
  user: PersonalInfoFormValues
): Promise<void> {
  try {
    // Verify the ID token to get the user's UID from Firebase-admin SDK which runs on the server
    const decodedToken = await verifyIdToken(idToken);

    if (!decodedToken) {
      redirect("/login");
    }

    // Only update the fields that are provided in the form
    const updates = {
      ...(user.firstName || user.lastName
        ? {
            name: `${user.firstName} ${user.lastName}`.trim(),
          }
        : {}),
      ...(user.email ? { email: user.email } : {}),
      ...(user.birthDate ? { birthDate: user.birthDate } : {}),
      accountSetup: {
        completed: false,
        stage: AccountSetupStage.ADD_COURSES,
      },
    };

    await userApi.updateUser(decodedToken.uid, updates);

    redirect("/account-setup/add-courses");
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
