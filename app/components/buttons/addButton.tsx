import styled from "styled-components";
import Button from "./button";

const AddButton = styled(Button)`
  background-color: white;
  max-width: 90px !important;
  min-width: 90px !important;

  &:hover {
    background-color: #bcbcbc; /* Slight background color change on hover */
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
      Add
    </AddButton>
  );
};

export default AddButtonComponent;
