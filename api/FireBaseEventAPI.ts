import "server-only";
import { db } from "@/lib/firebase-admin";
import { Event } from "@/types/Event";

// Helper function to get user reference
const getUserRef = (userId: string) => db.collection("users").doc(userId);

async function getUserEvents(userId: string): Promise<Event[]> {
  try {
    const userRef = getUserRef(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) return [];
    return userDoc.data()?.events || [];
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function addEvents(userId: string, events: Event[]): Promise<void> {
  try {
    const userRef = getUserRef(userId);
    await userRef.update({ events });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function addEvent(userId: string, event: Event): Promise<void> {
  try {
    const userRef = getUserRef(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) throw new Error("User not found");

    const events = userDoc.data()?.events || [];
    await userRef.update({ events: [...events, event] });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function updateEvent(
  userId: string,
  updates: Partial<Event>
): Promise<void> {
  try {
    const userRef = getUserRef(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) throw new Error("User not found");

    const events = [...(userDoc.data()?.events || [])];
    const eventToUpdate = events.find((e: Event) => e.uid === updates.uid);
    if (eventToUpdate) {
      events[events.indexOf(eventToUpdate)] = { ...eventToUpdate, ...updates };
      await userRef.update({ events });
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function deleteEvent(userId: string, eventId: string): Promise<void> {
  try {
    const userRef = getUserRef(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) throw new Error("User not found");

    const events = [...(userDoc.data()?.events || [])];
    const eventToDelete = events.find((e: Event) => e.uid === eventId);

    if (eventToDelete) {
      await userRef.update({
        events: events.filter((e: Event) => e.uid !== eventId),
      });
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function deleteCourseEvents(
  userId: string,
  courseId: string
): Promise<void> {
  try {
    const userRef = getUserRef(userId);
    const events = await getUserEvents(userId);
    await userRef.update({
      events: events.filter(
        (e: Event) => !(e.type === "course" && e.courseId === courseId)
      ),
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function updateCourseEvents(
  userId: string,
  courseId: string,
  newEvents: Event[]
): Promise<void> {
  try {
    const userRef = getUserRef(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) throw new Error("User not found");

    const currentEvents = userDoc.data()?.events || [];

    // Filter out old events for this course
    const otherEvents = currentEvents.filter(
      (e: Event) => !(e.type === "course" && e.courseId === courseId)
    );

    // Add new course events
    await userRef.update({
      events: [...otherEvents, ...newEvents],
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export const eventApi = {
  addEvents,
  addEvent,
  getUserEvents,
  updateEvent,
  updateCourseEvents,
  deleteEvent,
  deleteCourseEvents,
};
