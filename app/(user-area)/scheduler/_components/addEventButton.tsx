"use client";

// components/PrimaryButton.js
import styled from "styled-components";
import Button from "@/app/components/buttons/button";
const AddCard = styled(Button)`
  background-color: white;
  max-width: 160px !important;
  min-width: 160px !important;
  height: 48px !important;
  font-size: 16px !important;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 12px !important;
  }

  &:hover {
    background-color: #bcbcbc; /* Slight background color change on hover */
  }
`;

interface AddEventButtonProps {
  action: () => void;
}

const AddEventButtonComponent: React.FC<AddEventButtonProps> = ({ action }) => {
  return (
    <AddCard onClick={action}>
        <img src="/addEventBlack.svg"></img>
        Add Event 
    </AddCard>
  );
};

export default AddEventButtonComponent;
