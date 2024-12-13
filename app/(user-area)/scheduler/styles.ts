import styled from "styled-components";

const CoursesLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2D282F;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  flex: 1;
  margin-top: 70px;
  gap: 40px;
`;

const SchedulerSection = styled.div`
  flex: 3;
  color: #fff;
  padding: 20px;
  h1 {
    font-size: 32px;
    margin-bottom: 20px;
    @media (max-width: 1200px) {
      font-size: 24px;
    }
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 20px;
`;

interface ControlsProps {
  isSelected: boolean;
  activitySelected: boolean;
}

const Controls = styled.div<ControlsProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;

  img {
    width: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .edit {
    opacity: ${({ isSelected }) => (isSelected ? 0.5 : 1)};
    pointer-events: ${({ isSelected }) => (isSelected ? "none" : "all")};
  }

  .delete {
    opacity: ${({ activitySelected }) => (activitySelected ? 1 : 0.5)};
    pointer-events: ${({ activitySelected }) =>
      activitySelected ? "all" : "none"};
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

export { CoursesLayout, ContentWrapper, SchedulerSection, TitleWrapper, Controls, RightBoxReplacement };
