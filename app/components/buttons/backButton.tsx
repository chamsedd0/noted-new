import styled from "styled-components";
import Button from "./button";

const BackButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
  min-width: 212px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 1470px) {
    transform: scale(0.8);
  }
`;

const BackButtonComponent = ({
  event,
}: {
  event: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <BackButton
      type="button"
      onClick={(e) => {
        event(e);
      }}
    >
      Back
    </BackButton>
  );
};

export default BackButtonComponent;
