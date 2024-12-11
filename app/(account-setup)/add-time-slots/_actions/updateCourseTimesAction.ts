"use server";

import { userApi } from "@/api/FirebaseUserApi";
import { courseApi } from "@/api/FireBaseCourseAPI";
import { eventApi } from "@/api/FireBaseEventAPI";
import { AccountSetupStage } from "@/types/User";
import { TimeSlot } from "@/types/Time";
import { redirect } from "next/navigation";
import { convertCourseToEvents } from "@/app/utils";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/utils/jwt";

export async function updateCourseTimes(
  courseId: string,
  timeslots: TimeSlot[]
): Promise<void> {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);

    // Get existing courses
    const courses = await courseApi.getCoursesByUserId(userId);
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
    await courseApi.updateCourse(userId, courseWithNewTimes);

    // Convert all courses' timeslots to events
    const courseEvents = convertCourseToEvents(courseWithNewTimes);

    // Update events for this course
    await eventApi.updateCourseEvents(userId, courseId, courseEvents);

    // Update user account setup stage
    await userApi.updateUser(userId, {
      accountSetupStage: AccountSetupStage.CHOOSE_PLAN,
    });

    redirect("/choose-plan");
  } catch (error) {
    console.error("Error updating course times:", error);
    throw error;
  }
}
