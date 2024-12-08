"use server";

import { db } from "@/lib/firebase-admin";
import { Course } from "@/types/Course";

async function getUserCourses(userId: string): Promise<Course[]> {
  try {
    const userDoc = await db.collection("users").doc(userId).get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      return userData?.courses || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
}

async function addNewCourse(userId: string, course: Course): Promise<void> {
  try {
    const now = new Date().toLocaleString();
    const courseWithTimestamp = {
      ...course,
      lastModified: now,
    };
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      const courses = userData?.courses || [];
      courses.push(courseWithTimestamp);
      await userRef.update({ courses });
    }
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
}

async function updateCourse(
  userId: string,
  oldTitle: string,
  updatedCourse: Course
): Promise<void> {
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      const courses = userData?.courses || [];
      const updatedCourses = courses.map((course: Course) =>
        course.title === oldTitle ? updatedCourse : course
      );
      await userRef.update({ courses: updatedCourses });
    }
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
}

async function deleteCourse(
  userId: string,
  courseTitle: string
): Promise<void> {
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      const updatedCourses = userData?.courses.filter(
        (course: Course) => course.title !== courseTitle
      );
      await userRef.update({ courses: updatedCourses });
    }
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
}

export { getUserCourses, addNewCourse, updateCourse, deleteCourse };
