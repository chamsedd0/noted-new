import { IUserRepository } from "../../interfaces/IUserRepsitory";
import { UserEntity, AccountSetup } from "../../entities/User";
import { CreateUserDTO } from "../../dtos/UserDTO";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    uid: string,
    dto: CreateUserDTO,
    accountSetup: AccountSetup
  ): Promise<void> {
    const user = new UserEntity(
      uid,
      `${dto.firstName} ${dto.lastName}`,
      dto.email,
      dto.birthDate
    );

    user.setAccountSetup(accountSetup.accountSetupCompleted, accountSetup.stage);

    await this.userRepository.createUser(user);
  }
}
