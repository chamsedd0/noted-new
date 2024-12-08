"use client";

import { useState } from "react";
import styled from "styled-components";

const NotifyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h2 {
    font-size: 16px;
    font-weight: 600;
  }

  .box {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const NotifyLabel = styled.span`
  font-size: 14px;
  font-weight: 400;
`;

const SwitchContainer = styled.div<{ $isOn: boolean }>`
  width: 44px;
  height: 24px;
  background-color: ${({ $isOn }) => ($isOn ? "#3C9437" : "#545454")};
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const SwitchCircle = styled.div<{ $isOn: boolean }>`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${({ $isOn }) => ($isOn ? "22px" : "2px")};
  transition: left 0.3s ease;
`;

interface PopUpCheckBoxProps {
  title: string;
  message: string;
  onChange?: (checked: boolean) => void;
}

export function PopUpCheckBox({ title, message, onChange }: PopUpCheckBoxProps) {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onChange?.(newValue);
  };

  return (
    <NotifyWrapper>
      <h2>{title}</h2>
      <div className="box">
        <SwitchContainer $isOn={isOn} onClick={toggleSwitch}>
          <SwitchCircle $isOn={isOn} />
        </SwitchContainer>
        <NotifyLabel>{message}</NotifyLabel>
      </div>
    </NotifyWrapper>
  );
}
