"use client";

import { Box, Form, Logo, CourseList, CourseItem, ButtonContainer } from "./styles";
import PreLoginFooter from "@/app/components/preLoginFooter";
import NextButtonComponent from "@/app/components/buttons/nextButton";
import UploadButtonComponent from "@/app/components/buttons/uploadButton";
import { accountSetupStore } from "../_store";
import { useRouter } from "next/navigation";
import { AccountSetupStage } from "@/types/User";
import BackButtonComponent from "@/app/components/buttons/backButton";

const DUMMY_SYLLABUS = "Sample syllabus content";

export default function AddSyllabusPage() {
  const { user, updateUser } = accountSetupStore();
  const router = useRouter();

  const handleUploadSyllabus = (courseId: string) => {
    updateUser({
      courses: user?.courses?.map((course) =>
        course.uid === courseId
          ? { ...course, syllabus: DUMMY_SYLLABUS }
          : course
      ),
    });
  };

  const handleSubmitAll = () => {
    const allHaveSyllabus = user?.courses?.every((course) => course.syllabus);

    if (!allHaveSyllabus) {
      alert("Please upload syllabus for all courses before continuing");
      return;
    }

    updateUser({
      accountSetupStage: AccountSetupStage.ADD_TIME_SLOTS,
    });
    router.push("/add-time-slots");
  };

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
          {user?.courses?.map((course) => (
            <CourseItem key={course.uid}>
              <span>{course.title}</span>
              <UploadButtonComponent
                onUpload={() => handleUploadSyllabus(course.uid)}
              />
            </CourseItem>
          ))}
        </CourseList>

        <ButtonContainer>
          <BackButtonComponent 
            event={() => router.push("/add-courses")} 
          />
          <NextButtonComponent event={handleSubmitAll} />
        </ButtonContainer>
      </Form>
      <PreLoginFooter />
    </Box>
  );
}
