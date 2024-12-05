"use server";

import { courseApi } from "@/api/FireBassCourseApi";
import { userApi } from "@/api/FirebaseUserApi";
import { verifyIdToken } from "@/lib/firebase-admin";
import { Course } from "@/types/Course";
import { AccountSetupStage } from "@/types/User";
import { redirect } from "next/navigation";

export async function createCourses(
  idToken: string,
  courses: Course[]
): Promise<void> {
  try {
    // Verify the ID token to get the user's UID from Firebase-admin SDK which runs on the server
    const decodedToken = await verifyIdToken(idToken);

    if (!decodedToken) {
      redirect("/login");
    }
    // create courses
    await courseApi.createCourses(decodedToken.uid, courses);

    // update user account setup
    await userApi.updateUser(decodedToken.uid, {
      accountSetup: {
        completed: false,
        stage: AccountSetupStage.ADD_SYLLABUS,
      },
    });

    redirect("/account-setup/add-syllabus");
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
}
