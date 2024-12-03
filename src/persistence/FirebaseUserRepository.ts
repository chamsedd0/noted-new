import { IUserRepository } from "../interfaces/IUserRepsitory";
import { UserEntity } from "../entities/User";
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

  async addUserCourseIds(ids: string[], user_id: string): Promise<void> {
    const userRef = db.collection("users").doc(user_id);
    await userRef.set({
      courseIds: ids,
    }, { merge: true });

  }
}
