
export interface CourseDTO {
  uid: string;
  title: string;
//   instructor: string;
  color: string;
  createdAt: Date;
}

export interface CreateCourseDTO {
  title: string;
  color: string;
}
