"use client";

import { useState, useEffect } from "react";
import SelectComponent from "./popupTimeSelect";
import InputComponent from "@/app/components/inputs/input";
import { AddCourseModalProps } from "../types";
import { TimeSlot } from "@/types/Time";
import {
  BlackenScreen,
  ModalContainer,
  ModalHeader,
  CloseButton,
  InputContainer,
  Settings,
  ColorOptions,
  ColorCircle,
  WeekdayOptions,
  WeekdayButton,
  TimeSelectContainer,
  SaveButton,
} from "./_styles/addCourseModal";
import { colors, weekdays } from "@/app/utils/constants";
import { Course } from "@/types/Course";

const AddCourseModal = ({
  onClose,
  popupOpened,
  existingCourses,
  addCourse,
}: AddCourseModalProps) => {
  const [courseTitle, setCourseTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [activeDays, setActiveDays] = useState<string[]>([]);

  const handleDayClick = (day: string) => {
    setActiveDays((prev) => {
      const newDays = prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day];
      if (!prev.includes(day)) {
        return newDays;
      } else {
        setTimeSlots((prev) => prev.filter((slot) => slot.day !== day));
      }
      return newDays;
    });
  };

  const checkConflicts = (timeSlots: TimeSlot[]) => {
    const conflicts: string[] = [];

    timeSlots.forEach((newSlot) => {
      existingCourses.forEach((course) => {
        course.timeSlots?.forEach((existingSlot) => {
          if (
            existingSlot.day === newSlot.day &&
            ((newSlot.start >= existingSlot.start &&
              newSlot.start < existingSlot.finish) ||
              (newSlot.finish > existingSlot.start &&
                newSlot.finish <= existingSlot.finish) ||
              (newSlot.start <= existingSlot.start &&
                newSlot.finish >= existingSlot.finish))
          ) {
            conflicts.push(
              `Conflict with "${course.title}" on ${existingSlot.day} ` +
                `(${existingSlot.start}:00-${existingSlot.finish}:00)`
            );
          }
        });
      });
    });

    return conflicts;
  };

  const isTitleTaken = (title: string) => {
    return existingCourses.some(
      (course) => course.title.toLowerCase() === title.toLowerCase()
    );
  };

  const handleSave = async () => {
    if (!courseTitle || !selectedColor) {
      alert("Please fill in all required fields (title and color)");
      return;
    }

    if (isTitleTaken(courseTitle)) {
      alert("A course with this name already exists");
      return;
    }

    const conflicts = checkConflicts(timeSlots);
    if (conflicts.length > 0) {
      alert("Schedule conflicts found:\n\n" + conflicts.join("\n"));
      return;
    }

    try {
      const newCourse = {
        uid: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: courseTitle,
        color: selectedColor,
        timeSlots: timeSlots,
        lastModified: new Date().toLocaleString(),
      };
      await addCourse(newCourse as Course);
      onClose(false);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const isColorTaken = (color: string) => {
    return existingCourses.some((course) => course.color === color);
  };

  useEffect(() => {
    if (!popupOpened) {
      setCourseTitle("");
      setSelectedColor("");
      setTimeSlots([]);
      setActiveDays([]);
    }
  }, [popupOpened]);

  return (
    <BlackenScreen popupOpened={popupOpened} onClick={() => onClose(false)}>
      <ModalContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <ModalHeader>
          <h2>
            <img src="/bookmark.svg" alt="bookmark" />
            Add Course
          </h2>
          <CloseButton onClick={() => onClose(false)}>
            <img src="/close.svg" alt="close" />
          </CloseButton>
        </ModalHeader>

        <InputContainer>
          <InputComponent
            title="Course Name"
            placeHolder="Data Structures"
            type="text"
            value={courseTitle}
            setVariable={setCourseTitle}
          />
        </InputContainer>

        <Settings>
          <div>
            <span>Color</span>
            <ColorOptions>
              {colors.map((color) => (
                <ColorCircle
                  key={color}
                  color={color}
                  selected={color === selectedColor}
                  taken={isColorTaken(color)}
                  onClick={() => {
                    if (!isColorTaken(color)) {
                      setSelectedColor(color);
                    } else {
                      alert("This color is already used by another course");
                    }
                  }}
                />
              ))}
            </ColorOptions>
          </div>

          <div>
            <span>Weekday</span>
            <WeekdayOptions>
              {weekdays.map((day) => (
                <WeekdayButton
                  key={day}
                  active={activeDays.includes(day)}
                  onClick={() => handleDayClick(day)}
                >
                  {day.charAt(0)}
                </WeekdayButton>
              ))}
            </WeekdayOptions>
          </div>
        </Settings>

        <TimeSelectContainer>
          {activeDays.map((activeDay, index) => (
            <SelectComponent
              key={index}
              title={activeDay}
              timeSlots={timeSlots}
              setTimeSlots={setTimeSlots}
              allCourses={existingCourses}
            />
          ))}
        </TimeSelectContainer>
        <SaveButton onClick={handleSave}>Add Course</SaveButton>
      </ModalContainer>
    </BlackenScreen>
  );
};

export default AddCourseModal;
