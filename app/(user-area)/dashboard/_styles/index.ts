import styled from "styled-components";

const CoursesLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #2D282F;
  transition: opacity 0.3s ease;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  flex: 1;
  margin-top: 70px;
  gap: 40px;
  overflow: hidden;
`;

const CoursesSection = styled.div`
  flex: 3;
  max-width: 85%;
  color: #fff;
  h1 {
    font-size: 32px;

    @media (max-width: 1200px) {
      font-size: 24px;
    }
  }
  padding: 20px;

  @media (max-width: 1200px) {
    max-width: 100%;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const AddCourseCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #36303A;
  padding: 24px;

  border-radius: 15px;
  
  color: white;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;

  img {
    width: 64px;
    height: 64px;

    -webkit-user-drag: none; /* For WebKit browsers */
    user-select: none; /* Prevent selection */

  }

  

  &:active {
    background-color: #241E27;
  }

  width: 100%;
  min-height: 215px;
  max-height: 250px;

  /* Default for larger screens - fill available space */
  min-width: 300px;
  max-width: calc(33.33% - 20px); /* Account for grid gap */

  @media (max-width: 1470px) {
    min-width: 48%;
    max-width: 48%;
  }

  @media (max-width: 1200px) {
    min-width: 48%;
    max-width: 48%;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    min-width: 280px;
  }

  
  
  

`

const CoursesGrid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: start;
  justify-content: start;
  @media (min-width: 2000px) {
    justify-content: start;
    gap: 30px;
  }

  @media (max-width: 1800px) {
    gap: 25px;
  }

  @media (max-width: 1470px) {
    gap: 20px;
  }

  @media (max-width: 1024px) {
    gap: 15px;
    justify-content: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    
    gap: 20px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const RightBoxReplacement = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 300px;

  @media (max-width: 1200px) {
    max-width: none;
  }

  @media (max-width: 1200px) {
    min-width: 250px;
  }
  @media (max-width: 1100px) {
    display: none;
  }
`;

export {
  CoursesLayout,
  ContentWrapper,
  CoursesSection,
  TitleWrapper,
  AddCourseCard,
  CoursesGrid,
  RightBoxReplacement,
};
