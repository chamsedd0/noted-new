"use server";

import { eventApi } from "@/api/FireBaseEventAPI";
import { verifyIdToken } from "@/lib/firebase-admin";
import { Event } from "@/types/Event";

export async function addNewEvent(idToken: string, eventData: {
  title: string;
  timestamps: Array<{
    day: string;
    start: number;
    finish: number;
  }>;
  color: string;
  type: string;
}) {
  try {
    const decodedToken = await verifyIdToken(idToken);
    const event: Event = {
      title: eventData.title,
      day: eventData.timestamps[0].day,
      start: eventData.timestamps[0].start,
      finish: eventData.timestamps[0].finish,
      color: eventData.color
    };
    await eventApi.addEvent(decodedToken.uid, event);
    return { success: true };
  } catch (error) {
    console.error("Error adding event:", error);
    return { success: false, error: "Failed to add event" };
  }
}

export async function editEvent(
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