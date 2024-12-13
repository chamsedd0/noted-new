import styled from "styled-components";
import Button from "../buttons/button";

const ChooseButton = styled(Button)`
  background-color: white;
  font-weight: 800 !important;
  font-size: 18px !important;
  margin: auto;
  height: 48px !important;

  &:hover {
    background-color: #bcbcbc;
  }
`;

interface ChooseButtonProps {
  event: (value: void) => void;
}

const ChooseButtonComponent = ({ event }: ChooseButtonProps) => {
  return <ChooseButton onClick={() => event()}>Choose</ChooseButton>;
};

export default ChooseButtonComponent;
