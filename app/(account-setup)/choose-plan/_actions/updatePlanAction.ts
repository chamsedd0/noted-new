"use server";

import { userApi } from "@/api/FirebaseUserApi";
import { AccountSetupStage, Plan } from "@/types/User";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/utils/jwt";

export async function updatePlan(plan: Plan): Promise<void> {
  try {
    const token = cookies().get("token");

    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);

    await userApi.updateUser(userId, {
      plan,
      accountSetupStage: AccountSetupStage.COMPLETED,
    });

    redirect("/dashboard");
  } catch (error) {
    console.error("Error updating plan:", error);
    throw error;
  }
}
