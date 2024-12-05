"use client";

import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "../layout";
import { Course } from "@/types/Course";
import { TimeSlot } from "@/types/Time";
import { updateCourseTimes } from "./_actions/updateCourseTimesAction";
import { getCourses } from "../add-syllabus/_actions/getCoursesAction";
import SelectComponent from "@/app/components/inputs/select";
import NextButtonComponent from "@/app/components/buttons/nextButton";
import Footer from "@/app/components/preLoginFooter";
import WeekdayCardComponent from "@/app/components/cards/weekDayCard";
import CourseCardComponent from "@/app/components/cards/courseTimeSelectionCard";

const Box = styled.div`
  background-color: #383838;
  width: 100vw;
  min-height: 100vh;
  padding: 60px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  gap: 80px;

  @media (max-width: 1470px) {
    padding-bottom: 50px;
    padding-top: 50px;
    gap: 20px;
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
    margin-bottom: 24px;

    @media (max-width: 1470px) {
      margin-bottom: 0px;
    }

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 20px;
  max-width: 800px;
  margin-bottom: 50px;

  @media (max-width: 1470px) {
    margin-bottom: 0px;
    gap: 0;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, auto);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, auto);
  }
`;

const DaysWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const TimeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 100%;
  gap: 10px 30px;
  margin-bottom: 20px;
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

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;
type Weekday = (typeof WEEKDAYS)[number];

interface CourseTime {
  courseId: string;
  timeSlots: TimeSlot[];
}

export default function AddTimeSlots() {
  const { idToken } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseTimes, setCourseTimes] = useState<CourseTime[]>([]);
  const [currentTimeSlots, setCurrentTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDays, setSelectedDays] = useState<Weekday[]>([]);

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

  const handleDayToggle = useCallback((day: Weekday) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }, []);

  const handleSaveCourse = useCallback(() => {
    if (!selectedCourse?.uid) return;

    setCourseTimes((prev) => {
      const newTimes = [...prev];
      const existingIndex = newTimes.findIndex(
        (ct) => ct.courseId === selectedCourse.uid!
      );

      if (existingIndex >= 0) {
        newTimes[existingIndex].timeSlots = currentTimeSlots;
      } else {
        newTimes.push({
          courseId: selectedCourse.uid!,
          timeSlots: currentTimeSlots,
        });
      }

      return newTimes;
    });

    setSelectedCourse(null);
    setCurrentTimeSlots([]);
    setSelectedDays([]);
  }, [selectedCourse, currentTimeSlots]);

  const handleSubmitAll = useCallback(async () => {
    if (!idToken) return;

    try {
      for (const courseTime of courseTimes) {
        await updateCourseTimes(
          idToken,
          courseTime.courseId,
          courseTime.timeSlots
        );
      }
    } catch (error) {
      console.error("Error updating times:", error);
      alert("Failed to update course times. Please try again.");
    }
  }, [idToken, courseTimes]);

  if (loading) return <Loading>Loading...</Loading>;

  return (
    <Box>
      <Logo src="/logo.svg" alt="Logo" />
      <Form>
        <div className="introduction">
          <h2>Add Time of your classes</h2>
          <p>Choose times for all your courses</p>
        </div>

        {!selectedCourse ? (
          <>
            <Grid>
              {courses.map((course) => {
                const courseTime = courseTimes.find(
                  (ct) => ct.courseId === course.uid
                );
                return (
                  <CourseCardComponent
                    key={course.uid}
                    title={course.title}
                    timestamps={courseTime?.timeSlots || []}
                    onSelect={() => setSelectedCourse(course)}
                    completed={!!courseTime}
                  />
                );
              })}
            </Grid>
            {courseTimes.length > 0 && (
              <NextButtonComponent event={handleSubmitAll} />
            )}
          </>
        ) : (
          <>
            <DaysWrapper>
              {WEEKDAYS.map((day) => (
                <WeekdayCardComponent
                  key={day}
                  dayCode={day}
                  active={selectedDays.includes(day)}
                  handleFunction={() => handleDayToggle(day)}
                />
              ))}
            </DaysWrapper>

            <TimeWrapper>
              {selectedDays.map((day) => (
                <SelectComponent
                  key={day}
                  title={day}
                  timeStamps={currentTimeSlots}
                  setTimeStamps={setCurrentTimeSlots}
                />
              ))}
            </TimeWrapper>

            <NextButtonComponent event={handleSaveCourse} />
          </>
        )}
      </Form>
      <Footer />
    </Box>
  );
}
