import styled from "styled-components";

// Main container for the card

type ScheduleCardDivProps = {
  color: string;
  title: string;
  timestamp: string;
};

const ScheduleCard = styled.div<ScheduleCardDivProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  background-color: ${({ color }) => color || "#545454"};
  padding: 16px;
  border-radius: 10px;
  min-width: 100%;
  max-height: 60px;
  color: white;
  font-weight: 600;
  font-size: 14px;

  .time {
    text-align: end;
  }

  .title {
    max-width: 60%;
    font-size: 12px;
  }
`;

type ScheduleCardProps = {
  color: string;
  title: string;
  timestamp: string;
};

const ScheduleCardComponent = ({
  color,
  title,
  timestamp,
}: ScheduleCardProps) => {
  return (
    <ScheduleCard color={color}>
      <div className="title">{title}</div>
      <div className="time">{timestamp}</div>
    </ScheduleCard>
  );
};

export default ScheduleCardComponent;
