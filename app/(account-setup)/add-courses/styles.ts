import styled from "styled-components";

const Box = styled.div`
  background-color: #383838;
  width: 100vw;
  height: 100vh;
  padding: 60px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  gap: 60px;

  @media (max-width: 1470px) {
    padding-bottom: 60px;
    padding-top: 40px;
    gap: 40px;
  }
`;

const Form = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 50%;

  .introduction {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    h2 {
      font-size: 40px;
      font-weight: 700;

      @media (max-width: 1470px) {
        font-size: 32px;
      }
    }
    p {
      font-size: 16px;
      font-weight: 400;
      max-width: 480px;

      @media (max-width: 1470px) {
        font-size: 14px;
      }
    }
  }
`;

const Logo = styled.img`
  position: absolute;
  width: 165px;
  top: 40px;
  right: 30px;

  @media (max-width: 1000px) {
    width: 125px;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 24px; /* Space between form items */

  width: 100%;
`;

const CourseList = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 48px;
  padding: 10px;

  /* there is a problem with too many courses */
`;

const CourseItem = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  vertical-align: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  transition: all 0.3s ease;
`;

const RemoveButtonComponent = styled.button`
  border: none;
  background-color: transparent;
  text-decoration: underline;
  font-size: 16px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
  margin-top: 1rem;
`;

export {
  Box,
  Form,
  Logo,
  InputsContainer,
  CourseList,
  CourseItem,
  RemoveButtonComponent,
  ButtonContainer,
};
