'use client'
import styled from 'styled-components'

interface NoteCardProps {
  title: string
  description: string
  lastChecked: string
  color: string
  clickFunction: () => void
}

// Main container for the card
const CourseNoteCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #413B44;
  padding: 20px;
  border-radius: 15px;
  max-width: 300px;
  min-width: 300px;
  height: 200px;
  color: white;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #36303A;
    transform: translateY(-4px);
    box-shadow: none;
  }


  
  @media (max-width: 1470px) {
    max-width: 320px;
  }
  
`;

const CardHeader = styled.div`

  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 20px;

  #smartIcon {
    svg {
      width: 60px;
      height: 60px;
    }
  }

  #regularIcon {
    svg {
      width: 60px;
      height: 60px;
    }
  }

`

// Title section of the card
const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  line-height: 1.4;
  max-width: 170px;
`;

// Notes info section
const NotesInfo = styled.p`
  font-size: 14px;
  color: white;
  margin: 10px 0;
  max-height: 40px;
`;

// Last modified section
const LastChecked = styled.p`
  font-size: 12px;
  color: #BCBCBC;
  margin: 10px 0 0;
  font-weight: 500;
`;

const CardFooter = styled.div`

    display: flex;
    align-items: end;
    justify-content: space-between;

    .dots {
        width: 32px;
        height: 32px;
        opacity: 0.5;
        background-color: #A3A3A3;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100px;
        transition: all 0.3s ease;
        cursor: pointer;

        img {
          width: 20px;
        }

        &:hover {
            opacity: 1;
        }
    }

`

export { CourseNoteCard, CardHeader, Title, NotesInfo, LastChecked, CardFooter }