'use client'

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import SelectComponent from '../../dashboard/components/popupTimeSelect';
import InputComponent from '@/app/components/inputs/input';
import { AddCourseModalProps } from '../../dashboard/types';
import { TimeSlot } from '@/types/Time';
import { getUserCourses } from '../../dashboard/_actions/courseActions';
import { Course } from '@/types/Course';
import { BlackenScreen, ModalContainer, ModalHeader, CloseButton, InputContainer, Settings, ColorOptions, ColorCircle, WeekdayOptions, WeekdayButton, TimeSelectContainer, SaveButton } from './_styles/addCourseModal';



const AddCourseModal = ({ onClose, popupOpened, onAdd }: AddCourseModalProps) => {
  const [courseTitle, setCourseTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [activeDays, setActiveDays] = useState<string[]>([]);
  const [existingCourses, setExistingCourses] = useState<Course[]>([]);

  const colors = ['#BE0505', '#FF6B35', '#FFAB35', '#3C9437', '#4B6EE3', '#244BCB', '#9747FF', '#840000'];
  const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const handleDayClick = (day: string) => {
    setActiveDays(prev => {
      const newDays = prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day];
      if (!prev.includes(day)) {
        return newDays;
      } else {
        setTimeSlots(prev => prev.filter(slot => slot.day !== day));
      }
      return newDays;
    });
  };

  const checkConflicts = (timeSlots: TimeSlot[]) => {
    const conflicts: string[] = [];
    
    timeSlots.forEach(newSlot => {
      existingCourses.forEach(course => {
        course.timeSlots?.forEach(existingSlot => {
          if (existingSlot.day === newSlot.day && 
            ((newSlot.start >= existingSlot.start && newSlot.start < existingSlot.finish) ||
             (newSlot.finish > existingSlot.start && newSlot.finish <= existingSlot.finish) ||
             (newSlot.start <= existingSlot.start && newSlot.finish >= existingSlot.finish))) {
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
    return existingCourses.some(course => 
      course.title.toLowerCase() === title.toLowerCase()
    );
  };

  const handleSave = async () => {
    if (!user || !courseTitle || !selectedColor) {
      alert('Please fill in all required fields (title and color)');
      return;
    }

    if (isTitleTaken(courseTitle)) {
      alert('A course with this name already exists');
      return;
    }

    const conflicts = checkConflicts(timeSlots);
    if (conflicts.length > 0) {
      alert('Schedule conflicts found:\n\n' + conflicts.join('\n'));
      return;
    }

    try {
      const newCourse = {
        uid: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: courseTitle,
        color: selectedColor,
        timeSlots: timeSlots,
        lastModified: new Date().toLocaleString()
      };
      await onAdd(newCourse);
      onClose(false);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadCourses = async () => {
      if (user && popupOpened) {
        const courses = await getUserCourses(user.uid);
        setExistingCourses(courses);
      }
    };
    loadCourses();
  }, [user, popupOpened]);

  const isColorTaken = (color: string) => {
    return existingCourses.some(course => course.color === color);
  };

  useEffect(() => {
    if (!popupOpened) {
      setCourseTitle('');
      setSelectedColor('');
      setTimeSlots([]);
      setActiveDays([]);
      setExistingCourses([]);
    }
  }, [popupOpened]);

  return (
    <BlackenScreen popupOpened={popupOpened} onClick={() => onClose(false)}>
      <ModalContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <ModalHeader>
          <h2><img src='/bookmark.svg' alt="bookmark"/>Add Course</h2>
          <CloseButton onClick={() => onClose(false)}><img src='/close.svg' alt="close"/></CloseButton>
        </ModalHeader>

        <InputContainer>
          <InputComponent 
            title='Course Name'
            placeHolder='Data Structures'
            type='text'
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
                      alert('This color is already used by another course');
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