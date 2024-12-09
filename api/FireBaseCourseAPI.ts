import "server-only";
import { db, FieldValue } from "@/app/lib/firebase-admin";
import { Course } from "@/types/Course";

// Helper function to get user reference
const getUserRef = (userId: string) => db.collection("users").doc(userId);

async function createCourses(userId: string, courses: Course[]): Promise<void> {
  try {
    const userRef = getUserRef(userId);
    await userRef.update({
      courses: courses,
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function addCourse(userId: string, course: Course): Promise<void> {
  try {
    const userRef = getUserRef(userId);
    await userRef.update({
      courses: FieldValue.arrayUnion(course),
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function getCoursesByUserId(userId: string): Promise<Course[]> {
  try {
    const userDoc = await getUserRef(userId).get();
    const userData = userDoc.data();
    return userData?.courses || [];
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function updateCourse(
  userId: string,
  updatedCourse: Course
): Promise<void> {
  try {
    const userRef = getUserRef(userId);
    const courses = await getCoursesByUserId(userId);
    const courseToUpate = courses.find(
      (course) => course.uid === updatedCourse.uid
    );

    if (courseToUpate) {
      await userRef.update({
        courses: courses.map((course) =>
          course.uid === updatedCourse.uid ? updatedCourse : course
        ),
      });
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function deleteCourse(userId: string, courseId: string): Promise<void> {
  try {
    const userRef = getUserRef(userId);
    const courses = await getCoursesByUserId(userId);
    const courseToDelete = courses.find((course) => course.uid === courseId);

    if (courseToDelete) {
      await userRef.update({
        courses: courses.filter((course) => course.uid !== courseId),
      });
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export const courseApi = {
  addCourse,
  createCourses,
  getCoursesByUserId,
  updateCourse,
  deleteCourse,
};
