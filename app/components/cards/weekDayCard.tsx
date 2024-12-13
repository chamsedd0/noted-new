import styled from "styled-components";

interface WeekdayCardProps {
  active: boolean;
}

// Main container for the card
const WeekdayCard = styled.div<WeekdayCardProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.active ? "white" : "#413B44")};
  padding: 20px;
  border-radius: 16px;
  width: 100px;
  height: 100px;
  color: ${(props) => (props.active ? "#413B44" : "white")};
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  user-select: none;
  transform: ${(props) => (props.active ? "scale(1.04)" : "scale(1)")};

  font-size: 20px;
  font-weight: 700;

  &:hover {
    background-color: ${(props) => (props.active ? "#eeeeee" : "#36303A")};
  }

  &:active {
    background-color: #28232b;
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