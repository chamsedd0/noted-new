import { IUserRepository } from "../../interfaces/IUserRepsitory";
import { AccountSetup, UserEntity } from "@/src/entities/User";
import { UserDTO } from "@/src/dtos/UserDTO";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    uid: string,
    dto: UserDTO,
    accountSetup: AccountSetup
  ): Promise<void> {
    const user = new UserEntity(
      uid,
      dto.name,
      dto.email,
      dto.birthDate
    );

    user.setAccountSetup(accountSetup.accountSetupCompleted, accountSetup.stage);

    await this.userRepository.updateUser(user);
  }
}
