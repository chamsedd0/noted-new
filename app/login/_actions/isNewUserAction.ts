import { FirebaseUserRepository } from "@/src/persistence/FirebaseUserRepository";
import { GetUserUseCase } from "@/src/use-cases/user/getUserUseCase";

export async function isNewUserAction(userId: string): Promise<string | null> {
  const userRepository = new FirebaseUserRepository();
  const getUserUseCase = new GetUserUseCase(userRepository);

  const userData = await getUserUseCase.execute(userId);

  if (userData?.accountSetup?.accountSetupCompleted) {
    return null; // User is fully set up
  }

  return userData?.accountSetup?.stage || "personal-info";
}
