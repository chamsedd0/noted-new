"use client";

import { Box, Form, Logo, CourseList, CourseItem, Loading } from "./styles";
import { useEffect, useState } from "react";
import PreLoginFooter from "@/app/components/preLoginFooter";
import NextButtonComponent from "@/app/components/buttons/nextButton";
import UploadButtonComponent from "@/app/components/buttons/uploadButton";
import { Course } from "@/types/Course";
import { getCourses } from "./_actions/getCoursesAction";
import { updateCourseSyllabus } from "./_actions/updateCourseAction";


const DUMMY_SYLLABUS = "Sample syllabus content";

export default function AddSyllabusPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const userCourses = await getCourses();
        setCourses(userCourses);
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleSubmitAll = async () => {
    try {
      // Update all courses with dummy syllabus
      for (const course of courses) {
        if (course.uid) {
          await updateCourseSyllabus(course.uid, DUMMY_SYLLABUS);
        }
      }
    } catch (error) {
      console.error("Error updating syllabi:", error);
      alert("Failed to update syllabi. Please try again.");
    }
  };

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Box>
      <Logo src="/logo.svg" alt="Logo" />
      <Form>
        <div className="introduction">
          <h2>Add Syllabus of your courses</h2>
          <p>
            Please upload the syllabus of the courses you take, so we can
            arrange the information for your notes and your schedule
          </p>
        </div>

        <CourseList>
          <h2>Add Syllabus</h2>
          {courses.map((course) => (
            <CourseItem key={course.uid}>
              <span>{course.title}</span>
              <UploadButtonComponent onUpload={() => {}} />
            </CourseItem>
          ))}
        </CourseList>

        <NextButtonComponent event={handleSubmitAll} />
      </Form>
      <PreLoginFooter />
    </Box>
  );
}
