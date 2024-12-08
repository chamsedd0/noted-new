"use client";

import { useState } from "react";
import {
  Wrapper,
  DropdownContainer,
  DropdownHeader,
  DropdownList,
  DropdownListItem,
  Chevron,
} from "./_styles/popUpTextSelect";

interface PopUpTextSelectProps {
  title: string;
  onSelect: (value: string) => void;
}

export default function PopUpTextSelect({
  title,
  onSelect,
}: PopUpTextSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("Choose Frequency");

  const choices = ["Daily", "Weekly", "Custom"];

  const handleSelect = (choice: string) => {
    setSelectedChoice(choice);
    onSelect(choice);
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <h2>{title}</h2>
      <DropdownContainer>
        <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
          <span>{selectedChoice}</span>
          <Chevron>
            <img src="/vector.svg" alt="toggle" />
          </Chevron>
        </DropdownHeader>
        <DropdownList $isOpen={isOpen}>
          {choices.map((choice, index) => (
            <DropdownListItem
              key={index}
              onClick={() => handleSelect(choice)}
            >
              {choice}
            </DropdownListItem>
          ))}
        </DropdownList>
      </DropdownContainer>
    </Wrapper>
  );
}
