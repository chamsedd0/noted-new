import styled from "styled-components";
import Button from "@/app/components/buttons/button";
import appleImage from "@/public/apple.svg";
import Image from "next/image";

const AppleButton = styled(Button)`
  background-color: #000000; /* Outlook blue */
  color: white;
  display: flex; /* Flexbox to align content */
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex: 1;
  height: 60px;

  &:hover {
    background-color: black; /* Slightly darker blue on hover */
  }
`;

const AppleButtonComponent = ({ appleAuth }: { appleAuth: () => void }) => {
  return (
    <AppleButton onClick={() => appleAuth()}>
      <Image src={appleImage} alt="Apple" />
      Apple
    </AppleButton>
  );
};

export default AppleButtonComponent;
