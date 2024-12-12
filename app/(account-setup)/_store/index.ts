import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "@/types/User";
import { Course } from "@/types/Course";
import { TimeSlot } from "@/types/Time";
import { convertCourseToEvents } from "@/app/utils";
import { getUserData, saveUser } from "../_actions/accountSetupActions";

interface AccountSetupStore {
  user: User | null;
  loadUser: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  updateCourseWithTimeSlots: (course: Course, timeSlots: TimeSlot[]) => void;
  saveSetup: () => Promise<void>;
}

export const accountSetupStore = create<AccountSetupStore>()(
  persist(
    (set, get, api) => ({
      user: null,
      loadUser: async () => {
        const currentUser = get().user;
        if (currentUser) return;

        try {
          const userData = await getUserData();
          if (!userData) throw new Error("No user data received");
          set({ user: userData });
        } catch (error) {
          console.error("Error loading user:", error);
          throw error;
        }
      },
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
      addCourse: (course) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                courses: [...(state.user.courses || []), course],
              }
            : null,
        })),
      updateCourse: (course) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                courses:
                  state.user.courses?.map((c) =>
                    c.uid === course.uid ? course : c
                  ) || [],
              }
            : null,
        })),
      updateCourseWithTimeSlots: (course, timeSlots) => {
        const updatedCourse = { ...course, timeSlots };
        const events = convertCourseToEvents(updatedCourse);

        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                courses:
                  state.user.courses?.map((c) =>
                    c.uid === course.uid ? updatedCourse : c
                  ) || [],
                events: [...(state.user.events || []), ...events],
              }
            : null,
        }));
      },
      saveSetup: async () => {
        const { user } = get();
        if (!user) throw new Error("No user data to save");

        const allEvents = user.courses?.flatMap(convertCourseToEvents) || [];
        const updatedUser = { ...user, events: allEvents };

        try {
          await saveUser(updatedUser);
          api.persist.clearStorage();
        } catch (error) {
          console.error("Error saving setup:", error);
          throw error;
        }
      },
    }),
    {
      name: "account-setup",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
