"use server";

import { eventApi } from "@/api/FireBaseEventAPI";
import { Event } from "@/types/Event";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/app/utils/jwt";

export async function getEvents() {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);

    return await eventApi.getUserEvents(userId);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export const addEvent = async (event: Event) => {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);

    await eventApi.addEvent(userId, event);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export async function updateEvent(updates: Partial<Event>) {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);

    await eventApi.updateEvent(userId, updates);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function deleteEvent(event: Event) {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);

    await eventApi.deleteEvent(userId, event.uid);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function updateCourseEvents(
  courseId: string,
  updatedEvents: Event[]
) {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);

    await eventApi.updateCourseEvents(userId, courseId, updatedEvents);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function deleteCourseEvents(courseId: string) {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
    }

    const { userId } = await verifyToken(token.value);

    await eventApi.deleteCourseEvents(userId, courseId);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
