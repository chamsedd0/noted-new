'use client'
import { 
  NoteCardContainer,
  NoteHeader,
  NoteContent,
  NoteFooter,
  ActionButton
} from './_styles/noteCard'

interface NoteCardProps {
  title: string
  content: string
  date: string
  onEdit: () => void
  onDelete: () => void
}

export default function NoteCard({ title, content, date, onEdit, onDelete }: NoteCardProps) {
  return (
    <NoteCardContainer>
      <NoteHeader>
        <h3>{title}</h3>
        <div>
          <ActionButton onClick={onEdit}>
            <img src="/edit.svg" alt="Edit" />
          </ActionButton>
          <ActionButton onClick={onDelete}>
            <img src="/delete.svg" alt="Delete" />
          </ActionButton>
        </div>
      </NoteHeader>
      
      <NoteContent>
        {content}
      </NoteContent>

      <NoteFooter>
        <span>{date}</span>
      </NoteFooter>
    </NoteCardContainer>
  )
} 