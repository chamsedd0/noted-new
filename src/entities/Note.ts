export class Note {
  uid: string;
  content: string;
  title: string;
  createdAt?: Date;
  keywords?: string[];

  constructor(
    uid: string,
    content: string,
    title: string,
    createdAt?: Date
  ) {
    this.uid = uid;
    this.content = content;
    this.title = title;
    this.createdAt = createdAt;
  }
}
