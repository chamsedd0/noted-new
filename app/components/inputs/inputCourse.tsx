
// components/PrimaryButton.js
import styled from 'styled-components';

interface InputProps {
    error?: boolean;
  }

const Input = styled.input<InputProps>`
    width: 100%;
    
    height: 48px;
    font-size: 16px;
    padding-left: 20px;
    border: ${({ error }) => error ? '#BE0505 1.5px solid' : 'none'};
    outline: none;
    background-color: #413B44;
    border-radius: 100px;
    color: #C6C6C6;
    font-weight: 500;

    &[type="date"] {
        width: 100%;
        padding-right: 20px;

        border: none;
        
        appearance: none; 
        outline: none;
    }

    &[type="date"]::-webkit-datetime-edit-text {
        color: #C6C6C6;
        opacity: 0.7; /* Placeholder color */
    }

    &[type="date"]::-webkit-datetime-edit {
        color: #C6C6C6; /* Default text color */
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
    flex: 1;

`
interface TextProps {
    error?: boolean;
}

const Text = styled.p<TextProps>`

    font-weight: 600;
    font-size: 18px;
    color: ${({ error }) => error ? '#BE0505' : 'white'};

`

interface InputCourseComponentProps {
    title: string;
    placeHolder: string;
    type: string;
    error?: boolean;
    value: string;
    setVariable: (value: string) => void;
  }

const InputCourseComponent = ( { 
    title, 
    placeHolder, 
    type, 
    error, 
    value, 
    setVariable 
}: InputCourseComponentProps) => {
    return (
        <Container>
            <Text error={error}>{ title }</Text>
            <Input value={value} onChange={(e) => setVariable(e.target.value)} placeholder={placeHolder} type={ type } error={ error } />
        </Container>
    );
  };

export default InputCourseComponent;