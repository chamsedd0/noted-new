import { CourseEntity } from "./Course";

export type AccountSetup = {
  accountSetupCompleted: boolean;
  stage: AccountSetupStage;
};

export enum AccountSetupStage {
  PERSONAL_INFO = "personal-info",
  ADD_COURSES = "add-courses",
  ADD_SYLLABUS = "add-syllabus",
  ADD_TIME_SLOTS = "add-time-slots",
  CHOOSE_PLAN = "choose-plan",
}

export enum PlanType {
  BASIC = "basic",
  PREMIUM = "premium",
}

export class UserEntity {
  private uid: string;
  private accountSetup?: AccountSetup;
  private name: string;
  private email: string;
  private birthDate: Date;
  private photoUrl?: string;
  private plan?: PlanType;
  private courses: CourseEntity[] = [];

  constructor(
    uid: string,
    name: string,
    email: string,
    birthDate: Date,
    photoUrl?: string
  ) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.birthDate = birthDate;
    this.photoUrl = photoUrl;
  }

  public getUid() {
    return this.uid;
  }

  public getName() {
    return this.name;
  }
  public getEmail() {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getBirthDate() {
    return this.birthDate;
  }

  public setBirthDate(birthDate: Date) {
    this.birthDate = birthDate;
  }

  public getPhotoUrl() {
    return this.photoUrl;
  }

  public setPhotoUrl(photoUrl: string) {
    this.photoUrl = photoUrl;
  }

  public getPlan() {
    return this.plan;
  }

  public setPlan(plan: PlanType) {
    this.plan = plan;
  }

  public getAccountSetup() {
    return this.accountSetup;
  }

  public setAccountSetup(accountSetupCompleted: boolean, stage: AccountSetupStage) {
    this.accountSetup = {
      accountSetupCompleted,
      stage,
    };
  }
  public getCourses() {
    return this.courses;
  }
  public setCourses(courses: CourseEntity[]) {
    this.courses = courses;
  }
}
