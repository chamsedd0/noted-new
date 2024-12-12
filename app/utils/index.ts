import { Course } from "@/types/Course";
import { Event } from "@/types/Event";

export const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;
export type Weekday = (typeof WEEKDAYS)[number];

// Helper function to convert courses to events
export function convertCourseToEvents(course: Course): Event[] {
    return (course.timeSlots || []).map((slot) => ({
      uid: `${course.uid}-${slot.day}-${slot.start}-${slot.finish}`,
      title: course.title,
      day: slot.day,
      start: slot.start,
      finish: slot.finish,
      color: course.color,
      type: "course",
      courseId: course.uid,
    }));
  }
  