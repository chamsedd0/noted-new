"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  gap: 18px;
  animation: ${fadeIn} 0.6s ease-out forwards;
  z-index: ${(props) => (props.isOpen ? 1000 : 1)};

  h2 {
    font-size: 20px;
    font-weight: 600;
  }
`;

const DropdownContainer = styled.div`
  min-width: 300px;
  position: relative;
`;

const DropdownHeader = styled.div`
  background-color: #413B44;
  color: #fff;
  padding: 20px;
  height: 48px;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  font-size: 16px;
  font-weight: 600;


`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
  z-index: ${(props) => (props.isOpen ? 1000 : 1)};
  background-color: #36303A;
  color: #fff;
  list-style: none;
  padding: 5px;
  margin: 0;
  border-radius: 10px;
  max-height: ${(props) => (props.isOpen ? "200px" : "0px")};
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  pointer-events: ${(props) => (props.isOpen ? "all" : "none")};
  overflow-y: auto;
  position: absolute;
  top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
  gap: 5px;
  transition: all 0.3s ease;
  padding-bottom: 45px;
`;

const DropdownListItem = styled.li`
  width: 64px;
  height: 48px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #4e4752;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    background-color: #453f49;
  }
`;

const Chevron = styled.span<{ isOpen: boolean }>`
  transition: transform 0.3s;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: all 0.3s ease;

  img {
    width: 12px;
    height: 12px;
  }
`;

const ResetButton = styled.li`
  width: 64px;
  height: 48px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #4e4752;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    background-color: #453f49;
  }

  img {
    width: 24px;
    opacity: 0.8;
  }
`;

const generateTimeSlots = () => {
  const times = [];
  for (let hour = 7; hour <= 22; hour++) {
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    times.push({
      display: `${displayHour}${ampm}`,
      value: hour,
    });
  }
  return times;
};

interface TimeSlot {
  day: string;
  start: number;
  finish: number;
}

interface SelectComponentProps {
  title: string;
  timeStamps: TimeSlot[];
  setTimeStamps: (timeStamps: TimeSlot[]) => void;
}

const SelectComponent = ({
  title,
  timeStamps,
  setTimeStamps,
}: SelectComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState<{
    display: string;
    value: number;
  } | null>(null);
  const [selectedFinishTime, setSelectedFinishTime] = useState<{
    display: string;
    value: number;
  } | null>(null);

  const timeSlots = generateTimeSlots();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleTimeSelect = (
    e: React.MouseEvent<HTMLLIElement>,
    time: { display: string; value: number }
  ) => {
    if (!selectedStartTime || time.value < selectedStartTime.value) {
      setSelectedStartTime(time);
    } else {
      setSelectedFinishTime(time);
      setIsOpen(false);
    }

    if (selectedStartTime && time.value === selectedStartTime.value) {
      setSelectedStartTime(null);
      setSelectedFinishTime(null);
      (e.currentTarget as HTMLLIElement).style.backgroundColor = "#545454";
    }
  };

  const handleReset = () => {
    setSelectedStartTime(null);
    setSelectedFinishTime(null);
  };

  useEffect(() => {
    if (selectedStartTime && selectedFinishTime) {
      const filteredTimeSlots = timeStamps.filter((slot) => slot.day !== title);

      setTimeStamps([
        ...filteredTimeSlots,
        {
          day: title,
          start: selectedStartTime.value,
          finish: selectedFinishTime.value,
        },
      ]);
    }
  }, [selectedFinishTime]);

  return (
    <Wrapper isOpen={isOpen}>
      <h2>{title}</h2>
      <DropdownContainer>
        <DropdownHeader onClick={toggleDropdown}>
          <span>
            {selectedStartTime?.display || "Start Time"} -{" "}
            {selectedFinishTime?.display || "Finish Time"}
          </span>
          <Chevron isOpen={isOpen}>
            <img src="/vector.svg" alt="chevron" />
          </Chevron>
        </DropdownHeader>
        <DropdownList isOpen={isOpen}>
          <ResetButton onClick={handleReset}>
            <img src="/reset.svg" alt="reset" />
          </ResetButton>
          {timeSlots.map((time, index) => (
            <DropdownListItem
              key={index}
              onClick={(e) => handleTimeSelect(e, time)}
            >
              {time.display}
            </DropdownListItem>
          ))}
        </DropdownList>
      </DropdownContainer>
    </Wrapper>
  );
};

export default SelectComponent;
