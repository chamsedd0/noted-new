import { UserEntity } from "../entities/User";

export interface IUserRepository {
  createUser(user: UserEntity): Promise<void>;
  getUser(uid: string): Promise<UserEntity | null>;
  updateUser(user: UserEntity): Promise<void>;
  deleteUser(uid: string): Promise<void>;
  addUserCourseIds(ids: string[], user_id: string): Promise<void>;
}
