"use client";

import {
  Box,
  Form,
  Logo,
  InputsContainer,
  CourseList,
  CourseItem,
  RemoveButtonComponent,
  ButtonContainer,
} from "./styles";
import { Formik } from "formik";
import NextButtonComponent from "@/app/components/buttons/nextButton";
import AddButtonComponent from "@/app/components/buttons/addButton";
import InputCourseComponent from "@/app/components/inputs/inputCourse";
import Footer from "@/app/components/preLoginFooter";
import { addCoursesSchema } from "./schema";
import { z } from "zod";
import { accountSetupStore } from "../_store";
import { useRouter } from "next/navigation";
import { AccountSetupStage } from "@/types/User";
import BackButtonComponent from "@/app/components/buttons/backButton";

interface FormValues {
  newCourseName: string;
}

export default function AddCoursePage() {
  const { user, updateUser } = accountSetupStore();
  const router = useRouter();

  const initialValues: FormValues = {
    newCourseName: "",
  };

  const handleAddCourse = (values: FormValues, setFieldValue: (field: string, value: any) => void) => {
    if (!values.newCourseName.trim()) {
      alert("Course name cannot be empty");
      return;
    }

    if (user?.courses?.some((course) => course.title === values.newCourseName.trimEnd())) {
      alert("This course has already been added");
      return;
    }

    const newCourse = {
      uid: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: values.newCourseName.trimEnd(),
      color: "gray",
      lastModified: new Date().toISOString(),
    };

    updateUser({
      courses: [...(user?.courses || []), newCourse],
    });
    setFieldValue("newCourseName", "");
  };

  return (
    <Box>
      <Logo src="/logo.svg" alt="Logo" />

      <Formik
        initialValues={initialValues}
        validate={() => {
          try {
            addCoursesSchema.parse({
              courses: [...(user?.courses || [])],
            });
            return {};
          } catch (error) {
            if (error instanceof z.ZodError) {
              return error.issues.reduce((acc, issue) => {
                if (issue.path[0] === "courses") {
                  acc.courses = issue.message;
                }
                return acc;
              }, {} as Record<string, string>);
            }
            return {};
          }
        }}
        onSubmit={() => {
          if (!user?.courses?.length) {
            alert("Please add at least one course before continuing");
            return;
          }
          updateUser({
            accountSetupStage: AccountSetupStage.ADD_SYLLABUS,
          });
          router.push("/add-syllabus");
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Form onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleAddCourse(values, setFieldValue);
            }
          }}>
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
                f={() => handleAddCourse(values, setFieldValue)}
              />
            </InputsContainer>

            <CourseList>
              {user?.courses?.map((course) => (
                <CourseItem key={course.uid}>
                  <p>{course.title}</p>
                  <RemoveButtonComponent
                    onClick={() => {
                      updateUser({
                        courses: user.courses?.filter(
                          (c) => c.uid !== course.uid
                        ),
                      });
                    }}
                  >
                    <img src="/trash2.svg" alt="Remove"></img>
                  </RemoveButtonComponent>
                </CourseItem>
              ))}
            </CourseList>

            <ButtonContainer>
              <BackButtonComponent 
                event={() => router.push("/personal-info")} 
              />
              <NextButtonComponent
                event={(e) => {
                  e.preventDefault();
                  if (!user?.courses?.length) {
                    alert("Please add at least one course before continuing");
                    return;
                  }
                  handleSubmit();
                }}
              />
            </ButtonContainer>
          </Form>
        )}
      </Formik>

      <Footer />
    </Box>
  );
}
