"use server";

import { auth } from "@/lib/auth";
import { FirebaseCourseRepository } from "@/src/persistence/FirebaseCourseRepsitory";
import { CreateCourseUseCase } from "@/src/use-cases/course/createCourseUseCase";
import { CreateCourseDTO } from "@/src/dtos/CourseDTO";
import { redirect } from "next/navigation";

export async function createCourse(formData: CreateCourseDTO) {
  try {
    const { getUser } = await auth();
    const user = getUser();

    if (!user) {
      redirect("/login");
    }

    const courseRepository = new FirebaseCourseRepository();
    const createCourseUseCase = new CreateCourseUseCase(courseRepository);

    const courseId = await createCourseUseCase.execute(formData);

    console.log("Course created with ID:", courseId);
    return courseId;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
}
