import styled from "styled-components";

const Box = styled.div`
  background-color: #2D282F;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  padding: 60px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  gap: 80px;

  @media (max-width: 1470px) {
    padding-bottom: 50px;
    padding-top: 50px;
    gap: 20px;
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
  gap: 24px;
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

    @media (max-width: 1470px) {
      margin-bottom: 0px;
    }

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

const Grid = styled.div`
 max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  padding: 10px;
`;

const DaysWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const TimeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 80%;
  min-height: 100px;
  gap: 10px 30px;
  margin-bottom: 20px;
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

export { Box, Form, Logo, Grid, DaysWrapper, TimeWrapper, Loading, ButtonContainer };
