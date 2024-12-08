import { Course } from "./Course";
import { Event } from "./Event";

export enum AccountSetupStage {
  PERSONAL_INFO = "personal-info",
  ADD_COURSES = "add-courses",
  ADD_SYLLABUS = "add-syllabus",
  ADD_TIME_SLOTS = "add-time-slots",
  CHOOSE_PLAN = "choose-plan",
  COMPLETED = "completed",
}

export enum Plan {
  BASIC = "Basic Plan",
  PREMIUM = "Premium Plan",
}

export interface User {
  uid: string;
  name: string;
  email: string;
  photoUrl: string | null;
  birthDate?: string;
  accountSetupStage?: string;
  plan?: string;
  courses?: Course[];
  events?: Event[];
}
