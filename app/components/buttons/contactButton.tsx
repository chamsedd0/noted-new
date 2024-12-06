"use client";

import styled from "styled-components";
import Button from "./button";

const ContactButton = styled(Button)`
  background-color: white;
  max-width: 170px !important;
  min-width: 170px !important;
  font-size: 15px !important;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #bcbcbc;
  }

  @media (max-width: 1200px) {
    transform: scale(0.8) translateX(10%);
  }
`;

const ContactButtonComponent = () => {
  const handleContact = () => {
    window.location.href = "mailto:support@noted.ai";
  };

  return (
    <ContactButton onClick={handleContact}>
      Contact Support
    </ContactButton>
  );
};

export default ContactButtonComponent;
