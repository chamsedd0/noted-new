import { create } from "zustand";
import { User } from "@/types/User";
import { Course } from "@/types/Course";
import { Event } from "@/types/Event";
import { getUser } from "../_actions/userActions";
import {
  addNewCourse,
  updateCourse,
  deleteCourse,
} from "../_actions/courseActions";
import {
  addEvent,
  updateEvent,
  deleteEvent,
  getEvents,
} from "../_actions/eventActions";

interface GlobalStore {
  user: User | null;
  courses: Course[];
  events: Event[];
  selectedEvent: string | null;

  // User Actions
  getUserData: (userId: string) => Promise<void>;

  // Course Actions
  updateCourse: (course: Course) => Promise<void>;
  addCourse: (course: Course) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;

  // Event Actions
  addEvent: (event: Event) => Promise<void>;
  updateEvent: (eventUid: string, updates: Partial<Event>) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  setSelectedEvent: (event: string | null) => void;
}

const globalStore = create<GlobalStore>((set, get) => ({
  user: null,
  courses: [],
  events: [],
  selectedEvent: null,

  getUserData: async (userId: string) => {
    try {
      const user = await getUser(userId);
      const events = await getEvents(userId);
      set({
        user: user,
        courses: user.courses || [],
        events: events || [],
      });
    } catch (error) {
      throw error;
    }
  },

  addCourse: async (course: Course) => {
    const oldCourses = get().courses;
    const oldEvents = get().events;

    try {
      set({ courses: [...oldCourses, course] });

      const userId = get().user?.uid;
      if (!userId) throw new Error("User ID not found");

      await addNewCourse(userId, course);

      // Fetch updated events after course addition
      const updatedEvents = await getEvents(userId);
      set({ events: updatedEvents });
    } catch (error) {
      set({
        courses: oldCourses,
        events: oldEvents,
      });
      throw error;
    }
  },

  updateCourse: async (course: Course) => {
    const oldCourses = get().courses;
    const oldEvents = get().events;

    try {
      set({
        courses: oldCourses.map((c) => (c.uid === course.uid ? course : c)),
      });

      const userId = get().user?.uid;
      if (!userId) throw new Error("User ID not found");

      await updateCourse(userId, course);

      // Fetch updated events after course update
      const updatedEvents = await getEvents(userId);
      set({ events: updatedEvents });
    } catch (error) {
      set({
        courses: oldCourses,
        events: oldEvents,
      });
      throw error;
    }
  },

  deleteCourse: async (courseId: string) => {
    const oldCourses = get().courses;
    const oldEvents = get().events;

    try {
      set({ courses: oldCourses.filter((c) => c.uid !== courseId) });

      const userId = get().user?.uid;
      if (!userId) throw new Error("User ID not found");

      await deleteCourse(userId, courseId);

      // Fetch updated events after course deletion
      const updatedEvents = await getEvents(userId);
      set({ events: updatedEvents });
    } catch (error) {
      set({
        courses: oldCourses,
        events: oldEvents,
      });
      throw error;
    }
  },

  deleteEvent: async (eventId: string) => {
    const oldEvents = get().events;
    const oldCourses = get().courses;
    const eventToDelete = oldEvents.find((e) => e.uid === eventId);

    if (!eventToDelete) return;

    try {
      set({
        events: oldEvents.filter((e) => e.uid !== eventId),
      });

      const userId = get().user?.uid;
      if (!userId) throw new Error("User ID not found");

      await deleteEvent(userId, eventToDelete);

      // If it's a course event, update the course
      if (eventToDelete.type === "course" && eventToDelete.courseId) {
        const course = oldCourses.find((c) => c.uid === eventToDelete.courseId);
        if (course) {
          const updatedCourse = {
            ...course,
            timeSlots: course.timeSlots?.filter(
              (slot) =>
                !(
                  slot.day === eventToDelete.day &&
                  slot.start === eventToDelete.start &&
                  slot.finish === eventToDelete.finish
                )
            ),
          };
          await updateCourse(userId, updatedCourse);
          set({
            courses: oldCourses.map((c) =>
              c.uid === updatedCourse.uid ? updatedCourse : c
            ),
          });
        }
      }
    } catch (error) {
      set({
        events: oldEvents,
        courses: oldCourses,
      });
      throw error;
    }
  },

  addEvent: async (event: Event) => {
    if (event.type === "course") {
      throw new Error("Cannot directly add course events");
    }

    const oldEvents = get().events;
    try {
      set({ events: [...oldEvents, event] });

      const userId = get().user?.uid;
      if (!userId) throw new Error("User ID not found");

      await addEvent(userId, event);
    } catch (error) {
      set({ events: oldEvents });
      throw error;
    }
  },

  updateEvent: async (eventUid: string, updates: Partial<Event>) => {
    const oldEvents = get().events;
    const eventToUpdate = oldEvents.find((e) => e.uid === eventUid);

    if (!eventToUpdate) {
      throw new Error("Event not found");
    }

    if (eventToUpdate.type === "course") {
      throw new Error("Cannot directly update course events");
    }

    try {
      const newEvents = oldEvents.map((e) =>
        e.uid === eventUid ? { ...e, ...updates } : e
      );
      set({ events: newEvents });

      const userId = get().user?.uid;
      if (!userId) throw new Error("User ID not found");

      await updateEvent(userId, { ...updates, uid: eventUid });
    } catch (error) {
      set({ events: oldEvents });
      throw error;
    }
  },

  setSelectedEvent: (eventId) => set({ selectedEvent: eventId }),
}));

export default globalStore;
