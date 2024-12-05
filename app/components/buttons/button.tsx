import styled from 'styled-components';

const Button = styled.button`
  border: none;
  border-radius: 100px;
  text-align: center;
  font-weight: 800;
  cursor: pointer;
  color: #383838;
  font-size: 20px;
  min-width: 240px;  /* Adjust the width to fit the design */
  padding: 10px 24px;
  font-family: var(--poppins-font);
  max-height: 60px;
  z-index: 0;



  transition: all 0.3s ease;

  img {
        margin-right: 1rem;
        height: 32px;  /* Adjust the size of the logo */
    }
`;


export default Button;