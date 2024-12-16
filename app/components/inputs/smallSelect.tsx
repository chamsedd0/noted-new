"use client";

import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;

  z-index: ${(props) => (props.isOpen ? 1000 : 1)};

  h2 {
    font-size: 16px !important;
    font-weight: 600;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
  }
`;

const DropdownContainer = styled.div`
  flex: 1;
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


  span {
    font-size: 14px;
    margin-right: 20px;
  }
`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
  z-index: ${(props) => (props.isOpen ? 1000 : 1)};

  /* when the dropdown list opens it can have conflicts */

  background-color: #2D282F;
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
  justify-content: center;

  gap: 5px;
  transition: all 0.3s ease;
  padding: 10px 10px;
`;

const DropdownListItem = styled.li`
  width: 100%;
  height: 20px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #413B44;
  font-size: 12px;
  font-weight: 600;

  &:hover {
    background-color: #444;
  }
`;

const Chevron = styled.span<{ isOpen: boolean }>`
  transition: transform 0.3s;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: all 0.3s ease;
  margin-right: 0 !important;

  img {
    width: 10px;
  }
`;

interface SelectDateComponentProps {
  title: string;
  day: number | null;
  month: number | null;
  year: number | null;
  setDay: (value: number) => void;
  setMonth: (value: number) => void;
  setYear: (value: number) => void;
}

const SelectDateComponent = ({
  title,
  day,
  month,
  year,
  setDay,
  setMonth,
  setYear,
}: SelectDateComponentProps) => {
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const days = Array.from({ length: 31 - 1 + 1 }, (_, i) => 1 + i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 2024 - 1960 + 1 }, (_, i) => 1960 + i);

  const toggleDropdown = (title: string) => {
    switch (title) {
      case "day":
        setIsDayOpen(!isDayOpen);
        break;

      case "month":
        setIsMonthOpen(!isMonthOpen);
        break;

      case "year":
        setIsYearOpen(!isYearOpen);
        break;
    }
  };

  const handleTimeSelect = (title: string, choice: number) => {
    switch (title) {
      case "day":
        setDay(choice);
        setIsDayOpen(false);
        break;

      case "month":
        setMonth(choice);
        setIsMonthOpen(false);
        break;

      case "year":
        setYear(choice);
        setIsYearOpen(false);
        break;
    }
  };

  return (
    <Wrapper isOpen={isDayOpen || isMonthOpen || isYearOpen}>
      <h2>{title}</h2>
      <div className="row">
        <DropdownContainer>
          <DropdownHeader onClick={() => toggleDropdown("day")}>
            <span>{day}</span>
            <Chevron isOpen={isDayOpen}>
              <img src="/vector.svg"></img>
            </Chevron>
          </DropdownHeader>
          <DropdownList isOpen={isDayOpen}>
            {days.map((choice, index) => (
              <DropdownListItem
                key={index}
                onClick={() => handleTimeSelect("day", choice)}
              >
                {choice}
              </DropdownListItem>
            ))}
          </DropdownList>
        </DropdownContainer>

        <DropdownContainer>
          <DropdownHeader onClick={() => toggleDropdown("month")}>
            <span>{month}</span>
            <Chevron isOpen={isMonthOpen}>
              <img src="/vector.svg"></img>
            </Chevron>
          </DropdownHeader>
          <DropdownList isOpen={isMonthOpen}>
            {months.map((choice, index) => (
              <DropdownListItem
                key={index}
                onClick={() => handleTimeSelect("month", index + 1)}
              >
                {choice}
              </DropdownListItem>
            ))}
          </DropdownList>
        </DropdownContainer>

        <DropdownContainer>
          <DropdownHeader onClick={() => toggleDropdown("year")}>
            <span>{year}</span>
            <Chevron isOpen={isYearOpen}>
              <img src="/vector.svg"></img>
            </Chevron>
          </DropdownHeader>
          <DropdownList isOpen={isYearOpen}>
            {years.map((choice, index) => (
              <DropdownListItem
                key={index}
                onClick={() => handleTimeSelect("year", choice)}
              >
                {choice}
              </DropdownListItem>
            ))}
          </DropdownList>
        </DropdownContainer>
      </div>
    </Wrapper>
  );
};

export default SelectDateComponent;
