"use client";

import styled from "styled-components";
import Button from "../buttons/button";

interface AddNoteButtonProps {
  bgColor?: string;
  bgHovered?: string;
  fontColor?: string;
}

const AddNoteButton = styled(Button)<AddNoteButtonProps>`
  background-color: white;
  max-width: 155px !important;
  min-width: 155px !important;
  height: 48px !important;
  font-size: 16px !important;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: #bcbcbc; /* Slight background color change on hover */
  }

  img {
    width: 18px !important;
    height: 18px !important;
    margin: auto !important;
  }

  @media (max-width: 1200px) {
    transform: scale(0.8) translateX(10%);
  }
`;

export interface AddNoteButtonComponentProps {
  onUpload: () => void;
}

const AddNoteButtonComponent: React.FC<AddNoteButtonComponentProps> = ({
  onUpload,
}) => {
  return (
    <AddNoteButton
      bgColor="#fffff"
      bgHovered="#BCBCBC"
      fontColor="#383838"
      onClick={onUpload}
    >
      <img src="/addEventBlack.svg"></img>
      Add Note
    </AddNoteButton>
  );
};

export default AddNoteButtonComponent;
