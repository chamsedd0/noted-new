import styled from "styled-components";
import Button from "@/app/components/buttons/button";

const SaveTimeSlotButton = styled(Button)`
  background-color: white;
  min-width: 212px;

  &:hover {
    background-color: #bcbcbc; /* Slight background color change on hover */
  }

  @media (max-width: 1470px) {
    transform: scale(0.8);
  }
`;

const SaveTimeSlotButtonComponent = ({
  event,
  isEmpty,
}: {
  event: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isEmpty: boolean;
}) => {
  return (
    <SaveTimeSlotButton
      type="submit"
      onClick={(e) => {
        event(e);
      }}
    >
      {isEmpty ? "Back" : "Save"}
    </SaveTimeSlotButton>
  );
};

export default SaveTimeSlotButtonComponent;
