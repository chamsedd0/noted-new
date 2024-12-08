import "server-only";
import { db } from "@/lib/firebase-admin";
import { User } from "@/types/User";
import { Event } from "@/types/Event";

async function createUser(user: User): Promise<void> {
  try {
    const userRef = db.collection("users").doc(user.uid);
    await userRef.set({
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
      accountSetupStage: user.accountSetupStage,
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function getUser(uid: string): Promise<User | null> {
  try {
    const userDoc = await db.collection("users").doc(uid).get();
    const userData = {
      ...userDoc.data(),
      uid: userDoc.id,
    };
    return userData as User;
  } catch (error) {
    throw new Error((error as Error).message);
  }
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
  try {
    await db.collection("users").doc(id).delete();
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function updateUserEvents(userId: string, events: Event[]) {
  const userRef = db.collection("users").doc(userId);
  await userRef.update({ events });
}

export const userApi = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateUserEvents,
};
