import { IUserRepository } from "../../interfaces/IUserRepsitory";
import { UserDTO } from "../../dtos/UserDTO";

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(uid: string): Promise<UserDTO | null> {
    const user = await this.userRepository.getUser(uid);
    if (!user) return null;

    const accountSetup = user.getAccountSetup() ? user.getAccountSetup() : undefined;
    
    return {
      uid: user.getUid(),
      name: user.getName(),
      email: user.getEmail(),
      birthDate: user.getBirthDate(),
      photoUrl: user.getPhotoUrl(),
      accountSetup: accountSetup,
    };
  }
}
