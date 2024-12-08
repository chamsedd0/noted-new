import "server-only";
import { db } from "@/lib/firebase-admin";
import { User } from "@/types/User";

async function createUser(user: User): Promise<void> {
  const userRef = db.collection("users").doc(user.uid);
  await userRef.set({
    uid: user.uid,
    name: user.name,
    email: user.email,
    photoUrl: user.photoUrl,
    accountSetupStage: user.accountSetupStage,
  });
}

async function getUser(uid: string): Promise<User | null> {
  const userDoc = await db.collection("users").doc(uid).get();

  if (!userDoc.exists) return null;

  const userData = userDoc.data();

  if (!userData) return null;

  return userData as User;
}

async function updateUser(uid: string, updates: Partial<User>): Promise<void> {
  const userRef = db.collection("users").doc(uid);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new Error("User not found");
  }

  // Only update fields that are provided and not undefined
  const validUpdates = Object.entries(updates).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, unknown>);

  await userRef.update(validUpdates);
}

async function deleteUser(id: string): Promise<void> {
  await db.collection("users").doc(id).delete();
}

export const userApi = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
