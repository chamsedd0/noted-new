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
`;

const ChangePlanButtonComponent = () => {
  return <ChangeButton>Change Plan</ChangeButton>;
};

export default ChangePlanButtonComponent;
