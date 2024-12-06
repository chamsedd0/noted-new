"use client";

// components/PrimaryButton.js
import styled from "styled-components";
import Button from "../buttons/button";

const SaveButton = styled(Button)`
  background-color: white;
  max-width: 155px !important;
  min-width: 155px !important;
  height: 48px !important;
  font-size: 16px !important;

  &:hover {
    background-color: #bcbcbc; /* Slight background color change on hover */
  }
`;

type SaveButtonProps = {
  event: (e: React.FormEvent) => void;
};

const SaveButtonComponent = ({ event }: SaveButtonProps) => {
  return <SaveButton onClick={(e) => event(e)}>Save</SaveButton>;
};

export default SaveButtonComponent;
