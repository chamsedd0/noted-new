"use server";

import { courseApi } from "@/api/FireBaseCourseAPI";
import { eventApi } from "@/api/FireBaseEventAPI";
import { Course } from "@/types/Course";
import { convertCourseToEvents } from "@/app/utils";

async function getUserCourses(userId: string) {
  try {
    return await courseApi.getCoursesByUserId(userId);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function addNewCourse(userId: string, course: Course) {
  try {
    await courseApi.addCourse(userId, course);
    const courseEvents = convertCourseToEvents(course);
    await eventApi.addEvents(userId, courseEvents);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function updateCourse(userId: string, updatedCourse: Course) {
  try {
    await courseApi.updateCourse(userId, updatedCourse);
    const courseEvents = convertCourseToEvents(updatedCourse);
    await eventApi.updateCourseEvents(userId, updatedCourse.uid, courseEvents);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function deleteCourse(userId: string, courseId: string) {
  try {
    await courseApi.deleteCourse(userId, courseId);
    await eventApi.deleteCourseEvents(userId, courseId);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export { getUserCourses, addNewCourse, updateCourse, deleteCourse };
