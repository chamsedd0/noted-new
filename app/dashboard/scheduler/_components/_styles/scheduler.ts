import styled from "styled-components";
const ScheduleWrapper = styled.div`
  width: 100%;

  transition: all 0.3s ease;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(17, 42.5px);

  overflow: hidden;
  scroll-behavior: unset;

  gap: 0px; /* Spacing between cells */
  user-select: none;
`;

// Styled for day labels
const DayLabel = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: white;
  text-align: center;
  vertical-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

const TimeLabel = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  vertical-align: center;
  position: relative;
  user-select: none;

  img {
    position: absolute;
    top: 0;
    left: 0;
    user-select: none;
  }
`;

// Time block
const TimeBlock = styled.div<{
  bgColor: string;
  day: number;
  timeStart: number;
  timeFinish: number;
  isChecked: boolean;
  isSelected: boolean;
}>`
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 5px;
  margin-right: 3px;
  margin-top: 4px;
  margin-bottom: 2px;
  padding: 12px;
  text-align: center;
  color: white;
  overflow: hidden;

  background-color: ${({ bgColor }) => bgColor || "#444"};
  grid-column: ${({ day }) => day + 2};
  grid-row: ${({ timeStart, timeFinish }) =>
    timeStart - 5 + "/" + (timeFinish - 5)};
  border-radius: 8px;
  border: ${({ isChecked, isSelected }) =>
    isChecked || isSelected ? "2px solid white" : "2px solid transparent"};
  transition: all 0.3s ease;
  cursor: pointer;
  z-index: 10;

  .title {
    text-align: start;
    width: 100%;
    user-select: none;
  }

  .time {
    text-align: end;
    width: 100%;
    user-select: none;
  }

  @media (max-width: 1200px) {
    padding: 6px;
  }
`;

export { ScheduleWrapper, Grid, DayLabel, TimeLabel, TimeBlock };
