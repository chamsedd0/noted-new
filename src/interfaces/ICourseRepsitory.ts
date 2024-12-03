import { CourseEntity } from "../entities/Course";

export interface ICourseRepository {
  createCourse(course: CourseEntity): Promise<string>;
  getCourse(uid: string): Promise<CourseEntity | null>;
  updateCourse(uid: string, course: CourseEntity): Promise<void>;
  deleteCourse(uid: string): Promise<void>;
}
