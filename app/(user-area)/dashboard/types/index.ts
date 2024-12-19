import { Course } from "@/types/Course";

export interface TimeStamp {
  day: string;
  time: string;
}

export interface CourseCardProps {
  title: string;
  regularNotes: number;
  smartNotes: number;
  color: string;
  lastModified: string;
  clickFunction: (title: string) => void;
  setEdit: (value: boolean) => void;
  setSelectedCourse: (value: string | null) => void;
  onDelete: () => void;
  uid: string;
  isDropdownOpen: boolean;
  setDropdownOpen: (isOpen: boolean) => void;
}

export interface AddCourseModalProps {
  onClose: (value: boolean) => void;
  popupOpened: boolean;
  existingCourses: Course[];
  addCourse: (course: Course) => Promise<void>;
}

export interface EditCourseModalProps {
  onClose: (value: boolean) => void;
  popupOpened: boolean;
  courseTitle: string | null;
  setSelected: (value: string | null) => void;
  onUpdate: (course: Course) => Promise<void>;
  courses: Course[];
}
