"use server";

import { auth } from "@/lib/auth";
import { FirebaseUserRepository } from "@/src/persistence/FirebaseUserRepository";
import { GetUserUseCase } from "@/src/use-cases/user/getUserUseCase";
import { UserDTO } from "@/src/dtos/UserDTO";
import { redirect } from "next/navigation";

export async function getUser(): Promise<UserDTO> {
  const { getUser } = await auth();
  const user = getUser();

  if (!user) {
    redirect("/login");
  }

  const userRepository = new FirebaseUserRepository();
  const getUserUseCase = new GetUserUseCase(userRepository);

  const userData = await getUserUseCase.execute(user.userId);

  if (!userData) {
    redirect("/login");
  }

  return userData;
}
