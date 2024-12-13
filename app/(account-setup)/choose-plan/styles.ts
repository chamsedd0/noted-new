import styled from "styled-components";

const Box = styled.div`
  background-color: #2D282F;
  min-width: 100vw;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 50px;
  gap: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const ChoosePlanContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
  margin-top: 10px;

  h2 {
    font-size: 48px;
    font-weight: 700;

    @media (max-width: 1000px) {
      font-size: 36px;
    }
  }

  span {
    font-size: 16px;
    font-weight: 400;
  }

  @media (max-width: 1000px) {
    margin-top: 25px;
  }

  @media (min-width: 1470px) {
    margin-top: 100px;
  }
`;

const PlanCards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 1200px) {
    flex-direction: column;
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem;
  width: 100%;
`;

export { Box, ChoosePlanContainer, PlanCards, Logo, ButtonContainer };
