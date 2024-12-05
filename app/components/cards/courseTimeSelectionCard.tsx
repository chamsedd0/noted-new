import styled from "styled-components";
import type { TimeStamp } from "@/types/Time";

const Card = styled.div<{ completed?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #545454;
  padding: 20px;
  border-radius: 10px;
  width: 188px;
  height: 188px;
  color: white;
  text-align: left;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid ${(props) => (props.completed ? "white" : "transparent")};

  &:hover {
    background-color: #444444;
  }

  @media (max-width: 1470px) {
    transform: scale(0.85);
  }
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
  color: white;
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
}

const CourseCardComponent: React.FC<CourseCardProps> = ({
  title,
  timestamps,
  onSelect,
  completed,
}) => {
  return (
    <Card completed={completed} onClick={onSelect}>
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
  );
};

export default CourseCardComponent;
