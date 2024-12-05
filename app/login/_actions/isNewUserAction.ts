"use server";

import { redirect } from "next/navigation";
import { User, AccountSetupStage, AccountSetup } from "@/types/User";
import { userApi } from "@/api/FireBaseUserAPI";
import { verifyIdToken } from "@/lib/firebase-admin";
export async function isNewUserAction(
  user: User,
  idToken: string
): Promise<void> {
  // Verify the ID token to get the user's UID from Firebase-admin SDK which runs on the server
  const decodedToken = await verifyIdToken(idToken);

  if (!decodedToken) {
    throw new Error("Unauthorized");
  }

  // Get existing user
  const existingUser = await userApi.getUser(decodedToken.uid);

  if (!existingUser) {
    const accountSetup: AccountSetup = {
      completed: false,
      stage: AccountSetupStage.PERSONAL_INFO,
    };

    // Create new user
    await userApi.createUser({ ...user, accountSetup });

    redirect("/account-setup/personal-info");
  }

  const stage =
    existingUser.accountSetup?.stage ?? AccountSetupStage.PERSONAL_INFO;

  if (existingUser.accountSetup?.completed) {
    redirect("/dashboard");
  }

  redirect(`/account-setup/${stage}`);
}
