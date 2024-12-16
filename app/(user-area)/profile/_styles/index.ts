import styled from "styled-components";



const CoursesLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  background-color: #2D282F;

  .bigTitle {
    color: white;
    font-size: 32px;
    font-weight: 700;
    margin-top: 110px;
    padding: 0px 40px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  
  gap: 20px;
  padding: 40px;
  margin-right: 10px;
  flex: 1;



  @media (max-width: 1500px) {
    margin-right: 0px;
    flex-direction: column;

  }
`;



const PersonalInformationForm = styled.div`
  flex: 1;
  
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 20px;
  background-color: #36303A;
  border-radius: 16px;
  padding: 20px;
  
  height: 100%;

  .title {
    font-size: 16px;
    font-weight: 500;
    color: white;
    align-self: start;
    margin: 0px;
  }
  

  .bottomContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
  }
`;

const Section = styled.section`
  display: flex;
  align-items: start;
  justify-content: start;
  gap: 20px;
  width: 100%;
  height: 390px;

  @media (max-width: 700px) {
    max-width: 80%;
  }

  @media (max-width: 1700px) {
    width: 100%;
  }

  h2 {
    color: #fff;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 16px;

    @media (max-width: 700px) {
      font-size: 28px;
    }
  }

  p {
    font-size: 16px;
    color: white;
    max-width: 588px;

    @media (max-width: 700px) {
      font-size: 14px;
      max-width: 350px;
    }

    b {
      font-size: 24px;
    }
  }

  button {
    margin-top: 20px;
  }

  .outlook {
    margin-top: 10px;
    color: white;
    height: 48px;
    padding: 0rem 2rem;
    background-color: #127cd6;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    gap: 10px;
    font-size: 14px;
    font-weight: 600;

    img {
      width: 24px;
    }

    &:hover {
      background-color: #126ebc;
    }
  }
`;

const Section2 = styled.section`
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 1500px) {
    flex-direction: row;
  }

  h2 {
    color: #fff;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 16px;

    @media (max-width: 700px) {
      font-size: 28px;
    }
  }

  p {
    font-size: 16px;
    color: white;
    max-width: 588px;

    @media (max-width: 700px) {
      font-size: 14px;
      max-width: 350px;
    }

    b {
      font-size: 24px;
    }
  }

  button {
    margin-top: 20px;
  }

  .outlook {
    margin-top: 10px;
    color: white;
    height: 48px;
    padding: 0rem 2rem;
    background-color: #127cd6;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    gap: 10px;
    font-size: 14px;
    font-weight: 600;

    img {
      width: 24px;
    }

    &:hover {
      background-color: #126ebc;
    }
  }
`;

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  gap: 10px;

  background: url('/contactBg.svg');

  background-size: cover;
  background-position: center;
  min-height: 390px;
  max-width: 450px;

  border-radius: 16px;
  padding: 20px;

  .title {
    font-size: 16px;
    font-weight: 500;
    color: white;
    align-self: start;
    margin: 0px;
  }

  .subtitle {
    font-size: 34px;
    font-weight: 700;
    color: white;
    align-self: start;
    max-width: 60%;
    margin: 0px;
  }

  .message {
    font-size: 14px;
    font-weight: 400;
    color: white;
    align-self: start;
    margin: 0px;
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    width: 100%;

    span {
      margin-top: 15px;
      font-size: 20px;
      font-weight: 600;
      color: white;
    }
  }

  @media (max-width: 1500px) {
    flex: 1;
    max-width: unset;

  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
  color: #FF0000;
  margin-top: 20px;
  
  p {
    font-size: 14px;
    font-weight: 400;
  }

  max-width: 70%;
`;

const ProfilePicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background-color: #36303A;
  border-radius: 16px;
  padding: 20px;
  height: 100%;

  .title {
    font-size: 16px;
    font-weight: 500;
    color: white;
    align-self: start;
    margin-bottom: 30px;
  }

  img {
    border-radius: 100%;
    width: 180px;
    margin-bottom: 32px;

    @media (max-width: 700px) {
      width: 75px;
    }
  }

  span {
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 20px;
    color: white;
    cursor: pointer;
    margin-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;

    @media (max-width: 700px) {
      font-size: 14px;
    }

    img {
      width: 24px;
      border-radius: 0px;
      margin-bottom: 0px;
    }
  }

  .title {
    font-size: 16px;
    font-weight: 500;
    color: white;
    align-self: start;
    margin: 0px;
    margin-bottom: 30px;
  }
`;

const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  margin-top: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }

  

  @media (max-width: 700px) {
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
  }
`;

const RightBoxReplacement = styled.div`

  flex: 1;
  min-width: 300px;
  max-width: 300px;


  @media (max-width: 1700px) {
    display: none;
  }
`;

const CancelButton = styled.button`
  background: transparent;
  border: none;
  text-decoration: underline;
  color: white;
  font-size: 14px;

  cursor: pointer;
  &:hover {
    color: #FF0000;
  }
`;

const SubscriptionSection = styled.div<{plan: string | null}>`
  background: ${props => props.plan === "Basic Plan" ? "url('/basicBg.svg')" : `url('/premiumBg.svg')`};
  background-size: cover;
  background-position: center;
  min-height: 390px;
  min-width: 450px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  padding: 20px;
  align-items: start;
  justify-content: space-between;
  gap: 10px;

  .details {
    display: flex;
    align-items: start;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    font-size: 14px;
    font-weight: 400;
    width: 100%;
  }

  .title {
    font-size: 16px;
    font-weight: 500;
    color: white;
    align-self: start;
    margin: 0px;
  }

  .plan {
    font-size: 32px;
    padding-top: 60px;
    font-weight: 700;
    color: white;
    align-self: start;
    margin: 0px;
  }

  .bottomContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 80px;
    width: 100%;
  }

  @media (max-width: 1500px) {
    flex: 1;
    max-width: unset;
  }
`;

export {
    CancelButton,
    CoursesLayout,
    ContentWrapper,
    ErrorMessage,
    ContactSection,
    Section,
    Section2,
    ProfilePicture,
    PersonalInformationForm,
    InputsContainer,
    RightBoxReplacement,
    SubscriptionSection
}