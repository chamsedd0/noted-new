"use client";

import { useState } from "react";
import { Event } from "@/types/Event";
import {
  Wrapper,
  DropdownContainer,
  DropdownHeader,
  DropdownList,
  DropdownListItem,
  Chevron,
  ResetButton,
} from "./_styles/popUpTimeSelect";

interface TimeSlot {
  day: string;
  start: number;
  finish: number;
}

interface PopUpTimeSelectProps {
  title: string;
  timeSlots: TimeSlot[];
  setTimeSlots: (slots: TimeSlot[]) => void;
  existingEvents: Event[];
}

const generateTimeSlots = () => {
  const times: string[] = [];
  for (let hour = 7; hour <= 22; hour++) {
    times.push(`${String(hour).padStart(2, "0")}:00`);
  }
  return times;
};

export default function PopUpTimeSelect({
  title,
  timeSlots,
  setTimeSlots,
  existingEvents
}: PopUpTimeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState<string>("Start Time");
  const [selectedFinishTime, setSelectedFinishTime] = useState<string>("Finish Time");

  const timeOptions = generateTimeSlots();

  const checkTimeConflict = (start: number, finish: number) => {
    const conflictingEvent = existingEvents.find(event => 
      event.day === title && 
      ((start >= event.start && start < event.finish) ||
       (finish > event.start && finish <= event.finish) ||
       (start <= event.start && finish >= event.finish))
    );

    if (conflictingEvent) {
      alert(`Time conflict with event "${conflictingEvent.title}" (${conflictingEvent.start}:00-${conflictingEvent.finish}:00)`);
      return true;
    }
    return false;
  };

  const handleTimeSelect = (time: string) => {
    const hour = parseInt(time.split(":")[0]);
    
    if (selectedStartTime === "Start Time" || hour < parseInt(selectedStartTime)) {
      setSelectedStartTime(time);
    } else {
      if (checkTimeConflict(parseInt(selectedStartTime), hour)) {
        return;
      }
      setSelectedFinishTime(time);
      setTimeSlots([...timeSlots, {
        day: title,
        start: parseInt(selectedStartTime),
        finish: hour
      }]);
      setIsOpen(false);
    }
  };

  const resetSelection = () => {
    setSelectedStartTime("Start Time");
    setSelectedFinishTime("Finish Time");
  };

  return (
    <Wrapper>
      <h2>{title}</h2>
      <DropdownContainer>
        <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
          <span>
            {selectedStartTime} - {selectedFinishTime}
          </span>
          <Chevron>
            <img src="/vector.svg" alt="toggle" />
          </Chevron>
        </DropdownHeader>
        <DropdownList $isOpen={isOpen}>
          <ResetButton onClick={resetSelection}>
            <img src="/reset.svg" alt="reset" />
          </ResetButton>
          {timeOptions.map((time, index) => (
            <DropdownListItem
              key={index}
              onClick={() => handleTimeSelect(time)}
            >
              {time}
            </DropdownListItem>
          ))}
        </DropdownList>
      </DropdownContainer>
    </Wrapper>
  );
}
