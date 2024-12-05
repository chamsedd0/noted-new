import styled from "styled-components";
import Button from "./button";

const NextButton = styled(Button)`
  background-color: white;
  min-width: 212px;

  &:hover {
    background-color: #bcbcbc; /* Slight background color change on hover */
  }

  @media (max-width: 1470px) {
    transform: scale(0.8);
  }
`;

const NextButtonComponent = ({
  event,
}: {
  event: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {

  return (
    <NextButton
      type='submit'
      onClick={(e) => {
        event(e);
      }}
    >
      Next
    </NextButton>
  );
};

export default NextButtonComponent;
