import { ICourseRepository } from "../interfaces/ICourseRepsitory";
import { CourseEntity } from "../entities/Course";
import { db } from "../../lib/firebase-admin";

export class FirebaseCourseRepository implements ICourseRepository {
  async createCourse(course: CourseEntity): Promise<string> {
    const createdCourse = await db.collection("courses").add({
      title: course.getTitle(),
      color: course.getColor(),
      createdAt: course.getCreatedAt(),
    });
    return createdCourse.id;
  }

  async getCourse(uid: string): Promise<CourseEntity | null> {
    const courseDoc = await db.collection("courses").doc(uid).get();

    if (!courseDoc.exists) {
      return null;
    }

    const courseData = courseDoc.data();
    if (!courseData) return null;

    return new CourseEntity(
      courseData.title,
      courseData.color,
      courseData.createdAt.toDate(),
      uid
    );
  }

  async updateCourse(uid: string, course: CourseEntity): Promise<void> {
    const courseRef = db.collection("Courses").doc(uid);
    await courseRef.update({
      title: course.getTitle(),
      color: course.getColor(),
    });
  }

  async deleteCourse(uid: string): Promise<void> {
    await db.collection("courses").doc(uid).delete();
  }
}
