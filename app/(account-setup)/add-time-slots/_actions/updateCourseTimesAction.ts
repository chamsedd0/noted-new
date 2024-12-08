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

    // Update the course with new timeslots
    const courseWithNewTimes = {
      ...course,
      timeSlots: timeslots,
    };

    // Update the course in database
    await courseApi.updateCourse(decodedToken.uid, courseWithNewTimes);

    // Convert all courses' timeslots to events
    const courseEvents = convertCourseToEvents(courseWithNewTimes);

    // Update events for this course
    await eventApi.updateCourseEvents(decodedToken.uid, courseId, courseEvents);

    // Update user account setup stage
    await userApi.updateUser(decodedToken.uid, {
      accountSetupStage: AccountSetupStage.CHOOSE_PLAN,
    });

    redirect("/choose-plan");
  } catch (error) {
    console.error("Error updating course times:", error);
    throw error;
  }
}
