import styled from "styled-components";
import Button from "@/app/components/button/button";
import googleImage from "@/public/google.svg";
import Image from "next/image";

const GoogleButton = styled(Button)`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex: 1;
  height: 60px;

  &:hover {
    background-color: #bcbcbc;
  }
`;

const GoogleButtonComponent = ({ googleAuth }: { googleAuth: () => void }) => {
  return (
    <GoogleButton onClick={() => googleAuth()}>
      <Image src={googleImage} alt="google" />
      Google
    </GoogleButton>
  );
};

export default GoogleButtonComponent;
