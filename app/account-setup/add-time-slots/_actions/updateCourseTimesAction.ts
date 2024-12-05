"use server";

import { courseApi } from "@/api/FireBassCourseApi";
import { userApi } from "@/api/FirebaseUserApi";
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
    const decodedToken = await verifyIdToken(idToken);
    if (!decodedToken) {
      redirect("/login");
    }

    const courses = await courseApi.getCoursesByUserId(decodedToken.uid);
    const course = courses.find((c) => c.uid === courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    await courseApi.updateCourse(decodedToken.uid, {
      ...course,
      timeslots,
    });

    await userApi.updateUser(decodedToken.uid, {
      accountSetup: {
        completed: false,
        stage: AccountSetupStage.CHOOSE_PLAN,
      },
    });

    redirect("/account-setup/choose-plan");
  } catch (error) {
    console.error("Error updating course times:", error);
    throw error;
  }
}
