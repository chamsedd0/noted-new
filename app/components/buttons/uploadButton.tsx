"use client";

import styled from "styled-components";
import Button from "../buttons/button";

interface UploadButtonProps {
  bgColor?: string;
  bgHovered?: string;
  fontColor?: string;
}

const UploadButton = styled(Button)<UploadButtonProps>`
  background-color: ${({ bgColor }) => bgColor || "#fffff"};
  min-width: 155px;
  color: ${({ fontColor }) => fontColor || "white"} !important;

  &:hover {
    background-color: ${({ bgHovered }) => bgHovered || "#BCBCBC"};
  }

  @media (max-width: 1470px) {
    transform: scale(0.8);
  }
`;

export interface UploadButtonComponentProps {
  onUpload: () => void;
}

const UploadButtonComponent: React.FC<UploadButtonComponentProps> = ({
  onUpload,
}) => {
  return (
    <UploadButton
      bgColor="#fffff"
      bgHovered="#BCBCBC"
      fontColor="#383838"
      onClick={onUpload}
    >
      Upload
    </UploadButton>
  );
};

export default UploadButtonComponent;
