import styled from "styled-components";

const NotifSidebar = styled.div<{ $isProfile?: boolean }>`
  position: fixed;
  max-height: 77.5vh;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  width: 300px;
  top: 140px;
  right: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 1700px) {
    display: ${({ $isProfile }) => ($isProfile ? "none" : "flex")};
  }

  @media (max-width: 1200px) {
    width: 250px;
  }

  @media (max-width: 1100px) {
    display: none;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

// Notification section
const NotificationSection = styled.div<{ $isOpen: boolean }>`
  width: 100%;


  h3 {
    color: #fff;
    font-size: 24px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 20px;
    cursor: pointer;
    width: 100%;
    

    img {
      width: 24px;
      height: 24px;
    }

    .toggle-icon {
      width: 12px;
      height: 12px;
      transition: transform 0.3s ease;
      transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
      
    }
  }

  .content {
    width: 100%;
    height: ${props => props.$isOpen ? 'auto' : '0'};
    opacity: ${props => props.$isOpen ? '1' : '0'};
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    gap: 10px;
  }
`;

// Schedule section
const ScheduleSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 10px;

  h3 {
    color: #fff;
    font-size: 24px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 20px;
    width: 100%;

    img {
      width: 24px;
      height: 24px;
    }
  }
  span {
    color: white;
    font-size: 20px;
    font-weight: 700;
  }
`;
// Add these styled components
const DateNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;

  span {
    font-size: 16px;
    color: white;
  }
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  img {
    width: 16px;
    height: 16px;
  }
`;
// Add new styled components for animations
const AnimatedScheduleSection = styled(ScheduleSection)<{ $isOpen: boolean }>`
  h3 {
    margin-bottom: 10px;
    cursor: pointer;

    .toggle-icon {
      width: 12px;
      height: 12px;
      transition: transform 0.3s ease;
      transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
    }
  }

  .content {
    width: 100%;
    height: ${props => props.$isOpen ? 'auto' : '0'};
    opacity: ${props => props.$isOpen ? '1' : '0'};
    overflow: hidden;
    transition: all 0.3s ease;
  }
`;

const EventsContainer = styled.div<{ isChanging: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  opacity: ${(props) => (props.isChanging ? 0 : 1)};
  transition: opacity 0.3s ease;
`;

// Add a new styled component for the empty message
const EmptyMessage = styled.p`
  color: #bcbcbc;
  font-size: 14px;
  text-align: center;
  width: 100%;
  padding: 20px 0;
`;
export {
  NotifSidebar,
  NotificationSection,
  ScheduleSection,
  DateNavigation,
  NavigationButton,
  AnimatedScheduleSection,
  EventsContainer,
  EmptyMessage,
};
