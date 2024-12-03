export class CourseEntity {
  private uid?: string;
  private title: string;
  private color: string;
  private createdAt?: Date;

  constructor(
    title: string,
    color: string,
    createdAt?: Date,
    uid?: string
  ) {
    this.uid = uid;
    this.title = title;
    this.color = color;
    this.createdAt = createdAt || new Date();
  }

  public getUid() {
    return this.uid;
  }

  public getTitle() {
    return this.title;
  }

  public getColor() {
    return this.color;
  }

  public getCreatedAt() {
    return this.createdAt;
  }

  public setUid(uid: string) {
    this.uid = uid;
  }
}
