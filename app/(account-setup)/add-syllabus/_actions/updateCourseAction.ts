"use server";

import { courseApi } from "@/api/FireBaseCourseAPI";
import { userApi } from "@/api/FirebaseUserApi";
import { AccountSetupStage } from "@/types/User";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/utils/jwt";

export async function updateCourseSyllabus(
  courseId: string,
  syllabus: string
): Promise<void> {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);

    // Get existing course first
    const courses = await courseApi.getCoursesByUserId(userId);
    const existingCourse = courses.find((course) => course.uid === courseId);

    if (!existingCourse) {
      throw new Error("Course not found");
    }

    // Update course with syllabus
    await courseApi.updateCourse(userId, {
      ...existingCourse,
      syllabus,
    });

    // Update user stage
    await userApi.updateUser(userId, {
      accountSetupStage: AccountSetupStage.ADD_TIME_SLOTS,
    });

    redirect("/add-time-slots");
  } catch (error) {
    console.error("Error updating syllabus:", error);
    throw error;
  }
}
