import styled from 'styled-components';

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

const ColorCircle = styled.div<{ color: string; selected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: pointer;
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
  flex-direction: column;
  width: 100%;
  gap: 16px;
  margin-bottom: 20px;

  select {
    padding: 8px;
    border-radius: 4px;
    border: none;
    background: white;
    color: #444444;
    width: 120px;
  }
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

const TimeWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 16px;
`;

const TimeSelect = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: none;
  background: white;
  color: #444444;
  width: 120px;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin-top: 10px;
  text-align: center;
`;

export {
    BlackenScreen,
    ModalContainer,
    ModalHeader,
    CloseButton,
    ColorOptions,
    ColorCircle,
    WeekdayOptions,
    WeekdayButton,
    TimeSelectContainer,
    SaveButton,
    Settings,
    InputContainer,
    TimeWrapper,
    TimeSelect,
    ErrorMessage
} 