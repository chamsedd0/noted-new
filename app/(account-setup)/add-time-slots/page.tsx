"use client";

import {
  Box,
  Form,
  Logo,
  Grid,
  DaysWrapper,
  TimeWrapper,
  ButtonContainer,
} from "./styles";
import { useState, useCallback } from "react";
import { TimeSlot } from "@/types/Time";
import SelectComponent from "@/app/components/inputs/select";
import NextButtonComponent from "@/app/components/buttons/nextButton";
import SaveTimeSlotButtonComponent from "./saveTimeSlotButton";
import Footer from "@/app/components/preLoginFooter";
import WeekdayCardComponent from "@/app/components/cards/weekDayCard";
import CourseCardComponent from "@/app/components/cards/courseTimeSelectionCard";
import { accountSetupStore } from "../_store";
import { useRouter } from "next/navigation";
import { AccountSetupStage } from "@/types/User";
import { WEEKDAYS, type Weekday } from "@/app/utils";
import BackButtonComponent from "@/app/components/buttons/backButton";


function checkTimeConflicts(timeSlot1: TimeSlot, timeSlot2: TimeSlot): boolean {
  if (timeSlot1.day !== timeSlot2.day) return false;
  return !(timeSlot1.finish <= timeSlot2.start || timeSlot1.start >= timeSlot2.finish);
}

export default function AddTimeSlots() {
  const { user, updateUser } = accountSetupStore();
  const router = useRouter();

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [currentTimeSlots, setCurrentTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDays, setSelectedDays] = useState<Weekday[]>([]);

  const handleDayToggle = useCallback((day: Weekday) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  }, []);

  const handleSaveCourse = useCallback(() => {
    if (!selectedCourseId || !user?.courses) return;

    const updatedCourses = user.courses.map(course => {
      if (course.uid === selectedCourseId) {
        return {
          ...course,
          timeSlots: currentTimeSlots,
        };
      }
      return course;
    });

    updateUser({ courses: updatedCourses });
    setSelectedCourseId(null);
    setCurrentTimeSlots([]);
    setSelectedDays([]);
  }, [selectedCourseId, currentTimeSlots, user?.courses, updateUser]);

  const handleSubmitAll = useCallback(() => {
    if (!user?.courses) return;

    const conflicts: string[] = [];

    const coursesWithTimeSlots = user.courses.filter(c => c.timeSlots?.length);
    
    for (let i = 0; i < coursesWithTimeSlots.length; i++) {
      for (let j = i + 1; j < coursesWithTimeSlots.length; j++) {
        const course1 = coursesWithTimeSlots[i];
        const course2 = coursesWithTimeSlots[j];

        for (const slot1 of course1.timeSlots!) {
          for (const slot2 of course2.timeSlots!) {
            if (checkTimeConflicts(slot1, slot2)) {
              conflicts.push(
                `${course1.title} conflicts with ${course2.title} on ${slot1.day}`
              );
            }
          }
        }
      }
    }

    if (conflicts.length > 0) {
      alert(
        "Time Conflicts Detected:\n\n" +
        conflicts.join("\n") +
        "\n\nPlease resolve these conflicts before continuing."
      );
      return;
    }

    updateUser({
      accountSetupStage: AccountSetupStage.CHOOSE_PLAN,
    });
    router.push("/choose-plan");
  }, [user?.courses, updateUser, router]);

  const selectedCourse = user?.courses?.find(c => c.uid === selectedCourseId);

  return (
    <Box>
      <Logo src="/logo.svg" alt="Logo" />
      <Form>
        {!selectedCourseId ? (
          <>
            <div className="introduction">
              <h2>Add Time of your classes</h2>
              <p>
                Choose the course and choose the time
              </p>
            </div>
            <Grid>
              {user?.courses?.map((course) => (
                <CourseCardComponent
                  key={course.uid}
                  title={course.title}
                  timestamps={course.timeSlots ?? []}
                  onSelect={() => setSelectedCourseId(course.uid)}
                  completed={Boolean(course.timeSlots?.length)}
                />
              ))}
            </Grid>

            <ButtonContainer>
              <BackButtonComponent 
                event={() => router.push("/add-syllabus")} 
              />
              <NextButtonComponent event={handleSubmitAll} />
            </ButtonContainer>
          </>
        ) : (
          <>
            <div className="introduction">
              <h2>Choose Time</h2>
              <p>
                Select which days you take <b>{selectedCourse?.title}</b>. then
                enter the time when you have the class
              </p>
            </div>
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

            <ButtonContainer>
              <BackButtonComponent 
                event={() => setSelectedCourseId(null)} 
              />
              <SaveTimeSlotButtonComponent
                event={handleSaveCourse}
                isEmpty={currentTimeSlots.length === 0}
              />
            </ButtonContainer>
          </>
        )}
      </Form>
      <Footer />
    </Box>
  );
}
