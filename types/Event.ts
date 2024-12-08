export type Event = {
  uid: string;
  day: string;
  start: number;
  finish: number;
  title: string;
  color: string;
  type: "course" | "activity";
  courseId?: string;
};
