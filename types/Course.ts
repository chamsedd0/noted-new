import { TimeStamp } from "./Time";

export type Course = {
  uid?: string;
  title: string;
  color?: string;
  syllabus?: string;
  timeslots?: TimeStamp[];
};
