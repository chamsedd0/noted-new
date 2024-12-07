'use client'

import React from 'react';
import { ModalOverlay, ModalContent, ModalHeader, CloseButton, DeleteButton, ButtonWrapper, CancelButton } from './_styles/deleteCourseModal';

interface DeleteCourseModalProps {
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isOpen: boolean;
  courseTitle: string;
}


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
        <h2>Do you really want to delete {courseTitle} from your List?</h2>
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