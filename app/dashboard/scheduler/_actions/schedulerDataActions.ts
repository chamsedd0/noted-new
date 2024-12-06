"use server";

import { userApi } from "@/api/FirebaseUserApi";
import { verifyIdToken } from "@/lib/firebase-admin";
// import { Event } from "@/types/Event";

// interface CourseActivity {
//   timestamps: {
//     day: string;
//     start: number;
//     finish: number;
//   }[];
//   title: string;
//   color: string;
// }

// function transformCoursesToEvents(courses: CourseActivity[], eventType: string): Event[] {
//   return courses.flatMap((course) => {
//     const { timestamps, title, color } = course;
//     return timestamps.map((timestamp): Event => ({
//       day: timestamp.day,
//       start: timestamp.start,
//       finish: timestamp.finish,
//       title,
//       color,
//       type: eventType,
//     }));
//   });
// }

export async function getSchedulerData(idToken: string) {
  try {
    const decodedToken = await verifyIdToken(idToken);
    const userData = await userApi.getUser(decodedToken.uid);

    if (!userData) return { success: false, error: "User not found" };

    const events: unknown[] = [];

    return { success: true, data: events };
  } catch (error) {
    console.error("Error fetching scheduler data:", error);
    return { success: false, error: "Failed to fetch scheduler data" };
  }
}
