import { IUserRepository } from "@/src/interfaces/IUserRepsitory";
import { CourseDTO } from "../../dtos/CourseDTO";

export class AddUserCoursesUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(user_id: string, courses: CourseDTO[]): Promise<void> {
    await this.userRepository.addUserCourses(user_id, courses);
  }
}
