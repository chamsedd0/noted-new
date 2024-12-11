import styled from "styled-components";

// Wrapper for the entire component
const NotifyWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
  gap: 16px;

  h2 {
    font-size: 16px !important;
  }

  .box {
    display: flex;
    align-items: start;
    width: 100%;
    justify-content: start;
    gap: 10px;
  }
`;

// Styled label for the Notify text
const NotifyLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

// Switch container
const SwitchContainer = styled.div<{ isOn: boolean }>`
  position: relative;
  width: 48px;
  height: 24px;
  background-color: ${(props) => (props.isOn ? "#3C9437" : "#282828")};
  border-radius: 100px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

// The circle inside the switch
const SwitchCircle = styled.div<{ isOn: boolean }>`
  position: absolute;
  top: 2px;
  left: ${(props) => (props.isOn ? "26px" : "2px")};
  opacity: ${(props) => (props.isOn ? 1 : 0.6)};
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;
  transition: left 0.3s ease;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

export { NotifyWrapper, NotifyLabel, SwitchContainer, SwitchCircle };
