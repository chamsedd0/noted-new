'use client'

import React from 'react';
import styled from 'styled-components';

interface DeleteCourseModalProps {
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isOpen: boolean;
  courseTitle: string;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  pointer-events: ${props => (props.isOpen ? 'all' : 'none')};
  transition: all 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: #444444;
  color: white;
  border-radius: 10px;
  padding: 20px;
  width: 600px;
  min-height: 250px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding-bottom: 20px;

  @media (max-width: 1470px) {
    transform: scale(0.9);
  }

  h2 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
    max-width: 370px;
  }

  p {
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 40px;
    color: white;
    max-width: 410px;
    

  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const DeleteButton = styled.button`
  background-color: white;
  color: #383838;
  border: none;
  border-radius: 50px;
  width: 155px;
  height: 48px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  

  &:hover {
    background-color: #BCBCBC;
  }
`;

const CancelButton = styled.button`
  background-color: transparent;
  color: white;
  border: 3px solid white;
  width: 155px;
  height: 48px;
  font-size: 16px;
  border-radius: 50px;
  font-weight: 700;
  cursor: pointer;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  img {
    width: 20px;
    opacity: 0.7;
    transition: all 0.3s ease;

    &:hover {
        opacity: 1;
    }
  }
`;

const CourseDeleteModal = ({ onConfirm, onCancel, isOpen, courseTitle }: DeleteCourseModalProps) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course. Please try again.');
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={onCancel}>
      <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <ModalHeader>
          <img src='/trash.svg' alt="trash icon" />
          <CloseButton onClick={onCancel}>
            <img src='/close.svg' alt="close" />
          </CloseButton>
        </ModalHeader>
        <h2>Do you really want to delete "{courseTitle}" from your List?</h2>
        <p>
          The course cannot be brought back unless you add it manually after deletion.
          All the notes in the course will also be deleted. Your Schedule will automatically be cleared.
        </p>
        <ButtonWrapper>
          <DeleteButton onClick={handleConfirm}>Delete</DeleteButton>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </ButtonWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CourseDeleteModal;