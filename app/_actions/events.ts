"use server";

import { eventApi } from "@/api/FireBaseEventAPI";
import { Event } from "@/types/Event";

async function getTodayEvents(
  userId: string,
  todayDate: string
): Promise<Event[]> {
  const events = await eventApi.getUserEvents(userId);
  return events.filter((event) => event.day === todayDate);
}

async function addNewEvent(userId: string, event: Event): Promise<void> {
  await eventApi.addEvent(userId, event);
}

async function updateExistingEvent(
  userId: string,
  eventIndex: number,
  updates: Partial<Event>
): Promise<void> {
  await eventApi.updateEvent(userId, eventIndex, updates);
}

async function removeEvent(userId: string, eventIndex: number): Promise<void> {
  await eventApi.deleteEvent(userId, eventIndex);
}

export { getTodayEvents, addNewEvent, updateExistingEvent, removeEvent };
