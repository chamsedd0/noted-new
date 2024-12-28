import styled from 'styled-components';


const CalendarWrapper = styled.div`
  width: 300px;
  border-radius: 16px;
  background-color: #36303A;
  padding: 20px;
  color: white;
  transition: all 0.2s ease-in-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin-bottom: 16px;
`;

const MonthYear = styled.span`
  font-size: 14px !important;
  font-weight: 600;
  text-align: center;
  margin: 0;
  flex: 1;
  margin-bottom: 8px;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
`;

const DaysWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
`;

const DayLabel = styled.div`
  text-align: center;
  font-size: 10px;
  font-weight: 500;
  opacity: 0.6;
`;

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const DateCell = styled.div<{ 
  isToday: boolean;
  isSelected: boolean;
  isEvent: boolean;
  isDisabled: boolean;
}>`
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease-in-out;

  ${({ isToday }) => isToday && 'font-weight: 800;'}
  ${({ isSelected }) =>
    isSelected && 'background-color: white; color: #2f2b3b; font-weight: bold;'}

  ${({ isEvent }) => isEvent && 'position: relative;'}

  ${({ isEvent }) =>
    isEvent &&
    `&::after {
      content: '\u2022';
      color: #9b5de5;
      font-size: 24px;
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
    }`}

  ${({ isDisabled }) => isDisabled && 'opacity: 0.5; pointer-events: none;'}
`;

export { CalendarWrapper, Header, MonthYear, Button, DaysWrapper, DayLabel, DateGrid };