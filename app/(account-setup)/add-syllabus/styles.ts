import styled from "styled-components";

const Box = styled.div`
  background-color: #2D282F;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  padding: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  gap: 50px;

  @media (max-width: 1470px) {
    padding-bottom: 50px;
    padding-top: 50px;
    gap: 40px;
  }

  @media (max-width: 1100px) {
    padding-top: 100px;
  }
`;

const Form = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 70%;

  @media (max-width: 1100px) {
    margin-bottom: 15px;
    width: 80%;
  }

  @media (max-width: 800px) {
    margin-bottom: 15px;
    width: 100%;
    margin-top: 15px;
  }

  .introduction {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 14px;

    h2 {
      font-size: 40px;
      font-weight: 700;

      @media (max-width: 1470px) {
        font-size: 32px;
      }

      @media (max-width: 800px) {
        font-size: 24px;
        max-width: 200px;
      }
    }
    p {
      font-size: 16px;
      font-weight: 400;
      max-width: 480px;

      @media (max-width: 1470px) {
        font-size: 14px;
      }

      @media (max-width: 800px) {
        font-size: 12px;
        max-width: 400px;
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

const CourseList = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  padding: 10px;
`;

const CourseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 16px;
  width: 188px;
  height: 188px;
  gap: 20px;
  min-width: 200px;
  background-color: #413B44;
  border-radius: 16px;

  span {
    font-size: 18px;
    font-weight: 700;
    text-align: start;
    align-self: start;
  }

  .upload {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    b {
      font-weight: 400;
      font-size: 14px;
      max-width: 50%;
      color: #A3A3A3;
    }
  }

`;

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 40px;
  font-weight: 700;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
  margin-top: 1rem;
`;

export { Box, Form, Logo, CourseList, CourseItem, Loading, ButtonContainer };
