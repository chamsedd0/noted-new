import { IUserRepository } from "../../interfaces/IUserRepsitory";
import { UserDTO } from "../../dtos/UserDTO";
import { AccountSetupStage } from "../../entities/User";

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(uid: string): Promise<UserDTO | null> {
    const user = await this.userRepository.getUser(uid);
    if (!user) return null;

    const accountSetup = user.getAccountSetup();
    
    return {
      uid: user.getUid(),
      name: user.getName(),
      email: user.getEmail(),
      birthDate: user.getBirthDate(),
      photoUrl: user.getPhotoUrl(),
      accountSetup: accountSetup ? {
        accountSetup: accountSetup.accountSetup,
        stage: accountSetup.stage as AccountSetupStage
      } : undefined
    };
  }
}
