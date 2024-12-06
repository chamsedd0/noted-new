"use server";

import { courseApi } from "@/api/FireBaseCourseAPI";
import { userApi } from "@/api/FirebaseUserApi";
import { AccountSetupStage } from "@/types/User";
import { verifyIdToken } from "@/lib/firebase-admin";
import { redirect } from "next/navigation";

export async function updateCourseSyllabus(
  idToken: string,
  courseId: string,
  syllabus: string
): Promise<void> {
  try {
    // Verify the id token
    const decodedToken = await verifyIdToken(idToken);
    if (!decodedToken) {
      redirect("/login");
    }

    // Get existing course first
    const courses = await courseApi.getCoursesByUserId(decodedToken.uid);
    const existingCourse = courses.find((course) => course.uid === courseId);

    if (!existingCourse) {
      throw new Error("Course not found");
    }

    // Update while maintaining required fields
    await courseApi.updateCourse(decodedToken.uid, {
      ...existingCourse,
      syllabus,
    });

    // Update user account setup
    await userApi.updateUser(decodedToken.uid, {
      accountSetupStage: AccountSetupStage.ADD_TIME_SLOTS,
    });

    redirect("/add-time-slots");
  } catch (error) {
    console.error("Error updating course syllabus:", error);
    throw error;
  }
}
