import styled from "styled-components";

export const BlackenScreen = styled.div<{ $popupOpened: boolean }>`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  transition: all 0.3s ease;
  opacity: ${({ $popupOpened }) => ($popupOpened ? 1 : 0)};
  pointer-events: ${({ $popupOpened }) => ($popupOpened ? "all" : "none")};
`;

export const ModalContainer = styled.div`
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
  gap: 20px;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  h2 {
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  img {
    width: 20px;
  }
`;

export const Settings = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  gap: 20px;
  width: 100%;

  > div {
    flex: 1;
  }

  span {
    font-size: 16px;
    font-weight: 600;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const TimeSelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
`;

export const SaveButton = styled.button`
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
    background-color: #bcbcbc;
  }
`;

export const WeekdayOptions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const WeekdayButton = styled.button<{ $active: boolean }>`
  width: 30px;
  height: 30px;
  background-color: ${({ $active }) => ($active ? "#282828" : "#545454")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#303030" : "#444444")};
  }
`;

export const ColorOptions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const ColorCircle = styled.div<{ $color: string; $selected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  cursor: pointer;
  transition: border-color 0.2s;
  border: 2px solid ${({ $selected }) => ($selected ? "white" : "transparent")};
`;
