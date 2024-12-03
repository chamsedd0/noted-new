"use server";

import { auth } from "@/lib/auth";
import { FirebaseUserRepository } from "@/src/persistence/FirebaseUserRepository";
import { AddUserCoursesIdsUseCase } from "@/src/use-cases/user/addUserCoursesIdsUseCase";
import { UpdateUserUseCase } from "@/src/use-cases/user/updateUserUseCase";
import { redirect } from "next/navigation";
import { AccountSetupStage } from "@/src/entities/User";
import { GetUserUseCase } from "@/src/use-cases/user/getUserUseCase";

export async function addUserCourseIdsAction(ids: string[]) {
  try {
    const { getUser } = await auth();
    const user = getUser();

    if (!user) {
      redirect("/login");
    }

    const userRepository = new FirebaseUserRepository();
    const addUserCoursesIdsUseCase = new AddUserCoursesIdsUseCase(userRepository);
    const updateUserUseCase = new UpdateUserUseCase(userRepository);
    const getUserUseCase = new GetUserUseCase(userRepository);

    const userInstance = await getUserUseCase.execute(user.userId);

    await addUserCoursesIdsUseCase.execute(user.userId, ids);

    const accountSetup = {
      accountSetupCompleted: false,
      stage: AccountSetupStage.ADD_SYLLABUS as AccountSetupStage,
    };

    if(userInstance){
      await updateUserUseCase.execute(user.userId, userInstance, accountSetup);
    }

    console.log("Course ids saved in user");
    redirect("/account-setup/add-syllabus");
    

  } catch (error) {
    console.error("Error saving courses:", error);
    throw error;
  }
}
