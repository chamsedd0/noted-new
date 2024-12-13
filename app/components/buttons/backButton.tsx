import styled from "styled-components";
import Button from "./button";

const BackButton = styled(Button)`
  background-color: transparent !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: white !important;
  font-weight: 500 !important;
  font-size: 18px !important;

  position: absolute !important;
  top: 37.5px !important;
  left: 0 !important;
  transform: translateX(-50px) !important;

  img {
    width: 28px !important;
    height: 28px !important;

    transform: translateX(5px) !important;
  }
  

  @media (max-width: 1470px) {
    transform: scale(0.8) !important;
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
      <img src="/left-arrow.svg"></img>
      Back
    </BackButton>
  );
};

export default BackButtonComponent;
