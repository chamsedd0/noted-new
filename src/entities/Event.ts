import { TimeStamp } from "./types";

export class Event {
  id: string;
  title: string;
  color: string;
  timestamps: TimeStamp[];

  constructor(
    id: string,
    title: string,
    color: string,
    timestamps: TimeStamp[]
  ) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.timestamps = timestamps;
  }
}
