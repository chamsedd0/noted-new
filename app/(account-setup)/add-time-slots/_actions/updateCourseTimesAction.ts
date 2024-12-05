"use server";

import { courseApi } from "@/api/FireBaseCourseAPI";
import { userApi } from "@/api/FireBaseUserAPI";
import { verifyIdToken } from "@/lib/firebase-admin";
import { AccountSetupStage } from "@/types/User";
import { TimeSlot } from "@/types/Time";
import { redirect } from "next/navigation";

export async function updateCourseTimes(
  idToken: string,
  courseId: string,
  timeslots: TimeSlot[]
): Promise<void> {
  try {
    // Verify the id token
    const decodedToken = await verifyIdToken(idToken);
    if (!decodedToken) {
      redirect("/login");
    }

    // Get existing courses
    const courses = await courseApi.getCoursesByUserId(decodedToken.uid);
    const course = courses.find((c) => c.uid === courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    // Update the course times
    await courseApi.updateCourse(decodedToken.uid, {
      ...course,
      timeslots,
    });

    // Update user account setup
    await userApi.updateUser(decodedToken.uid, {
      accountSetupStage: AccountSetupStage.CHOOSE_PLAN,
    });

    redirect("/choose-plan");
  } catch (error) {
    console.error("Error updating course times:", error);
    throw error;
  }
}
