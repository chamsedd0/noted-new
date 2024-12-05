import styled from "styled-components";

interface WeekdayCardProps {
  active: boolean;
}

// Main container for the card
const WeekdayCard = styled.div<WeekdayCardProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.active ? "#282828" : "#545454")};
  padding: 20px;
  border-radius: 16px;
  width: 100px;
  height: 100px;
  color: white;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  user-select: none;

  font-size: 20px;
  font-weight: 700;

  &:hover {
    background-color: ${(props) => (props.active ? "#303030" : "#444444")};
  }

  &:active {
    background-color: #282828;
  }
`;

interface WeekdayCardComponentProps {
  dayCode: string;
  handleFunction: (dayCode: string) => void;
  active: boolean;
}

const WeekdayCardComponent: React.FC<WeekdayCardComponentProps> = ({
  dayCode,
  handleFunction,
  active,
}) => {
  return (
    <WeekdayCard active={active} onClick={() => handleFunction(dayCode)}>
      {dayCode}
    </WeekdayCard>
  );
};

export default WeekdayCardComponent;