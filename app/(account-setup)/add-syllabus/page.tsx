"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import PreLoginFooter from "@/app/components/preLoginFooter";
import NextButtonComponent from "@/app/components/buttons/nextButton";
import UploadButtonComponent from "@/app/components/buttons/uploadButton";
import { Course } from "@/types/Course";
import { getCourses } from "./_actions/getCoursesAction";
import { updateCourseSyllabus } from "./_actions/updateCourseAction";

const Box = styled.div`
  background-color: #383838;
  width: 100vw;
  height: 100vh;
  padding: 60px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  gap: 60px;

  @media (max-width: 1470px) {
    padding-bottom: 50px;
    padding-top: 50px;
    gap: 40px;
  }

  @media (max-width: 1100px) {
    gap: 0px;
  }
`;

const Form = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 50%;

  @media (max-width: 1100px) {
    margin-bottom: 15px;
    width: 60%;
  }

  @media (max-width: 800px) {
    margin-bottom: 15px;
    width: 80%;
    margin-top: 15px;
  }

  .introduction {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    h2 {
      font-size: 40px;
      font-weight: 700;

      @media (max-width: 1470px) {
        font-size: 32px;
      }

      @media (max-width: 800px) {
        font-size: 24px;
        max-width: 200px;
      }
    }
    p {
      font-size: 16px;
      font-weight: 400;
      max-width: 480px;

      @media (max-width: 1470px) {
        font-size: 14px;
      }

      @media (max-width: 800px) {
        font-size: 12px;
        max-width: 400px;
      }
    }
  }
`;

const Logo = styled.img`
  position: absolute;
  width: 165px;
  top: 40px;
  right: 30px;

  @media (max-width: 1000px) {
    width: 125px;
  }
`;

const CourseList = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 48px;
  padding: 10px;

  @media (max-width: 1470px) {
    gap: 14px;
    margin-bottom: 30px;
  }

  @media (max-width: 1100px) {
    margin-bottom: -10px;
  }

  /* when we have a lot courses we need scroll behaviour */

  h2 {
    font-size: 20px;
    font-weight: 600;
  }
`;

const CourseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  min-width: 200px;

  span {
    height: 100%;
    vertical-align: center;
    display: flex;
    align-items: center;
    justify-content: start;
    background-color: #545454;
    flex: 1;
    padding: 0px 24px;
    border-radius: 100px;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s ease;

    @media (max-width: 800px) {
      height: 100px;
      width: fit-content;
      padding: 24px;
      justify-content: center;
      text-align: center;
      min-width: 150px;
    }

    @media (max-width: 1100px) {
      font-size: 12px;
    }

    @media (max-width: 1470px) {
      height: 42px;
    }
  }
  @media (max-width: 1470px) {
    gap: 0px;
  }
`;

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 40px;
  font-weight: 700;
`;

const DUMMY_SYLLABUS = "Sample syllabus content";

export default function AddSyllabusPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { idToken } = useAuthContext();

  useEffect(() => {
    const loadCourses = async () => {
      if (!idToken) return;
      try {
        const userCourses = await getCourses(idToken);
        setCourses(userCourses);
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [idToken]);

  const handleSubmitAll = async () => {
    try {
      // Update all courses with dummy syllabus
      if (idToken) {
        for (const course of courses) {
          if (course.uid) {
            await updateCourseSyllabus(idToken, course.uid, DUMMY_SYLLABUS);
          }
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
