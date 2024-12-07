"use client";

import AddCourseButtonComponent from "./components/addCourseButton";
import CourseDashboardCardComponent from "./components/dashboardCourseCard";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
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

import {
  getUserCourses,
  addNewCourse,
  updateCourse,
  deleteCourse,
} from "./_actions/courseActions";

export default function CoursesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [popupOpened, setPopupOpened] = useState(false);
  const [editPopupOpened, setEditPopupOpened] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userCourses = await getUserCourses(user.uid);
          setCourses(userCourses);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    fetchUserData();

    return () => unsubscribe();
  }, [auth, user, selectedCourse]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleCourseClick = (title: string) => {
    console.log(title);
  };

  const handleAddCourse = async (newCourse: Course) => {
    if (!user) return;
    try {
      await addNewCourse(user.uid, newCourse);
      const updatedCourses = await getUserCourses(user.uid);
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleUpdateCourse = async (
    oldTitle: string,
    updatedCourse: Course
  ) => {
    if (!user) return;
    try {
      await updateCourse(user.uid, oldTitle, updatedCourse);
      const updatedCourses = await getUserCourses(user.uid);
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDeleteCourse = async () => {
    if (!user || !courseToDelete) return;

    try {
      await deleteCourse(user.uid, courseToDelete);
      const updatedCourses = await getUserCourses(user.uid);
      setCourses(updatedCourses);
      setDeleteModalOpen(false);
      setCourseToDelete(null);
      setOpenDropdowns({});
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <CoursesLayout isLoading={isLoading}>
        <AddCourseModal
          onClose={setPopupOpened}
          popupOpened={popupOpened}
          onAdd={handleAddCourse}
        />
        <EditCourseModal
          setSelected={setSelectedCourse}
          courseTitle={selectedCourse}
          onClose={setEditPopupOpened}
          popupOpened={editPopupOpened}
          onUpdate={handleUpdateCourse}
          courses={courses}
        />
        <CourseDeleteModal
          isOpen={deleteModalOpen}
          onConfirm={handleDeleteCourse}
          onCancel={() => {
            setDeleteModalOpen(false);
            setCourseToDelete(null);
          }}
          courseTitle={courseToDelete || ""}
        />
        <ContentWrapper>
          <CoursesSection>
            <TitleWrapper>
              <h1>Courses</h1>
              <AddCourseButtonComponent
                action={setPopupOpened}
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
                    setEdit={setEditPopupOpened}
                    setSelectedCourse={setSelectedCourse}
                    onDelete={() => {
                      setCourseToDelete(course.title);
                      setDeleteModalOpen(true);
                    }}
                    isDropdownOpen={openDropdowns[course.title] || false}
                    setDropdownOpen={(isOpen) => {
                      setOpenDropdowns((prev) => ({
                        ...prev,
                        [course.title]: isOpen,
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
