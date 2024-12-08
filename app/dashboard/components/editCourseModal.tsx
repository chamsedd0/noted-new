'use client'

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import InputComponent from '@/app/components/inputs/input';
import { EditCourseModalProps } from '../../dashboard/types';
import { TimeSlot } from '@/types/Time';
import SelectComponent from '../../dashboard/components/popupTimeSelect';
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
  SaveButton
} from "./_styles/editCourseModal";


const EditCourseModal = ({ onClose, popupOpened, courseTitle, setSelected, onUpdate, courses }: EditCourseModalProps) => {
  const [activeDays, setActiveDays] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState('#BE0505');
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  const colors = ['#BE0505', '#FF6B35', '#FFAB35', '#3C9437', '#4B6EE3', '#244BCB', '#9747FF', '#840000'];
  const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const handleDayClick = (day: string) => {
    setActiveDays(prev => {
      const newDays = prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day];
      
      if (!prev.includes(day)) {
        // Don't add any default time slots
        return newDays;
      } else {
        // Remove time slots for removed day
        setTimeSlots(prev => prev.filter(slot => slot.day !== day));
      }
      
      return newDays;
    });
  };

  const checkConflicts = (newTimeSlots: TimeSlot[]) => {
    const conflicts: string[] = [];
    
    // Get all time slots from other courses
    const otherCourses = courses.filter(course => course.title !== courseTitle);
    
    newTimeSlots.forEach(newSlot => {
      otherCourses.forEach(course => {
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
    return courses.some(course => 
      course.title.toLowerCase() === title.toLowerCase() && 
      course.title !== courseTitle  // Exclude current course
    );
  };

  const handleSave = async () => {
    if (!user || !courseTitle || !selectedColor) {
      alert('Please fill in all required fields (title and color)');
      return;
    }

    if (newCourseTitle && isTitleTaken(newCourseTitle)) {
      alert('A course with this name already exists');
      return;
    }

    const conflicts = checkConflicts(timeSlots);
    if (conflicts.length > 0) {
      alert('Schedule conflicts found:\n\n' + conflicts.join('\n'));
      return;
    }

    try {
      const course = courses.find(c => c.title === courseTitle);
      const updatedCourse = {
        uid: course?.uid || `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: newCourseTitle || courseTitle,
        color: selectedColor,
        timeSlots,
        lastModified: new Date().toLocaleString()
      };
      await onUpdate(courseTitle, updatedCourse);
      setSelected(null);
      onClose(false);
    } catch (error) {
      console.error("Error updating course:", error);
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
    if (courseTitle && user && popupOpened) {
      const course = courses.find(c => c.title === courseTitle);
      if (course) {
        setNewCourseTitle(course.title || '');
        setSelectedColor(course.color || '');
        const slots = course.timeSlots || [];
        setTimeSlots(slots);
        const days = slots.map(slot => slot.day);
        setActiveDays([...new Set(days)]);
      }
    }
  }, [courseTitle, user, courses, popupOpened]);

  const isColorTaken = (color: string) => {
    return courses.some(course => 
      course.color === color && course.title !== courseTitle
    );
  };

  return (
    <BlackenScreen popupOpened={popupOpened} onClick={() => onClose(false)}>
      <ModalContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <ModalHeader>
          <h2><img src='/bookmark.svg' alt="bookmark"/>Edit Course</h2>
          <CloseButton onClick={() => onClose(false)}><img src='/close.svg' alt="close"/></CloseButton>
        </ModalHeader>

        <InputContainer>
          <InputComponent 
            title='Course Name'
            placeHolder='Data Structures'
            type='text'
            value={newCourseTitle || courseTitle || ''}
            setVariable={setNewCourseTitle}
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
              currentCourseTitle={courseTitle || undefined}
              allCourses={courses}
            />
          ))}
        </TimeSelectContainer>

        <SaveButton onClick={handleSave}>Save Changes</SaveButton>
      </ModalContainer>
    </BlackenScreen>
  );
};

export default EditCourseModal;