import { TimeSlot } from "./types";

export class Event {
  id: string;
  title: string;
  color: string;
  timestamps: TimeSlot[];

  constructor(
    id: string,
    title: string,
    color: string,
    timestamps: TimeSlot[]
  ) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.timestamps = timestamps;
  }
}
