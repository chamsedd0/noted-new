import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const Text = styled.p<{ $error: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${({ $error }) => ($error ? "#FE8686" : "white")};
`;

export const Input = styled.input<{ $error: boolean }>`
  width: 100%;
  height: 48px;
  padding: 0 20px;
  border-radius: 100px;
  border: 2px solid ${({ $error }) => ($error ? "#FE8686" : "transparent")};
  background-color: #545454;
  color: white;
  font-size: 14px;
  font-weight: 400;

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? "#FE8686" : "#666666")};
  }

  &::placeholder {
    color: #bcbcbc;
  }
`; 