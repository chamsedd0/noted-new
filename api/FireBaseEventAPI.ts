import "server-only";
import { db } from "@/lib/firebase-admin";
import { Event } from "@/types/Event";

async function getUserEvents(userId: string): Promise<Event[]> {
  const userDoc = await db.collection("users").doc(userId).get();

  if (!userDoc.exists) return [];

  const userData = userDoc.data();
  return userData?.events || [];
}

async function addEvent(userId: string, event: Event): Promise<void> {
  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new Error("User not found");
  }

  const userData = userDoc.data();
  const events = userData?.events || [];

  await userRef.update({
    events: [...events, event],
  });
}

async function updateEvent(
  userId: string,
  eventIndex: number,
  updates: Partial<Event>
): Promise<void> {
  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new Error("User not found");
  }

  const userData = userDoc.data();
  const events = [...(userData?.events || [])];

  if (eventIndex >= 0 && eventIndex < events.length) {
    events[eventIndex] = { ...events[eventIndex], ...updates };
    await userRef.update({ events });
  } else {
    throw new Error("Event not found");
  }
}

async function deleteEvent(userId: string, eventIndex: number): Promise<void> {
  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new Error("User not found");
  }

  const userData = userDoc.data();
  const events = [...(userData?.events || [])];

  if (eventIndex >= 0 && eventIndex < events.length) {
    events.splice(eventIndex, 1);
    await userRef.update({ events });
  } else {
    throw new Error("Event not found");
  }
}

export const eventApi = {
  getUserEvents,
  addEvent,
  updateEvent,
  deleteEvent,
};
