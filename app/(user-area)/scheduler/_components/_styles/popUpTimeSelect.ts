import styled, {keyframes} from 'styled-components';



// Fade-in animation for select components
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;



const Wrapper = styled.div<{ isOpen: boolean }>`

  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  gap: 18px;


  animation: ${fadeIn} 0.6s ease-out forwards;
  z-index: ${(props) => (props.isOpen ? 1000 : 1)};
  


  h2 {
    font-size: 16px;
    font-weight: 600;
  }
`

const DropdownContainer = styled.div`
  max-width: 270px;
  min-width: 270px;
  position: relative;
  
`;

const DropdownHeader = styled.div`
  background-color: #413B44;
  color: #fff;
  padding: 20px;
  height: 48px;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
    font-size: 16px;
    font-weight: 600;
  &:hover {
    background-color: #444;
  }

  span {
    font-size: 15px;
    margin-right: 20px;
  }
`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
  
  z-index: ${(props) => (props.isOpen ? 1000 : 1)};

  /* when the dropdown list opens it can have conflicts */
  
  background-color: #333;
  color: #fff;
  list-style: none;
  padding: 5px;
  margin: 0;
  border-radius: 10px;
  max-height: ${(props) => (props.isOpen ? '200px' : '0px')};
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  pointer-events: ${(props) => (props.isOpen ? 'all' : 'none')};
  overflow-y: auto;
  position: absolute;
  top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  
  gap: 5px;
  transition: all 0.3s ease;
  padding-bottom: 45px;

  
`;

const DropdownListItem = styled.li`
    width: 64px;
    height: 48px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #545454;
    font-size: 16px;
    font-weight: 600;


    &:hover {
        background-color: #444;
    }
`;

const Chevron = styled.span<{ isOpen: boolean }>`
  transition: transform 0.3s;
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: all 0.3s ease;
  margin-right: 0 !important;

`;

const ResetButton = styled.li`
  width: 64px;
  height: 48px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #545454;
  font-size: 16px;
  font-weight: 600;


  &:hover {
      background-color: #444;
  }

  img {
    width: 24px;
    opacity: 0.8;
  }
`;


export {
    Wrapper,
    DropdownContainer,
    DropdownHeader,
    DropdownList,
    DropdownListItem,
    Chevron,
    ResetButton
}