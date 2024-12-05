import "server-only";
import { db, FieldValue } from "@/lib/firebase-admin";
import { Course } from "@/types/Course";

// Helper function to get user reference
const getUserRef = (userId: string) => db.collection("users").doc(userId);

async function createCourses(userId: string, courses: Course[]): Promise<void> {
  const userRef = getUserRef(userId);
  const userDoc = await userRef.get();
  const userData = userDoc.data();
  const currentCourses = userData?.courses || [];

  // Add new courses with generated UIDs
  const coursesWithIds = courses.map(course => ({
    ...course,
    uid: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }));

  await userRef.update({
    courses: [...currentCourses, ...coursesWithIds]
  });
}

async function getCoursesByUserId(userId: string): Promise<Course[]> {
  const userDoc = await getUserRef(userId).get();
  const userData = userDoc.data();
  return userData?.courses || [];
}

async function updateCourse(userId: string, updatedCourse: Course): Promise<void> {
  const userRef = getUserRef(userId);
  const userDoc = await userRef.get();
  const userData = userDoc.data();
  const courses = userData?.courses || [];

  const updatedCourses = courses.map((course: Course) =>
    course.uid === updatedCourse.uid ? { ...course, ...updatedCourse } : course
  );

  await userRef.update({ courses: updatedCourses });
}

async function deleteCourse(userId: string, courseId: string): Promise<void> {
  const userRef = getUserRef(userId);
  const courses = await getCoursesByUserId(userId);
  const courseToDelete = courses.find(course => course.uid === courseId);

  if (courseToDelete) {
    await userRef.update({
      courses: FieldValue.arrayRemove(courseToDelete)
    });
  }
}

export const courseApi = {
  createCourses,
  getCoursesByUserId,
  updateCourse,
  deleteCourse,
};
