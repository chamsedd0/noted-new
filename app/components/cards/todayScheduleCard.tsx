import styled from "styled-components";

type ScheduleCardDivProps = {
  color: string;
  isPast: boolean;
};

const ScheduleCard = styled.div<ScheduleCardDivProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  background-color: ${({ color, isPast }) => isPast ? `${color}80` : color};  // Add transparency for past events
  padding: 16px;
  border-radius: 10px;
  min-width: 100%;
  max-height: 60px;
  color: white;
  font-weight: 600;
  font-size: 14px;
  position: relative;
  
  ${({ isPast }) => isPast && `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 10px;
    }
  `}

  .time {
    text-align: end;
  }

  .title {
    max-width: 60%;
    font-size: 12px;
  }
`;

interface ScheduleCardProps {
  color: string;
  title: string;
  timestamp: string;
  start: number;
}

const ScheduleCardComponent = ({ color, title, timestamp, start }: ScheduleCardProps) => {
  const currentHour = new Date().getHours();
  const isPast = start < currentHour;

  return (
    <ScheduleCard color={color} isPast={isPast}>
      <div className="title">{title}</div>
      <div className="time">{timestamp}</div>
    </ScheduleCard>
  );
};

export default ScheduleCardComponent;
