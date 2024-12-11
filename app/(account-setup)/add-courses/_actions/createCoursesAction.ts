"use server";

import { courseApi } from "@/api/FireBaseCourseAPI";
import { userApi } from "@/api/FirebaseUserApi";
import { Course } from "@/types/Course";
import { AccountSetupStage } from "@/types/User";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/utils/jwt";

export async function createCourses(courses: Course[]): Promise<void> {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);

    // create courses
    await courseApi.createCourses(userId, courses);

    // update user account setup
    await userApi.updateUser(userId, {
      accountSetupStage: AccountSetupStage.ADD_SYLLABUS,
    });

    redirect("/add-syllabus");
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
}
