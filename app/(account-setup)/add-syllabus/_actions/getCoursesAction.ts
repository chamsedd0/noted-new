"use server";

import { courseApi } from "@/api/FireBaseCourseAPI";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/utils/jwt";
import { redirect } from "next/navigation";

export async function getCourses() {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);
    return await courseApi.getCoursesByUserId(userId);
  } catch (error) {
    console.error("Error getting courses:", error);
    redirect("/login");
  }
}
