import styled from "styled-components";
import Button from "./button";

const AddButton = styled(Button)`
  background-color: white;
  max-width: unset !important;
  min-width: unset !important;

  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #bcbcbc; /* Slight background color change on hover */
  }

  img {
    width: 18px;
    height: 18px;
    margin: auto;
  }
`;

interface ButtonComponentProps {
  f: (value: void) => void;
}

const AddButtonComponent = ({ f }: ButtonComponentProps) => {
  return (
    <AddButton
      onClick={() => {
        f();
      }}
    >
      <img src="/addEventBlack.svg" alt="Add"></img>
    </AddButton>
  );
};

export default AddButtonComponent;
