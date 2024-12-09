"use server";

import { courseApi } from "@/api/FireBaseCourseAPI";
import { verifyIdToken } from "@/app/lib/firebase-admin";
import { Course } from "@/types/Course";

export async function getCourses(idToken: string): Promise<Course[]> {
  try {
    // Verify the id token
    const decodedToken = await verifyIdToken(idToken);
    if (!decodedToken) {
      return [];
    }

    // Get existing courses
    return await courseApi.getCoursesByUserId(decodedToken.uid);
  } catch (error) {
    console.error("Error getting courses:", error);
    return [];
  }
}
