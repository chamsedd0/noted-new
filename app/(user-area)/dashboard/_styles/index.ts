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
  max-width: 100%;
  max-height: 250px;
  color: white;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;

  img {
    width: 64px;
    height: 64px;

    user-drag: none; /* Prevent image dragging */
    -webkit-user-drag: none; /* For WebKit browsers */
    user-select: none; /* Prevent selection */

  }

  

  &:active {
    background-color: #241E27;
  }

  
  @media (max-width: 1470px) {
    min-width: 440px;
  }

`

const CoursesGrid = styled.div`
  width: 98%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  gap: 20px 20px;

  @media (max-width: 1470px) {
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
    gap: 30px 20px;
  }

  @media (max-width: 1460px) {
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
    width: 100%;
  }
  @media (max-width: 1350px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
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
