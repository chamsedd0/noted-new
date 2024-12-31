"use client";

import AddCourseButtonComponent from "./_components/addCourseButton";
import CourseDashboardCardComponent from "./_components/dashboardCourseCard";
import { useState, useRef, useEffect } from "react";
import AddCourseModal from "./_components/addCourseModal";
import EditCourseModal from "./_components/editCourseModal";
import { Course } from "@/types/Course";
import { useRouter } from "next/navigation";

import { NotesGrid, NotesContainer, SlideButton } from "./notes/[uid]/styling";

import {
  ContentWrapper,
  CoursesGrid,
  CoursesLayout,
  CoursesSection,
  AddCourseCard,
  RightBoxReplacement,
  TitleWrapper,
} from "./_styles";
import DeletePopUp from "@/app/components/popups/deletePopUp";
import globalStore from "@/app/(user-area)/_store";
import NoteCard from "./notes/_components/NoteCard";

interface DashboardState {
  popupOpened: boolean;
  editPopupOpened: boolean;
  selectedCourse: string | null;
  deleteModalOpen: boolean;
  courseToDelete: string | null;
  openDropdowns: Record<string, boolean>;
}

export default function CoursesPage({}) {
  const { courses, addCourse, updateCourse, deleteCourse } = globalStore();
  const router = useRouter();
  
  const recentNotes = [
    {
      id: 3,
      title: 'Recently Viewed Note',
      description: 'Last opened',
      lastChecked: '2024-03-16',
      color: '#FB97E2'
    },
    {
      id: 4,
      title: 'Recently Viewed Note',
      description: 'Last opened',
      lastChecked: '2024-03-16',
      color: '#FB97E2'
    },
    {
      id: 5,
      title: 'Recently Viewed Note',
      description: 'Last opened',
      lastChecked: '2024-03-16',
      color: '#FB97E2'
    },
    {
      id: 3,
      title: 'Recently Viewed Note',
      description: 'Last opened',
      lastChecked: '2024-03-16',
      color: '#FB97E2'
    },
    {
      id: 4,
      title: 'Recently Viewed Note',
      description: 'Last opened',
      lastChecked: '2024-03-16',
      color: '#FB97E2'
    },
    {
      id: 4,
      title: 'Recently Viewed Note',
      description: 'Last opened',
      lastChecked: '2024-03-16',
      color: '#FB97E2'
    },
    {
      id: 5,
      title: 'Recently Viewed Note',
      description: 'Last opened',
      lastChecked: '2024-03-16',
      color: '#FB97E2'
    },
    {
      id: 3,
      title: 'Recently Viewed Note',
      description: 'Last opened',
      lastChecked: '2024-03-16',
      color: '#FB97E2'
    },
    {
      id: 4,
      title: 'Recently Viewed Note',
      description: 'Last opened',
      lastChecked: '2024-03-16',
      color: '#FB97E2'
    },
    
  ];
  const [state, setState] = useState<DashboardState>({
    popupOpened: false,
    editPopupOpened: false,
    selectedCourse: null,
    deleteModalOpen: false,
    courseToDelete: null,
    openDropdowns: {},
  });
  const [canScrollLeft, setCanScrollLeft] = useState({
    recent: false,
  });
  const [canScrollRight, setCanScrollRight] = useState({
    recent: false,
  });
  const recentNotesGridRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleCourseClick = (uid: string) => {
    router.push(`/dashboard/notes/${uid}`);
  };

  const handleAddCourse = async (newCourse: Course) => {
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

  const handleMouseDown = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
    ref.current.style.cursor = 'grabbing';
    ref.current.style.userSelect = 'none';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (recentNotesGridRef.current) {
      recentNotesGridRef.current.style.cursor = 'grab';
      recentNotesGridRef.current.style.removeProperty('user-select');
    }
  };

  const handleMouseMove = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (recentNotesGridRef.current) {
        recentNotesGridRef.current.style.cursor = 'grab';
        recentNotesGridRef.current.style.removeProperty('user-select');
      }
    }
  };

  const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    const scrollAmount = ref.current.clientWidth * 0.8;
    const newScrollLeft = direction === 'left' 
      ? ref.current.scrollLeft - scrollAmount 
      : ref.current.scrollLeft + scrollAmount;
    
    ref.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const checkScroll = () => {
      const ref = recentNotesGridRef.current;
      if (!ref) return;

      const { scrollLeft, scrollWidth, clientWidth } = ref;
      setCanScrollLeft({ recent: scrollLeft > 0 });
      setCanScrollRight({ recent: Math.ceil(scrollLeft + clientWidth) < scrollWidth });
    };

    const ref = recentNotesGridRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      checkScroll(); // Initial check
      
      // Set initial grab cursor
      ref.style.cursor = 'grab';
    }

    window.addEventListener('resize', checkScroll);

    return () => {
      if (ref) {
        ref.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleEditNote = (noteId: number) => {
    console.log('Edit note:', noteId);
  };

  return (
    <>
      ={" "}
      <CoursesLayout>
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
        <DeletePopUp
          isOpen={state.deleteModalOpen}
          onConfirm={handleDeleteCourse}
          onCancel={() => {
            setState((prev) => ({
              ...prev,
              deleteModalOpen: false,
              courseToDelete: null,
            }));
          }}
          title={`Do you really want to delete ${
            courses.find((c) => c.uid === state.courseToDelete)?.title
          } from your courses?`}
          message="The course cannot be brought back unless you add it manually after deletion."
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
                    uid={course.uid}
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
                <AddCourseCard onClick={() => setState((prev) => ({ ...prev, popupOpened: true }))}>
                  <img src="/addButtonGray.svg" alt="" />
                </AddCourseCard>
            </CoursesGrid>
            <NotesContainer>
              <h2 style={{margin: '60px 0 24px 0'}}>Recently Opened <img src="/recentlyOpened.svg" alt="menu" /></h2>
              {canScrollLeft.recent && (
                <SlideButton 
                  direction="left" 
                  onClick={() => scroll('left', recentNotesGridRef)}
                  style={{
                    position: 'absolute',
                    left: -10,
                    top: '50%',
                    transform: 'translateY(20%)'
                  }}
                >
                  <img src="/left-arrow.svg" alt="Previous" />
                </SlideButton>
              )}
              {canScrollRight.recent && (
                <SlideButton 
                  direction="right" 
                  onClick={() => scroll('right', recentNotesGridRef)}
                  style={{
                    position: 'absolute',
                    right: -10,
                    top: '50%', 
                    transform: 'translateY(20%)'
                  }}
                >
                  <img src="/right-arrow.svg" alt="Next" />
                </SlideButton>
              )}
              <NotesGrid 
                ref={recentNotesGridRef}
                $canScrollLeft={canScrollLeft.recent}
                $canScrollRight={canScrollRight.recent}
                onMouseDown={(e: React.MouseEvent) => handleMouseDown(e, recentNotesGridRef)}
                onMouseUp={handleMouseUp}
                onMouseMove={(e: React.MouseEvent) => handleMouseMove(e, recentNotesGridRef)}
                onMouseLeave={handleMouseLeave}
              >
                {recentNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    title={note.title}
                    description={note.description}
                    lastChecked={note.lastChecked}
                    color={note.color}
                    clickFunction={() => handleEditNote(note.id)}
                  />
                ))}
              </NotesGrid>
            </NotesContainer>
          </CoursesSection>

          

          <RightBoxReplacement></RightBoxReplacement>
        </ContentWrapper>
      </CoursesLayout>
    </>
  );
}
