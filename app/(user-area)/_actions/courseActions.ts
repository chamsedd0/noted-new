"use server";

import { courseApi } from "@/api/FireBaseCourseAPI";
import { eventApi } from "@/api/FireBaseEventAPI";
import { Course } from "@/types/Course";
import { verifyToken } from "@/app/utils/jwt";
import { cookies } from "next/headers";
import { convertCourseToEvents } from "@/app/utils";
import { redirect } from "next/navigation";

async function getUserCourses() {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);
    return await courseApi.getCoursesByUserId(userId);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function addNewCourse(course: Course) {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);

    await courseApi.addCourse(userId, course);
    const courseEvents = convertCourseToEvents(course);
    await eventApi.addEvents(userId, courseEvents);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function updateCourse(updatedCourse: Course) {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);

    await courseApi.updateCourse(userId, updatedCourse);
    const courseEvents = convertCourseToEvents(updatedCourse);
    await eventApi.updateCourseEvents(userId, updatedCourse.uid, courseEvents);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function deleteCourse(courseId: string) {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);

    await courseApi.deleteCourse(userId, courseId);
    await eventApi.deleteCourseEvents(userId, courseId);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export { getUserCourses, addNewCourse, updateCourse, deleteCourse };
