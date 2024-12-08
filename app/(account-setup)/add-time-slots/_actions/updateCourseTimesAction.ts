"use server";

import { userApi } from "@/api/FirebaseUserApi";
import { courseApi } from "@/api/FireBaseCourseAPI";
import { eventApi } from "@/api/FireBaseEventAPI";
import { verifyIdToken } from "@/lib/firebase-admin";
import { AccountSetupStage } from "@/types/User";
import { TimeSlot } from "@/types/Time";
import { redirect } from "next/navigation";
import { convertCourseToEvents } from "@/app/utils";

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
    const courseWithNewTimes = {
      ...course,
      timeSlots: timeslots,
    };
    // Update the course times
    await courseApi.updateCourse(decodedToken.uid, courseWithNewTimes);

    // Update user account setup
    await userApi.updateUser(decodedToken.uid, {
      accountSetupStage: AccountSetupStage.CHOOSE_PLAN,
    });

    // Make events for the course times
    const courseEvents = convertCourseToEvents(courseWithNewTimes);

    // Update the events
    await eventApi.addEvents(decodedToken.uid, courseEvents);

    redirect("/choose-plan");
  } catch (error) {
    console.error("Error updating course times:", error);
    throw error;
  }
}
