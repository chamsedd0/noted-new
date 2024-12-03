"use server";

import { auth } from "@/lib/auth";
import { FirebaseUserRepository } from "@/src/persistence/FirebaseUserRepository";
import { CreateUserUseCase } from "@/src/use-cases/user/createUserUseCase";
import { CreateUserDTO } from "@/src/dtos/UserDTO";
import { redirect } from "next/navigation";
import { AccountSetupStage } from "@/src/entities/User";

export async function createUser(formData: CreateUserDTO) {
  try {
    const { getUser } = await auth();
    const user = getUser();

    if (!user) {
      redirect("/login");
    }

    const userRepository = new FirebaseUserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const accountSetup = {
      accountSetupCompleted: false,
      stage: AccountSetupStage.ADD_COURSES as AccountSetupStage,
    };

    await createUserUseCase.execute(user.userId, formData, accountSetup);

    redirect("/account-setup/add-courses");
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
