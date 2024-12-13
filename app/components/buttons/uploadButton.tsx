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

  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;

  max-width: 48px !important;
  min-width: 48px !important;
  width: 48px !important;

  max-height: 48px !important;
  min-height: 48px !important;
  height: 48px !important;
  
  img {
    width: 24px !important;
    height: 24px !important;
    margin: auto !important;
  }


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
      <img src="/upload.svg"></img>
    </UploadButton>
  );
};

export default UploadButtonComponent;
