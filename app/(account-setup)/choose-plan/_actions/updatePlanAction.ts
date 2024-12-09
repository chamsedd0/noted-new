"use server";

import { userApi } from "@/api/FirebaseUserApi";
import { verifyIdToken } from "@/app/lib/firebase-admin";
import { Plan, AccountSetupStage } from "@/types/User";
import { redirect } from "next/navigation";

export async function updatePlan(idToken: string, plan: Plan): Promise<void> {
  // Verify the id token
  const decodedToken = await verifyIdToken(idToken);
  if (!decodedToken) {
    redirect("/login");
  }

  // Update the user's plan
  await userApi.updateUser(decodedToken.uid, {
    plan,
    accountSetupStage: AccountSetupStage.COMPLETED,
  });

  // Redirect to the dashboard
  redirect("/dashboard");
}
