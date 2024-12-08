"use server";

import { eventApi } from "@/api/FireBaseEventAPI";
import { Event } from "@/types/Event";

export async function getEvents(userId: string) {
  try {
    return await eventApi.getUserEvents(userId);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function addEvent(userId: string, event: Event) {
  try {
    console.log('Server action - Adding event:', { userId, event }); // Debug log
    await eventApi.addEvent(userId, event);
  } catch (error) {
    console.error('Server action error:', error); // Debug log
    throw new Error(error instanceof Error ? error.message : 'Failed to add event');
  }
}

export async function updateEvent(userId: string, updates: Partial<Event>) {
  try {
    await eventApi.updateEvent(userId, updates);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function deleteEvent(userId: string, event: Event) {
  try {
    await eventApi.deleteEvent(userId, event.uid);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function updateCourseEvents(
  userId: string,
  courseId: string,
  updatedEvents: Event[]
) {
  try {
    await eventApi.updateCourseEvents(userId, courseId, updatedEvents);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function deleteCourseEvents(userId: string, courseId: string) {
  try {
    await eventApi.deleteCourseEvents(userId, courseId);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
