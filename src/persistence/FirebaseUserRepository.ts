import { IUserRepository } from "../interfaces/IUserRepsitory";
import { UserEntity } from "../entities/User";
import { CourseDTO } from "../dtos/CourseDTO";
import { db } from "../../lib/firebase-admin";

export class FirebaseUserRepository implements IUserRepository {
  
  async createUser(user: UserEntity): Promise<void> {
    const userRef = db.collection("users").doc(user.getUid());
    await userRef.set({
      name: user.getName(),
      email: user.getEmail(),
      birthDate: user.getBirthDate().toISOString(),
      accountSetup: user.getAccountSetup(),
    });
  }

  async getUser(uid: string): Promise<UserEntity | null> {
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return null;
    }

    const userData = userDoc.data();
    if (!userData) return null;

    return new UserEntity(
      uid,
      userData.name,
      userData.email,
      new Date(userData.birthDate),
      userData.image
    );
  }

  async updateUser(user: UserEntity): Promise<void> {
    const userRef = db.collection("users").doc(user.getUid());
    await userRef.update({
      name: user.getName(),
      email: user.getEmail(),
      birthDate: user.getBirthDate().toISOString(),
      accountSetup: user.getAccountSetup(),
    });
  }

  async deleteUser(id: string): Promise<void> {
    await db.collection("users").doc(id).delete();
  }

  async addUserCourses(user_id: string, courses: CourseDTO[]): Promise<void> {
    const userRef = db.collection("users").doc(user_id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new Error("User not found");
    }

    const userData = userDoc.data();
    const existingCourses = userData?.courses || [];

    const newCourses = courses.map((course) => ({
      uid: course.uid,
      title: course.title,
      color: course.color,
      createdAt: course.createdAt.toISOString(),
    }));

    await userRef.update({
      courses: [...existingCourses, ...newCourses],
    });
  }
}
