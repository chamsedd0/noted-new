"use client";

import styled from "styled-components";
import Button from "../buttons/button";

const ChangeButton = styled(Button)`
  background-color: white;
  max-width: 155px !important;
  min-width: 155px !important;
  height: 48px !important;
  font-size: 16px !important;

  &:hover {
    background-color: #bcbcbc; /* Slight background color change on hover */
  }

  @media (max-width: 1200px) {
    transform: scale(0.8) translateX(10%);
  }
`;

const ChangePlanButtonComponent = () => {
  return <ChangeButton>Change Plan</ChangeButton>;
};

export default ChangePlanButtonComponent;
