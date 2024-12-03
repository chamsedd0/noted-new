import { IUserRepository } from "../../interfaces/IUserRepsitory";
import { UserEntity, AccountSetup } from "../../entities/User";
import { CreateUserDTO } from "../../dtos/UserDTO";

export class AddUserCoursesIdsUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    user_id: string,
    ids: string[],
  ): Promise<void> {
    
    await this.userRepository.addUserCourseIds(ids, user_id);
  }
}
