import { IUserRepository } from "../../interfaces/IUserRepsitory";


export class AddUserCoursesIdsUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    user_id: string,
    ids: string[],
  ): Promise<void> {
    
    await this.userRepository.addUserCourseIds(ids, user_id);
  }
}
