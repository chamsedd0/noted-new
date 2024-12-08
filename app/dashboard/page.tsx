"use client";

import AddCourseButtonComponent from "./components/addCourseButton";
import CourseDashboardCardComponent from "./components/dashboardCourseCard";
import { useEffect, useState, useRef } from "react";
import AddCourseModal from "./components/addCourseModal";
import EditCourseModal from "./components/editCourseModal";
import { Course } from "@/types/Course";
import CourseDeleteModal from "./components/deleteCourseModal";
import Loading from "@/app/components/loading";
import {
  ContentWrapper,
  CoursesGrid,
  CoursesLayout,
  CoursesSection,
  RightBoxReplacement,
  TitleWrapper,
} from "./_styles";
import globalStore from "./_store";
import { useAuth } from "@/app/hooks/useAuth";

interface DashboardState {
  popupOpened: boolean;
  editPopupOpened: boolean;
  selectedCourse: string | null;
  deleteModalOpen: boolean;
  courseToDelete: string | null;
  openDropdowns: Record<string, boolean>;
  isLoading: boolean;
}

export default function CoursesPage() {
  const { userId } = useAuth();
  const { courses } = globalStore.getState();
  const { getUserData, addCourse, updateCourse, deleteCourse } =
    globalStore.getState();
  const [state, setState] = useState<DashboardState>({
    popupOpened: false,
    editPopupOpened: false,
    selectedCourse: null,
    deleteModalOpen: false,
    courseToDelete: null,
    openDropdowns: {},
    isLoading: true,
  });

  // Add this to track initial load
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (userId && isInitialMount.current) {
      getUserData(userId);
      const timer = setTimeout(() => {
        setState((prev) => ({ ...prev, isLoading: false }));
      }, 500);

      isInitialMount.current = false;
      return () => clearTimeout(timer);
    }
  }); // Remove getUserData from dependencies

  const handleCourseClick = (title: string) => {
    console.log(title);
  };

  const handleAddCourse = async (newCourse: Course) => {
    if (!userId) return;
    try {
      await addCourse(newCourse);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleUpdateCourse = async (updatedCourse: Course) => {
    try {
      await updateCourse(updatedCourse);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const handleDeleteCourse = async () => {
    try {
      // Find the course to get its title for display
      const courseToDelete = courses.find(
        (c) => c.uid === state.courseToDelete
      );
      if (!courseToDelete) return;

      await deleteCourse(state.courseToDelete || "");
      setState((prev) => ({
        ...prev,
        deleteModalOpen: false,
        courseToDelete: null,
      }));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return (
    <>
      <Loading isLoading={state.isLoading} />
      <CoursesLayout isLoading={state.isLoading}>
        <AddCourseModal
          onClose={() => setState((prev) => ({ ...prev, popupOpened: false }))}
          popupOpened={state.popupOpened}
          addCourse={handleAddCourse}
          existingCourses={courses}
        />
        <EditCourseModal
          setSelected={(value) =>
            setState((prev) => ({ ...prev, selectedCourse: value }))
          }
          courseTitle={state.selectedCourse}
          onClose={() =>
            setState((prev) => ({ ...prev, editPopupOpened: false }))
          }
          popupOpened={state.editPopupOpened}
          onUpdate={handleUpdateCourse}
          courses={courses}
        />
        <CourseDeleteModal
          isOpen={state.deleteModalOpen}
          onConfirm={handleDeleteCourse}
          onCancel={() => {
            setState((prev) => ({
              ...prev,
              deleteModalOpen: false,
              courseToDelete: null,
            }));
          }}
          courseTitle={
            courses.find((c) => c.uid === state.courseToDelete)?.title || ""
          }
        />
        <ContentWrapper>
          <CoursesSection>
            <TitleWrapper>
              <h1>Courses</h1>
              <AddCourseButtonComponent
                action={() =>
                  setState((prev) => ({ ...prev, popupOpened: true }))
                }
              ></AddCourseButtonComponent>
            </TitleWrapper>

            <CoursesGrid>
              {courses
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((course) => (
                  <CourseDashboardCardComponent
                    key={course.uid}
                    clickFunction={handleCourseClick}
                    title={course.title}
                    regularNotes={3}
                    smartNotes={4}
                    color={course.color || "#BE0505"}
                    lastModified={course.lastModified}
                    setEdit={() =>
                      setState((prev) => ({
                        ...prev,
                        editPopupOpened: true,
                        selectedCourse: course.title,
                      }))
                    }
                    setSelectedCourse={(value) =>
                      setState((prev) => ({ ...prev, selectedCourse: value }))
                    }
                    onDelete={() => {
                      setState((prev) => ({
                        ...prev,
                        deleteModalOpen: true,
                        courseToDelete: course.uid,
                      }));
                    }}
                    isDropdownOpen={state.openDropdowns[course.title] || false}
                    setDropdownOpen={(isOpen) => {
                      setState((prev) => ({
                        ...prev,
                        openDropdowns: {
                          ...prev.openDropdowns,
                          [course.title]: isOpen,
                        },
                      }));
                    }}
                  />
                ))}
            </CoursesGrid>
          </CoursesSection>

          <RightBoxReplacement></RightBoxReplacement>
        </ContentWrapper>
      </CoursesLayout>
    </>
  );
}
