import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  position: relative;

  h2 {
    font-size: 16px;
    font-weight: 600;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownHeader = styled.div`
  background-color: #545454;
  padding: 0 20px;
  height: 48px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  span {
    font-size: 14px;
    font-weight: 400;
  }
`;

export const DropdownList = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #545454;
  border-radius: 16px;
  margin-top: 8px;
  padding: 8px;
  list-style: none;
  z-index: 100;
  
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "all" : "none")};
  transform: ${({ $isOpen }) => ($isOpen ? "translateY(0)" : "translateY(-10px)")};
  transition: all 0.3s ease;
`;

export const DropdownListItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #666666;
  }
`;

export const Chevron = styled.div`
  transition: transform 0.3s;
  
  img {
    width: 12px;
    height: 12px;
  }
`; 