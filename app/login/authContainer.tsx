import styled from "styled-components";
import AppleButtonComponent from "./appleButton";
import GoogleButtonComponent from "./googleButton";

const AuthContainer = styled.div`
  padding: 32px;
  background: #2D282F;
  border-radius: 16px;
  max-width: 600px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  span {
    font-size: 16px;
    font-weight: 500;
    max-width: 400px;
  }

  h2 {
    font-size: 32px;
    font-weight: 700;
  }

  a {
    text-decoration: underline;
  }

  @media (max-width: 1470px) {
    transform: scale(0.8);
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`;

const AuthComponent = ({
  googleAuth,
  appleAuth,
}: {
  googleAuth: () => void;
  appleAuth: () => void;
}) => {
  return (
    <AuthContainer>
      <h2>Login</h2>
      <span>
      Please choose the platform on which you have your email. It can be both university or personal account
      </span>

      <ButtonContainer>
        <GoogleButtonComponent googleAuth={googleAuth} />
        <AppleButtonComponent appleAuth={appleAuth} />
      </ButtonContainer>

      <span>Using unversity account?</span>
    </AuthContainer>
  );
};

export default AuthComponent;
