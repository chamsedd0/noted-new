import { TimeSlot } from "./Time";

export type Course = {
  uid: string;
  title: string;
  color: string;
  timeSlots?: TimeSlot[];
  lastModified: string;
  syllabus?: string;
};
