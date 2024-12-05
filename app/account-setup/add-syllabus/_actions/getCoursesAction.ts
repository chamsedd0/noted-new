"use server";

import { courseApi } from "@/api/FireBassCourseApi";
import { verifyIdToken } from "@/lib/firebase-admin";
import { Course } from "@/types/Course";

export async function getCourses(idToken: string): Promise<Course[]> {
  try {
    const decodedToken = await verifyIdToken(idToken);
    if (!decodedToken) {
      return [];
    }

    return await courseApi.getCoursesByUserId(decodedToken.uid);
  } catch (error) {
    console.error("Error getting courses:", error);
    return [];
  }
}
