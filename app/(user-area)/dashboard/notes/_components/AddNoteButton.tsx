'use client'
import { AddNoteContainer } from './_styles/addNoteButton'

interface AddNoteButtonProps {
  onClick: () => void
}

export default function AddNoteButton({ onClick }: AddNoteButtonProps) {
  return (
    <AddNoteContainer onClick={onClick}>
      <img src="/addButtonGray.svg" alt="Add note" />
      <p>Add New Note</p>
    </AddNoteContainer>
  )
} 