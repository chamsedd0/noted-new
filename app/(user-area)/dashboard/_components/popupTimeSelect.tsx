"use client";

import { useEffect, useState } from "react";
import { Course } from "@/types/Course";
import {
  DropdownContainer,
  DropdownHeader,
  DropdownList,
  DropdownListItem,
  Wrapper,
  Chevron,
  ResetButton,
} from "./_styles/timeSelectPopUp";

const generateTimeSlots = () => {
  const times = [];
  for (let hour = 7; hour <= 22; hour++) {
    times.push(`${String(hour).padStart(2, "0")}:00`);
  }
  return times;
};

interface TimeSlot {
  day: string;
  start: number;
  finish: number;
}

export interface SelectComponentProps {
  title: string;
  timeSlots: TimeSlot[];
  setTimeSlots: (slots: TimeSlot[]) => void;
  currentCourseTitle?: string;
  allCourses?: Course[];
}

const TimeSelectPopUp = ({
  title,
  timeSlots,
  setTimeSlots,
  currentCourseTitle,
  allCourses = [],
}: SelectComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState("Start Time");
  const [selectedFinishTime, setSelectedFinishTime] = useState("Finish Time");

  useEffect(() => {
    const existingSlot = timeSlots.find((slot) => slot.day === title);
    if (existingSlot) {
      setSelectedStartTime(`${existingSlot.start}:00`);
      setSelectedFinishTime(`${existingSlot.finish}:00`);
    }
  }, [title, timeSlots]);

  const handleTimeSelect = (time: string) => {
    const hour = parseInt(time.split(":")[0]);
    
    if (selectedStartTime === "Start Time" || hour < parseInt(selectedStartTime)) {
      setSelectedStartTime(time);
    } else {
      const start = parseInt(selectedStartTime.split(":")[0]);
      const finish = hour;

      const hasConflict = allCourses
        .filter((course) => course.title !== currentCourseTitle)
        .some((course) =>
          course.timeSlots?.some(
            (slot: TimeSlot) =>
              slot.day === title &&
              ((start >= slot.start && start < slot.finish) ||
                (finish > slot.start && finish <= slot.finish) ||
                (start <= slot.start && finish >= slot.finish))
          )
        );

      if (hasConflict) {
        alert("Time slot conflicts with another course!");
        return;
      }

      setSelectedFinishTime(time);
      setIsOpen(false);

      const updatedTimeSlots = timeSlots.filter((slot) => slot.day !== title);
      updatedTimeSlots.push({
        day: title,
        start,
        finish,
      });

      setTimeSlots(updatedTimeSlots);
    }
  };

  return (
    <Wrapper isOpen={isOpen}>
      <h2>{title}</h2>
      <DropdownContainer>
        <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
          <span>
            {selectedStartTime} - {selectedFinishTime}
          </span>
          <Chevron isOpen={isOpen}>
            <img src="/vector.svg" alt="toggle" />
          </Chevron>
        </DropdownHeader>
        <DropdownList isOpen={isOpen}>
          <ResetButton
            onClick={() => {
              setSelectedStartTime("Start Time");
              setSelectedFinishTime("Finish Time");
            }}
          >
            <img src="/reset.svg" alt="reset" />
          </ResetButton>
          {generateTimeSlots().map((time, index) => {
            const timeHour = parseInt(time.split(":")[0]);
            const startHour = selectedStartTime !== "Start Time" ? parseInt(selectedStartTime.split(":")[0]) : null;
            const finishHour = selectedFinishTime !== "Finish Time" ? parseInt(selectedFinishTime.split(":")[0]) : null;
            
            const isSelected = time === selectedStartTime || time === selectedFinishTime;
            const isInRange = startHour !== null && finishHour !== null && 
              timeHour >= startHour && timeHour <= finishHour;

            return (
              <DropdownListItem
                key={index}
                isSelected={isSelected}
                isInRange={isInRange}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </DropdownListItem>
            );
          })}
        </DropdownList>
      </DropdownContainer>
    </Wrapper>
  );
};

export default TimeSelectPopUp;
