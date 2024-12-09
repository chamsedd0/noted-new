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

export interface EventResponse {
  success: boolean;
  error?: string;
}

export const addEvent = async (idToken: string, event: Event): Promise<EventResponse> => {
  try {
    console.log('Server action - Adding event:', { idToken, event }); // Debug log
    await eventApi.addEvent(idToken, event);
    return { success: true };
  } catch (error) {
    console.error('Server action error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

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
