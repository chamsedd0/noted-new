import styled from "styled-components";
import Button from "../buttons/button";

const ChooseButton = styled(Button)`
  background-color: white;
  min-width: 100%;
  font-weight: 600;
  font-size: 16px;
  margin: auto;

  &:hover {
    background-color: #bcbcbc;
  }
`;

interface ChooseButtonProps {
  plan: string;
  event: (plan: string) => void;
}

const ChooseButtonComponent = ({ plan, event }: ChooseButtonProps) => {
  return <ChooseButton onClick={() => event(plan)}>Choose</ChooseButton>;
};

export default ChooseButtonComponent;
