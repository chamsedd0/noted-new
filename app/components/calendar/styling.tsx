import styled from 'styled-components';


const CalendarWrapper = styled.div`
  width: 300px;
  border-radius: 16px;
  background-color: #36303A;
  padding: 20px;
  color: white;
  transition: all 0.2s ease-in-out;
  @media (max-width: 1200px) {
    transform: scale(0.8) translateX(-10%) translateY(-10%);
  }
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

const EventTooltip = styled.div`
  position: absolute;
  top: -45px;
  left: 50%;
  transform: translateX(-50%);
  background: #413B44;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  color: white;
  white-space: nowrap;
  pointer-events: none;
  z-index: 100;
  opacity: 0;
  transition: opacity 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: #413B44;
  }
`;

export const DateCell = styled.div<{ 
  isToday: boolean;
  isEvent: boolean;
  isDisabled: boolean;
}>`
  position: relative;
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
  border-radius: 50%;
  font-size: 12px;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  ${({ isToday }) => isToday && `
    background-color: white; 
    color: #2f2b3b; 
    font-weight: bold;
  `}

  &:hover {
    background-color: ${props => props.isToday ? 'white' : '#413B44'};
    color: ${props => props.isToday ? '#2f2b3b' : 'white'};
  }

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

  ${({ isDisabled }) => isDisabled && 'color: transparent; pointer-events: none; background-color: #2D282F;'}

  &:hover ${EventTooltip} {
    opacity: 1;
  }
`;

export { CalendarWrapper, Header, MonthYear, Button, DaysWrapper, DayLabel, DateGrid, EventTooltip };