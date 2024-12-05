"use client";

import styled from "styled-components";
import { Formik } from "formik";
import { useAuthContext } from "../layout";
import { createCourses } from "./_actions/createCoursesAction";
import NextButtonComponent from "@/app/components/buttons/nextButton";
import AddButtonComponent from "@/app/components/buttons/addButton";
import InputCourseComponent from "@/app/components/inputs/inputCourse";
import Footer from "@/app/components/preLoginFooter";
import { addCoursesSchema } from "./schema";
import { z } from "zod";

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
    padding-bottom: 60px;
    padding-top: 40px;
    gap: 40px;
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
    }
    p {
      font-size: 16px;
      font-weight: 400;
      max-width: 480px;

      @media (max-width: 1470px) {
        font-size: 14px;
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

const InputsContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 24px; /* Space between form items */

  width: 100%;
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

  /* there is a problem with too many courses */
`;

const CourseItem = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  vertical-align: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  transition: all 0.3s ease;
`;

const RemoveButtonComponent = styled.button`
  border: none;
  background-color: transparent;
  text-decoration: underline;
  font-size: 16px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

interface FormValues {
  newCourseName: string;
  courseTitles: string[];
}

export default function AddCoursePage() {
  const { idToken } = useAuthContext();

  const initialValues: FormValues = {
    newCourseName: "",
    courseTitles: [],
  };

  return (
    <Box>
      <Logo src="/logo.svg" alt="Logo" />

      <Formik
        initialValues={initialValues}
        validate={(values) => {
          try {
            addCoursesSchema.parse({
              courses: values.courseTitles.map((title) => ({ title })),
            });
            return {};
          } catch (error) {
            if (error instanceof z.ZodError) {
              return error.issues.reduce((acc, issue) => {
                if (issue.path[0] === "courses") {
                  acc.courseTitles = issue.message;
                }
                return acc;
              }, {} as Record<string, string>);
            }
            return {};
          }
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (!idToken) {
              alert("You must be logged in to add courses");
              return;
            }

            if (values.courseTitles.length === 0) {
              alert("Please add at least one course before continuing");
              return;
            }

            const courses = values.courseTitles.map((title) => ({
              title,
              color: "gray",
            }));

            await createCourses(idToken, courses);
            setSubmitting(false);
          } catch (error) {
            console.error("Error submitting courses:", error);
            alert("Failed to submit courses. Please try again.");
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Form>
            <div className="introduction">
              <h2>Add your courses</h2>
              <p>
                Add the name of the courses you are taking, so we can find more
                personalized information
              </p>
            </div>

            <InputsContainer>
              <InputCourseComponent
                setVariable={(value) => setFieldValue("newCourseName", value)}
                title="Course Name"
                value={values.newCourseName}
                placeHolder="Data Structures and algorithms"
                type="text"
              />
              <AddButtonComponent
                f={() => {
                  if (!values.newCourseName.trim()) {
                    alert("Course name cannot be empty");
                    return;
                  }

                  if (
                    values.courseTitles.includes(values.newCourseName.trimEnd())
                  ) {
                    alert("This course has already been added");
                    return;
                  }

                  setFieldValue("courseTitles", [
                    ...values.courseTitles,
                    values.newCourseName.trimEnd(),
                  ]);
                  setFieldValue("newCourseName", "");
                }}
              />
            </InputsContainer>

            <CourseList>
              {values.courseTitles.map((title, index) => (
                <CourseItem key={index}>
                  <p>{title}</p>
                  <RemoveButtonComponent
                    onClick={() => {
                      setFieldValue(
                        "courseTitles",
                        values.courseTitles.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    Remove
                  </RemoveButtonComponent>
                </CourseItem>
              ))}
            </CourseList>

            <NextButtonComponent
              event={(e) => {
                e.preventDefault();
                if (values.courseTitles.length === 0) {
                  alert("Please add at least one course before continuing");
                  return;
                }
                handleSubmit();
              }}
            />
          </Form>
        )}
      </Formik>

      <Footer />
    </Box>
  );
}
