import styled from "styled-components";
import type { TimeStamp } from "@/types/Time";
import { useState, useEffect, useRef } from "react";

const Card = styled.div<{ completed?: boolean; hasConflict?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #413B44;
  padding: 16px;
  border-radius: 16px;
  width: 188px;
  height: 188px;
  color: white;
  text-align: left;
  transition: all 0.3s ease;
  cursor: pointer;
  border: ${props => props.hasConflict ? '1.5px solid #D88716' : 'none'};

  &:hover {
    background-color: #36303A;
    
    ${props => props.hasConflict && `
      & + .tooltip {
        opacity: 1;
        visibility: visible;
      }
    `}
  }


`;

const Tooltip = styled.div<{ position?: 'right' | 'left' | 'top' | 'bottom' }>`
  position: absolute;
  ${props => {
    switch (props.position) {
      case 'left':
        return `
          right: calc(100% + 10px);
          top: 50%;
          transform: translateY(-50%);
          &:before {
            left: auto;
            right: -6px;
            border-right: none;
            border-left: 6px solid #D88716;
          }
        `;
      case 'top':
        return `
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          &:before {
            left: 50%;
            top: auto;
            bottom: -6px;
            transform: translateX(-50%);
            border-right: 6px solid transparent;
            border-left: 6px solid transparent;
            border-top: 6px solid #D88716;
            border-bottom: none;
          }
        `;
      case 'bottom':
        return `
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          &:before {
            left: 50%;
            top: -6px;
            transform: translateX(-50%);
            border-right: 6px solid transparent;
            border-left: 6px solid transparent;
            border-bottom: 6px solid #D88716;
            border-top: none;
          }
        `;
      default: // right
        return `
          left: calc(100% + 10px);
          top: 50%;
          transform: translateY(-50%);
          &:before {
            left: -6px;
            border-right: 6px solid #D88716;
          }
        `;
    }
  }}
  background-color: #2D282F;
  padding: 12px 16px;
  border-radius: 8px;
  width: 300px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  border: 1px solid #D88716;
  z-index: 100;

  .conflict {
    display: flex;
    align-items: start;
    gap: 10px;
    padding: 5px 0;
    font-weight: 600;
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }
`;

const ConflictWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

// Title section of the card
const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  line-height: 1.4;
`;

// Timestamp section for displaying times
const TimeDisplay = styled.p`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: #A3A3A3;
  
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
`;

interface CourseCardProps {
  title: string;
  timestamps: TimeStamp[];
  onSelect: () => void;
  completed?: boolean;
  allCourses?: { title: string; timeSlots?: TimeStamp[] }[];
}

const CourseCardComponent: React.FC<CourseCardProps> = ({
  title,
  timestamps,
  onSelect,
  completed,
  allCourses = []
}) => {
  const [tooltipPosition, setTooltipPosition] = useState<'right' | 'left' | 'top' | 'bottom'>('right');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const spaceRight = window.innerWidth - rect.right;
      const spaceLeft = rect.left;
      const spaceTop = rect.top;
      const spaceBottom = window.innerHeight - rect.bottom;

      // Add 310px for tooltip width + margin
      if (spaceRight >= 310) {
        setTooltipPosition('right');
      } else if (spaceLeft >= 310) {
        setTooltipPosition('left');
      } else if (spaceTop >= 200) { // Assuming tooltip height ~150px
        setTooltipPosition('top');
      } else {
        setTooltipPosition('bottom');
      }
    };

    window.addEventListener('resize', updatePosition);
    updatePosition();

    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const conflicts = timestamps.reduce((acc: string[], timeSlot1) => {
    allCourses.forEach(course => {
      if (course.title !== title) {
        course.timeSlots?.forEach(timeSlot2 => {
          if (
            timeSlot1.day === timeSlot2.day && 
            !(timeSlot1.finish <= timeSlot2.start || timeSlot1.start >= timeSlot2.finish)
          ) {
            acc.push(`Conflicts with '${course.title}' on ${timeSlot1.day} at ${timeSlot1.start}:00-${timeSlot1.finish}:00`);
          }
        });
      }
    });
    return acc;
  }, []);

  const hasConflict = conflicts.length > 0;

  return (
    <ConflictWrapper ref={cardRef}>
      <Card completed={completed} hasConflict={hasConflict} onClick={onSelect}>
        <Title>{title}</Title>
        {timestamps.length > 0 && (
          <TimeDisplay>
            {timestamps.map((time, index) => (
              <span key={index}>
                {time.day +
                  " " +
                  time.start +
                  (time.start < 12 ? "AM" : "PM") +
                  " - " +
                  time.finish +
                  (time.finish < 12 ? "AM" : "PM")}
                {index !== timestamps.length - 1 && ", "}
              </span>
            ))}
          </TimeDisplay>
        )}
      </Card>
      {hasConflict && (
        <Tooltip className="tooltip" position={tooltipPosition}>
          {conflicts.map((conflict, index) => (
            <div className="conflict" key={index}>
              <img src="/warning.svg" alt="Warning"></img>
              {conflict}
            </div>
          ))}
        </Tooltip>
      )}
    </ConflictWrapper>
  );
};

export default CourseCardComponent;
