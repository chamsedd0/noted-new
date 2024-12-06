"use server";

import { eventApi } from "@/api/FireBaseEventAPI";
import { verifyIdToken } from "@/lib/firebase-admin";
import { Event } from "@/types/Event";

export async function getSchedulerEvents(idToken: string) {
  try {
    const decodedToken = await verifyIdToken(idToken);
    const events = await eventApi.getUserEvents(decodedToken.uid);
    return { success: true, data: events };
  } catch (error) {
    console.error("Error fetching events:", error);
    return { success: false, error: "Failed to fetch events" };
  }
}

export async function updateSchedulerEvent(
  idToken: string,
  eventIndex: number,
  updates: Partial<Event>
) {
  try {
    const decodedToken = await verifyIdToken(idToken);
    await eventApi.updateEvent(decodedToken.uid, eventIndex, updates);
    return { success: true };
  } catch (error) {
    console.error("Error updating event:", error);
    return { success: false, error: "Failed to update event" };
  }
}

export async function addSchedulerEvent(idToken: string, event: Event) {
  try {
    const decodedToken = await verifyIdToken(idToken);
    await eventApi.addEvent(decodedToken.uid, event);
    return { success: true };
  } catch (error) {
    console.error("Error adding event:", error);
    return { success: false, error: "Failed to add event" };
  }
}

export async function deleteSchedulerEvent(idToken: string, eventIndex: number) {
  try {
    const decodedToken = await verifyIdToken(idToken);
    await eventApi.deleteEvent(decodedToken.uid, eventIndex);
    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    return { success: false, error: "Failed to delete event" };
  }
} 