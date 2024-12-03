import { ICourseRepository } from "../../interfaces/ICourseRepsitory";
import { CourseEntity } from "../../entities/Course";
import { CreateCourseDTO } from "../../dtos/CourseDTO";

export class CreateCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(dto: CreateCourseDTO): Promise<string> {
    const course = new CourseEntity(dto.title, dto.color);

    const courseId = await this.courseRepository.createCourse(course);
    course.setUid(courseId);

    return courseId;
  }
}
