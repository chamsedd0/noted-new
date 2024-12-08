import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  background-color: #383838;
  padding: 15px 40px;
  max-height: 70px;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  position: fixed;
  z-index: 100;
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
}>`
  display: flex;
  align-items: center;
  gap: 60px;
  color: white;

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

  .courses {
    opacity: ${(props) => (props.$hightlightCourse ? 1 : 0.5)};
  }

  .scheduler {
    opacity: ${(props) => (props.$hightlightSchedule ? 1 : 0.5)};
  }

  .notification {
    opacity: 0.5;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  color: white;
  gap: 24px;
  cursor: pointer;

  Image {
    width: 40px;
    height: 40px;
    border-radius: 100px;
  }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 60px;
  right: 40px;
  background-color: #545454;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  padding: 16px;
  width: 200px;

  z-index: 100;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  transition: all 0.5s ease;

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
      background-color: #5b5b5b;
    }
  }

  button {
    color: #fe8686;
    font-weight: 600;
  }
`;

export { HeaderContainer, Logo, NavItems, UserProfile, DropdownMenu };
