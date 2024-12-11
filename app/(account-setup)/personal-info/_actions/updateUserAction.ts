"use server";

import { userApi } from "@/api/FirebaseUserApi";
import { AccountSetupStage } from "@/types/User";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/utils/jwt";

export async function updateUser(formData: FormData): Promise<void> {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);

    // Update user in database
    await userApi.updateUser(userId, {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      birthDate: formData.get("birthDate") as string,
      accountSetupStage: AccountSetupStage.ADD_COURSES,
    });

    redirect("/add-courses");
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
