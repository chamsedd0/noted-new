"use server";

import { userApi } from "@/api/FirebaseUserApi";
import { AccountSetupStage } from "@/types/User";
import { redirect } from "next/navigation";
import { verifyIdToken } from "@/app/lib/firebase-admin";
import { PersonalInfoFormValues } from "../schema";

export async function updateUser(
  idToken: string,
  user: PersonalInfoFormValues
): Promise<void> {
  try {
    const decodedToken = await verifyIdToken(idToken);

    if (!decodedToken) {
      redirect("/login");
    }

    const updates = {
      ...(user.firstName || user.lastName
        ? {
            name: `${user.firstName} ${user.lastName}`.trim(),
          }
        : {}),
      ...(user.email ? { email: user.email } : {}),
      ...(user.birthDate ? { birthDate: user.birthDate } : {}),
      accountSetupStage: AccountSetupStage.ADD_COURSES,
    };

    await userApi.updateUser(decodedToken.uid, updates);

    redirect("/add-courses");
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
