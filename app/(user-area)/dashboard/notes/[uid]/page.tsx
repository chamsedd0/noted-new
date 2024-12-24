'use client'

import { useState } from 'react'
import globalStore from "@/app/(user-area)/_store";
import { 
  CourseNotesContainer, 
  CourseHeader,
  NotesGrid,
  ActionButtons 
} from './styling'
import NoteCard from '../_components/NoteCard'
import AddNoteButton from '../_components/AddNoteButton'

import { RightBoxReplacement } from '../../_styles';

export default function CoursePage({ params }: { params: { uid: string } }) {
  const { courses } = globalStore();
  const [isGrid, setIsGrid] = useState(true);
  const [sortBy, setSortBy] = useState('Date');
  const course = courses.find((course) => course.uid === params.uid);

  // Example notes data - replace with your actual data
  const notes = [
    {
      id: 1,
      title: 'Introduction to React',
      content: 'React is a JavaScript library for building user interfaces...',
      date: '2024-03-15'
    },
    // Add more notes as needed
  ];

  const handleAddNote = () => {
    // Add note logic
    console.log('Add note');
  };

  const handleEditNote = (id: number) => {
    // Edit note logic
    console.log('Edit note', id);
  };

  const handleDeleteNote = (id: number) => {
    // Delete note logic
    console.log('Delete note', id);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    // Add sorting logic
  };

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <CourseNotesContainer>
      <CourseHeader>
        <h1>{course.title}</h1>
        <ActionButtons>
          <button>generate smart notes</button>
          <button>add note</button>
        </ActionButtons>
      </CourseHeader>

      <NotesGrid>
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            content={note.content}
            date={note.date}
            onEdit={() => handleEditNote(note.id)}
            onDelete={() => handleDeleteNote(note.id)}
          />
        ))}
        <AddNoteButton onClick={handleAddNote} />
      </NotesGrid>

      {/* TODO: Add these modals:
        - Add/Edit note modal
        - Delete confirmation modal
      */}

      <RightBoxReplacement></RightBoxReplacement>
    </CourseNotesContainer>
  );
}