"use server";

import { auth } from "@/lib/auth";
import { FirebaseUserRepository } from "@/src/persistence/FirebaseUserRepository";
import { AddUserCoursesUseCase } from "@/src/use-cases/user/addUserCoursesIdsUseCase";
import { redirect } from "next/navigation";
import { AccountSetupStage } from "@/src/entities/User";
import { CourseDTO } from "@/src/dtos/CourseDTO";

export async function addUserCoursesAction(coursesData: { title: string; color: string }[]) {
  try {
    const { getUser } = await auth();
    const user = getUser();

    if (!user) {
      redirect("/login");
    }

    const userRepository = new FirebaseUserRepository();
    const addUserCoursesUseCase = new AddUserCoursesUseCase(userRepository);

    const courses: CourseDTO[] = coursesData.map((data) => ({
      uid: crypto.randomUUID(), // Generate a unique ID for the course
      title: data.title,
      color: data.color,
      createdAt: new Date(),
    }));

    await addUserCoursesUseCase.execute(user.userId, courses);

    redirect("/account-setup/add-syllabus");
  } catch (error) {
    console.error("Error adding courses to user:", error);
    throw error;
  }
}
