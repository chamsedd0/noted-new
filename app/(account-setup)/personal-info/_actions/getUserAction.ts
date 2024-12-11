"use server";

import { userApi } from "@/api/FirebaseUserApi";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/utils/jwt";
import { redirect } from "next/navigation";

export async function getUser() {
  try {
    const token = cookies().get("token");

    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);
    const user = await userApi.getUser(userId);

    if (!user) {
      redirect("/login");
    }

    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    redirect("/login");
  }
}
