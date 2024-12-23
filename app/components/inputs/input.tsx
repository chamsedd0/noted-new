import styled from "styled-components";

interface InputProps {
  error?: boolean;
}

const Input = styled.input<InputProps>`
  min-width: 100%;
  height: 48px;
  font-size: 16px;
  padding-left: 20px;
  border: ${({ error }) => (error ? "#BE0505 1.5px solid" : "none")};
  outline: none;
  background-color: #413B44;
  border-radius: 100px;
  color: #c6c6c6;
  font-weight: 500;


  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  

  &:focus {
    text-overflow: clip;
    overflow: visible;
  }

  &[type="date"] {
    width: 100%;
    padding-right: 20px;

    border: none;

    appearance: none;
    outline: none;
  }

  &[type="date"]::-webkit-datetime-edit-text {
    color: #c6c6c6;
    opacity: 0.7;
  }

  &[type="date"]::-webkit-datetime-edit {
    color: #c6c6c6;
    opacity: 0.7;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 1rem;
  width: inherit;
`;

interface TextProps {
  error?: boolean;
}

const Text = styled.p<TextProps>`
  font-weight: 600;
  font-size: 18px;
  color: ${({ error }) => (error ? "#BE0505" : "white")};
`;

const ErrorMessage = styled.span`
  color: #BE0505;
  font-size: 14px;
  margin-top: -8px;
  margin-left: 20px;
`;

interface InputComponentProps {
  title: string;
  placeHolder: string;
  type: string;
  error?: boolean;
  errorMesage?: string;
  value: string;
  setVariable: (value: string) => void;
}

const InputComponent = ({
  title,
  placeHolder,
  type,
  error,
  errorMesage,
  value,
  setVariable,
}: InputComponentProps) => {
  return (
    <Container>
      <Text error={error}>{title}</Text>
      <Input
        value={value}
        onChange={(e) => setVariable(e.target.value)}
        placeholder={placeHolder}
        type={type}
        error={error}
      />
      {error && errorMesage && (
        <ErrorMessage>
          {errorMesage}
        </ErrorMessage>
      )}
    </Container>
  );
};

export default InputComponent;
