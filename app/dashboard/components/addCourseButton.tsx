"use client"

// components/PrimaryButton.js
import styled from 'styled-components';
import Button from '@/app/components/buttons/button';

interface AddCourseButtonProps {
  action: (value: boolean) => void;
}

const AddEventButton = styled(Button)`
   background-color: white;
    max-width: 170px !important;
    min-width: 170px !important;
    font-size: 15px !important;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #BCBCBC;  /* Slight background color change on hover */
    }

    @media (max-width: 1200px) {
      transform: scale(0.8) translateX(10%);
    }

    img {
      width: 14px !important;
    }
`;

const AddCourseButtonComponent = ({ action }: AddCourseButtonProps) => {
    return (
      <AddEventButton onClick={() => {action(true)}}>
        <img src='/addEventBlack.svg'></img> Add Course
      </AddEventButton>
    );
  };

export default AddCourseButtonComponent;