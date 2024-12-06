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

const BlackenScreen = styled.div<{ popupOpened: boolean }>`
    width: 100vw;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 200;
    transition: all 0.3s ease;
    opacity: ${props => (props.popupOpened ? 1 : 0)};
    pointer-events: ${props => (props.popupOpened ? 'all' : 'none')};
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #444444;
  border-radius: 10px;
  padding: 20px;
  max-width: 620px;
  min-width: 620px;
  
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  color: white;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  
  span {
    font-size: 16px;
    font-weight: 600;
  }

  h2 {
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  @media (max-width: 1470px) {
    transform: scale(0.85) translate(-55%, -55%);
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  width: 100%;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  img {
    width: 20px;
    opacity: 0.7;
    transition: all 0.3s ease;

    &:hover {
        opacity: 1;
    }
  }
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  margin-top: 16px;
  min-width: 270px;
`;

const ColorCircle = styled.div<{ color: string; selected: boolean; taken?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: ${props => props.taken ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.taken ? 0.5 : 1};
  transition: all 0.3s ease;
  border: ${props => (props.selected ? '2px solid white' : '2px solid transparent')};
`;

const WeekdayOptions = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  margin-top: 16px;
`;

const WeekdayButton = styled.button<{ active: boolean }>`
  transition: all 0.3s ease;
  background-color: ${props => (props.active ? '#282828' : '#545454')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${props => (props.active ? '#303030' : '#444444')};
  }
`;

const TimeSelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
  margin-bottom: 20px;
`;

const SaveButton = styled.button`
  width: 155px;
  padding: 12px;
  height: 48px;
  background-color: white;
  align-self: end;
  color: #383838;
  border: none;
  border-radius: 100px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #BCBCBC;
  }
`;

const Settings = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  gap: 20px;
  margin-top: 16px;
  margin-bottom: 16px;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;

  input {
    width: 100%;
  }
`;

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