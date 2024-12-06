"use client"

import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Course } from '@/types/Course';


// Fade-in animation for select components
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;



const Wrapper = styled.div<{ isOpen: boolean }>`

  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  gap: 18px;


  animation: ${fadeIn} 0.6s ease-out forwards;
  z-index: ${(props) => (props.isOpen ? 1000 : 1)};
  


  h2 {
    font-size: 16px;
    font-weight: 600;
  }
`

const DropdownContainer = styled.div`
  max-width: 270px;
  min-width: 270px;
  position: relative;
  
`;

const DropdownHeader = styled.div`
  background-color: #545454;
  color: #fff;
  padding: 20px;
  height: 48px;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
    font-size: 16px;
    font-weight: 600;
  &:hover {
    background-color: #444;
  }

  span {
    font-size: 15px;
    margin-right: 20px;
  }
`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
  
  z-index: ${(props) => (props.isOpen ? 1000 : 1)};

  /* when the dropdown list opens it can have conflicts */
  
  background-color: #333;
  color: #fff;
  list-style: none;
  padding: 5px;
  margin: 0;
  border-radius: 10px;
  max-height: ${(props) => (props.isOpen ? '200px' : '0px')};
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  pointer-events: ${(props) => (props.isOpen ? 'all' : 'none')};
  overflow-y: auto;
  position: absolute;
  top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  
  gap: 5px;
  transition: all 0.3s ease;
  padding-bottom: 45px;

  
`;

const DropdownListItem = styled.li`
    width: 64px;
    height: 48px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #545454;
    font-size: 16px;
    font-weight: 600;


    &:hover {
        background-color: #444;
    }
`;

const Chevron = styled.span<{ isOpen: boolean }>`
  transition: transform 0.3s;
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: all 0.3s ease;
  margin-right: 0 !important;

`;

const ResetButton = styled.li`
  width: 64px;
  height: 48px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #545454;
  font-size: 16px;
  font-weight: 600;


  &:hover {
      background-color: #444;
  }

  img {
    width: 24px;
    opacity: 0.8;
  }
`;

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

const SelectComponent = ({ 
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

export default SelectComponent;