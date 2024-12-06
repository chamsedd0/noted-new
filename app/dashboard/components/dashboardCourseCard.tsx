import styled from "styled-components";
import BookMark from "./bookmark";
import { CourseCardProps } from '../types';

// Main container for the card
const CourseDashboardCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #545454;
  padding: 24px;
  padding-top: 45px;
  border-radius: 15px;
  max-width: 440px;
  max-height: 250px;
  color: white;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #444444;
    box-shadow: none;
  }

  &:active {
    background-color: #282828;
    box-shadow: none;
  }

  
  @media (max-width: 1470px) {
    min-width: 440px;
    max-width: none;
  }
  
`;

const CardHeader = styled.div`

  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 50px;

  #bookmark {
    margin-top: -20px;
  }

`

// Title section of the card
const Title = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  line-height: 1.4;
  max-width: 270px;
`;

// Notes info section
const NotesInfo = styled.p`
  font-size: 14px;
  color: white;
  margin: 10px 0;
`;

// Last modified section
const LastModified = styled.p`
  font-size: 14px;
  color: #BCBCBC;
  margin: 10px 0 0;
  font-weight: 500;

  span {
    font-weight: 200;
    font-size: 12px;
  }
`;

const CardFooter = styled.div`

    display: flex;
    align-items: end;
    justify-content: space-between;
    position: relative;

    .dots {
        width: 40px;
        height: 40px;
        background-color: #A3A3A3;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100px;
        transition: all 0.3s ease;
        cursor: pointer;
        opacity: 0.5;
        &:hover {
           opacity: 1;
        }

        
        
    }

`
const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 41px;
  right: -25%;
  background-color: #545454;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  padding: 5px;
  width: 125px;
  
  z-index: 100;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  transition: all 0.5s ease;

  
  overflow: hidden;
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  pointer-events: ${({ isOpen }) => isOpen ? 'all' : 'none'};
  

  a, button {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    font-size: 12px;
    font-weight: 500;
    color: white;
    text-decoration: none;
    border: none;
    background: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
    transition: all 0.3s ease;
    border-radius: 8px;

    &:hover {
      background-color: #5B5B5B;
    }
  }

  img {
    width: 16px;
  }

  
`;


const CourseDashboardCardComponent = ({
  title,
  regularNotes,
  smartNotes,
  color,
  lastModified,
  clickFunction,
  setEdit,
  setSelectedCourse,
  onDelete,
  isDropdownOpen,
  setDropdownOpen
}: CourseCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onDelete();
  };

  return (
    <CourseDashboardCard onClick={() => clickFunction(title)}>
        
      <CardHeader>
        <div>
            <Title>{title}</Title>
            <NotesInfo>
            {smartNotes} Smart Notes, {regularNotes} Regular Notes
            </NotesInfo>
        </div>
        <div id="bookmark"><BookMark color={color}></BookMark></div>

      </CardHeader>
      

      <CardFooter onClick={(e) => e.stopPropagation()} >
        <LastModified>Last modified: <span>{lastModified}</span></LastModified>
        <div className="dots" onClick={() => setDropdownOpen(!isDropdownOpen)}>
            <img src="/menuDots.svg" alt="menu" />
            
        </div>
        <DropdownMenu isOpen={isDropdownOpen}>
            <button onClick={
              () => {
                setDropdownOpen(false);
                setSelectedCourse(title);
                setEdit(true);
              }
            }>
                <img src="/editCourses.svg"/>
                Edit
            </button>

            <button id="delete" onClick={handleDelete}>
                <img src="/trash.svg"/>
                Delete
            </button>
            
            
          </DropdownMenu>
      </CardFooter>
      
      
      
    </CourseDashboardCard>
  );
};

export default CourseDashboardCardComponent;
  