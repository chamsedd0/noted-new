"use client"

import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Course } from '@/types/Course';
import { DropdownContainer, DropdownHeader, DropdownList, DropdownListItem, Wrapper, Chevron, ResetButton } from './_styles/timeSelectPopUp';



const generateTimeSlots = () => {
  const times = [];
  for (let hour = 7; hour <= 22; hour++) {
    times.push(`${String(hour).padStart(2, '0')}:00`);
    
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

export const checkTimeConflict = (
  newStart: number,
  newFinish: number,
  day: string,
  existingTimeSlots: TimeSlot[],
  currentDay?: string
) => {
  return existingTimeSlots.some(slot => {
    if (slot.day !== day || (currentDay && slot.day === currentDay)) return false;
    return (
      (newStart >= slot.start && newStart < slot.finish) ||
      (newFinish > slot.start && newFinish <= slot.finish) ||
      (newStart <= slot.start && newFinish >= slot.finish)
    );
  });
};

const TimeSelectPopUp = ({ 
  title, 
  timeSlots, 
  setTimeSlots, 
  currentCourseTitle,
  allCourses = []
}: SelectComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState('Start Time');
  const [selectedFinishTime, setSelectedFinishTime] = useState('Finish Time');

  // Load existing time slot for this day
  useEffect(() => {
    const existingSlot = timeSlots.find(slot => slot.day === title);
    if (existingSlot) {
      setSelectedStartTime(`${existingSlot.start}:00`);
      setSelectedFinishTime(`${existingSlot.finish}:00`);
    }
  }, [title, timeSlots]);

  const handleTimeSelect = (e: React.MouseEvent, time: string) => {
    if (selectedStartTime === 'Start Time' || time < selectedStartTime) {
      setSelectedStartTime(time);
    } else {
      const start = parseInt(selectedStartTime.split(':')[0]);
      const finish = parseInt(time.split(':')[0]);

      // Check conflicts with other courses only
      const hasConflict = allCourses
        .filter(course => course.title !== currentCourseTitle)
        .some(course => 
          course.timeSlots?.some((slot: TimeSlot) => 
            slot.day === title && 
            ((start >= slot.start && start < slot.finish) ||
             (finish > slot.start && finish <= slot.finish) ||
             (start <= slot.start && finish >= slot.finish))
          )
        );

      if (hasConflict) {
        alert('Time slot conflicts with another course!');
        return;
      }

      setSelectedFinishTime(time);
      setIsOpen(false);

      const updatedTimeSlots = timeSlots.filter(slot => slot.day !== title);
      updatedTimeSlots.push({
        day: title,
        start,
        finish
      });

      setTimeSlots(updatedTimeSlots);
    }
  };

  return (
    <Wrapper isOpen={isOpen}>
      <h2>{title}</h2>
      <DropdownContainer>
        <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
          <span>{selectedStartTime.toString() + ' - ' + selectedFinishTime.toString()} </span>
          <Chevron isOpen={isOpen}><img src='/vector.svg'></img></Chevron>
        </DropdownHeader>
        <DropdownList isOpen={isOpen}>
          <ResetButton onClick={() => {
            setSelectedStartTime('Start Time');
            setSelectedFinishTime('Finish Time');
          }}><img src='/reset.svg'></img></ResetButton>
          {generateTimeSlots().map((time, index) => (
            <DropdownListItem key={index} onClick={(e) => handleTimeSelect(e, time)}>
              {time}
            </DropdownListItem>
          ))}
        </DropdownList>
      </DropdownContainer>
    </Wrapper>
  );
};

export default TimeSelectPopUp;