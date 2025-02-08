import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  background-color: #2D282F;
  padding: 15px 40px;
  height: 70px;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  position: fixed;
  z-index: 100;

  .mobile-controls {
    display: none;
    height: 100%;
    align-items: center;
  }

  @media (max-width: 1200px) {
    padding: 15px 35px;
    gap: 20px;
    justify-content: space-between;

    .mobile-controls {
      display: flex;
      gap: 20px;
      align-items: center;
      height: 100%;
    }

    .desktop-nav {
      display: none;
    }
  }

  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .search-section {
    max-width: 660px;
    flex: 1;
    margin-right: auto;

    @media (max-width: 1200px) {
      display: none;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1200px) {
    display: flex;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 1200px) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 200;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    pointer-events: ${({ $isOpen }) => ($isOpen ? "all" : "none")};
    transition: opacity 0.3s ease;
    cursor: pointer;
    
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  gap: 24px;
  cursor: pointer;

  Image {
    width: 40px;
    height: 40px;
    border-radius: 100px;
  }
`;

const MobileMenuContent = styled.div<{ $isOpen: boolean }>`
  background-color: #36303A;
  width: 300px;
  height: 100%;
  padding: 20px 0;
  position: absolute;
  right: 0;
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "100%")});
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 20px;
  cursor: default;

  .menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 0 24px;
    
    h2 {
      color: white;
      font-size: 20px;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
    }
  }

  .search-container {
    padding: 0 24px;
    width: 100%;
    margin-bottom: 20px;

    input {
      width: 100%;
    }
  }

  .profile-section {
    margin-top: auto;
    padding: 0 24px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
    

    ${UserProfile} {
      img {
        width: 48px;
        height: 48px;
      }
    }
  }

  .logout-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: none;
    border: none;
    color: #fe8686;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    padding: 10px;
    width: 100%;
    border-radius: 8px;
    transition: background 0.3s ease;
    text-align: center;

    img {
      order: 2;
    }

    &:hover {
      background: rgba(254, 134, 134, 0.1);
    }
  }
`;

const DropdownNotifications = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 60px;
  right: 40px;
  background-color: #413B44;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  padding: 12px;
  
  width: 300px;

  z-index: 100;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  transition: all 0.3s ease;

  overflow: hidden;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "all" : "none")};

  h2 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  a {
    margin-top: 12px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 14px;
    font-weight: 700;
    color: white;
    text-decoration: none;
    border: none;
    background: none;
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }


`;  

const SeparationLine = styled.div`
  width: 90%;
  height: 1px;
  background-color: #555059;
  margin: auto;
`;


const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: white;

  Image {
    width: 100px;
    margin-right: 10px;
  }
`;

const NavItems = styled.div<{
  $hightlightCourse: boolean;
  $hightlightSchedule: boolean;
  $hightlightNotifications: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 60px;
  color: white;

  @media (max-width: 1200px) {
    display: none;
  }

  span {
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: 1;
    }

    Image {
      height: 25px;
    }
  }

  .grades {
    opacity: 0.5;
    pointer-events: none;
  }

  .courses {
    opacity: ${(props) => (props.$hightlightCourse ? 1 : 0.5)};
  }

  .scheduler {
    opacity: ${(props) => (props.$hightlightSchedule ? 1 : 0.5)};
  }

  .notification {
    opacity: ${(props) => (props.$hightlightNotifications ? 1 : 0.5)};
  }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 60px;
  right: 40px;
  background-color: #413B44;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  padding: 12px;
  width: 200px;

  z-index: 100;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  transition: all 0.3s ease;

  overflow: hidden;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "all" : "none")};

  a,
  button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    font-size: 16px;
    font-weight: 500;
    color: white;
    text-decoration: none;
    border: none;
    background: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
    transition: all 0.3s ease;
    border-radius: 10px;

    &:hover {
      background-color: rgb(78, 70, 82);
    }
  }

  button {
    color: #fe8686;
    font-weight: 600;
  }
`;

const MobileNavItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 40px 0;
  padding: 0 24px;
  width: 100%;
  transition: all 0.3s ease;

  a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    opacity: 0.7;
    transition: all 0.3s ease;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 45px;
    img {
      width: 24px;
      height: 24px;
    }

    &:hover, &.active {
      opacity: 1;
      background: #413B44;
    }
  }

  a[href="/dashboard/grades"] {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const NotificationIndicator = styled.div`
  width: 8px;
  height: 8px;
  background-color: #BE0505;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  right: 2px;
`;

const NotificationWrapper = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
`;

export { HeaderContainer, Logo, NavItems, UserProfile, DropdownMenu, DropdownNotifications, SeparationLine, MobileMenuButton, MobileMenu, MobileMenuContent, MobileNavItems, NotificationIndicator, NotificationWrapper };
