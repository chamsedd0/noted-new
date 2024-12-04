import { UserEntity } from "../entities/User";
import { CourseDTO } from "../dtos/CourseDTO";

export interface IUserRepository {
  createUser(user: UserEntity): Promise<void>;
  getUser(uid: string): Promise<UserEntity | null>;
  updateUser(user: UserEntity): Promise<void>;
  deleteUser(uid: string): Promise<void>;
  addUserCourses(user_id: string, courses: CourseDTO[]): Promise<void>;
}
