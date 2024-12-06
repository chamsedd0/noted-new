"use server";

import { userApi } from "@/api/FirebaseUserApi";
import { verifyIdToken } from "@/lib/firebase-admin";
import { AccountSetupStage } from "@/types/User";
import { redirect } from "next/navigation";

export async function checkUserStage(idToken: string) {
  const decodedToken = await verifyIdToken(idToken);

  if (!decodedToken) {
    return { error: "Invalid token" };
  }

  const user = await userApi.getUser(decodedToken.uid);

  if (!user) {
    redirect("/login");
  }

  if (user.accountSetupStage === AccountSetupStage.COMPLETED) {
    redirect("/dashboard");
  }

  redirect(`/${user.accountSetupStage}`);
}
