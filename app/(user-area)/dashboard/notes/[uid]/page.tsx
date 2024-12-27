'use client'

import { useRef, useState, useEffect } from 'react'
import globalStore from "@/app/(user-area)/_store";

import { 
  CourseNotesContainer, 
  CourseHeader,
  NotesContainer,
  NotesGrid,
  SlideButton,
  ActionButtons 
} from './styling'
import NoteCard from '../_components/NoteCard'
import AddNoteButton from '../_components/AddNoteButton'
import AddNoteButtonComponent from '@/app/components/buttons/addNote'
import PracticeButtonComponent from '@/app/components/buttons/practiceButton'
import { RightBoxReplacement } from '../../_styles';

interface DragState {
  isDragging: boolean
  startX: number
  scrollLeft: number
}

export default function CoursePage({ params }: { params: { uid: string } }) {
  const { courses } = globalStore();

  const course = courses.find((course) => course.uid === params.uid);
  const smartNotesGridRef = useRef<HTMLDivElement>(null)
  const regularNotesGridRef = useRef<HTMLDivElement>(null)
  const recentNotesGridRef = useRef<HTMLDivElement>(null)
  const practiceNotesGridRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState({
    smart: false,
    regular: false,
    recent: false,
    practice: false
  })
  const [canScrollRight, setCanScrollRight] = useState({
    smart: false,
    regular: false,
    recent: false,
    practice: false
  })
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    scrollLeft: 0
  })

  // Example notes data - replace with your actual data
  const smartNotes = [
    {
      id: 1,
      title: 'AI Generated Summary',
      description: 'chapter 1',
      lastChecked: '2024-03-15',
      color: '#9AC5FC'
    },
    {
      id: 2,
      title: 'AI Generated Summary',
      description: 'chapter 1',
      lastChecked: '2024-03-15',
      color: '#9AC5FC'
    },
    {
      id: 3,
      title: 'AI Generated Summary',
      description: 'chapter 1',
      lastChecked: '2024-03-15',
      color: '#9AC5FC'
    },
    {
      id: 4,
      title: 'AI Generated Summary',
      description: 'chapter 1',
      lastChecked: '2024-03-15',
      color: '#9AC5FC'
    }
  ];

  const regularNotes = [
    {
      id: 2,
      title: 'Introduction to React',
      description: 'chapter 2',
      lastChecked: '2024-03-15',
      color: '#D6FC9A'
    },
    {
      id: 3,
      title: 'Introduction to React',
      description: 'chapter 2',
      lastChecked: '2024-03-15',
      color: '#D6FC9A'
    }
  ];

  const recentNotes = [
    {
      id: 3,
      title: 'Recently Viewed Note',
      description: 'Last opened',
      lastChecked: '2024-03-16',
      color: '#FB97E2'
    },
    {
      id: 4,
      title: 'Recently Viewed Note',
      description: 'Last opened',
      lastChecked: '2024-03-16',
      color: '#FB97E2'
    },
    {
      id: 5,
      title: 'Recently Viewed Note',
      description: 'Last opened',
      lastChecked: '2024-03-16',
      color: '#FB97E2'
    }
  ];

  const practiceNotes = [
    {
      id: 4,
      title: 'Practice Problems',
      description: 'Exercise set 1',
      lastChecked: '2024-03-17',
      color: '#FC9A9A'
    },
    {
      id: 5,
      title: 'Practice Problems',
      description: 'Exercise set 2',
      lastChecked: '2024-03-17',
      color: '#FC9A9A'
    },
    {
      id: 6,
      title: 'Practice Problems',
      description: 'Exercise set 3',
      lastChecked: '2024-03-17',
      color: '#FC9A9A'
    }
  ];

  const BookMark = ({ color }: { color: string }) => {
    return (
      <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.666504 4.67574C0.666504 3.43566 1.19329 2.24636 2.13097 1.36949C3.06865 0.492621 4.34042 0 5.6665 0H22.3332C23.6593 0 24.931 0.492621 25.8687 1.36949C26.8064 2.24636 27.3332 3.43566 27.3332 4.67574V29.6567C27.3332 31.5581 25.0332 32.6647 23.3798 31.5597L13.9998 25.2942L4.61984 31.5597C2.96484 32.6663 0.666504 31.5597 0.666504 29.6582V4.67574Z" fill={color}/>
      </svg>
    )
  }



  const handleAddNote = () => {
    // Add note logic
    console.log('Add note');
  };

  const handleEditNote = (id: number) => {
    // Edit note logic
    console.log('Edit note', id);
  };

  const checkScrollButtons = (gridRef: React.RefObject<HTMLDivElement>, type: 'smart' | 'regular' | 'recent' | 'practice') => {
    if (gridRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = gridRef.current
      setCanScrollLeft(prev => ({
        ...prev,
        [type]: scrollLeft > 0
      }))
      setCanScrollRight(prev => ({
        ...prev,
        [type]: scrollLeft < scrollWidth - clientWidth - 1
      }))
    }
  }

  const handleMouseDown = (e: React.MouseEvent, gridRef: React.RefObject<HTMLDivElement>) => {
    if (!gridRef.current) return
    
    setDragState({
      isDragging: true,
      startX: e.pageX - gridRef.current.offsetLeft,
      scrollLeft: gridRef.current.scrollLeft
    })
  }

  const handleMouseUp = () => {
    setDragState(prev => ({
      ...prev,
      isDragging: false
    }))
  }

  const handleMouseMove = (e: React.MouseEvent, gridRef: React.RefObject<HTMLDivElement>) => {
    if (!dragState.isDragging || !gridRef.current) return
    
    e.preventDefault()
    const x = e.pageX - gridRef.current.offsetLeft
    const walk = (x - dragState.startX) * 2 // Scroll speed multiplier
    gridRef.current.scrollLeft = dragState.scrollLeft - walk
  }

  const handleMouseLeave = () => {
    setDragState(prev => ({
      ...prev,
      isDragging: false
    }))
  }

  useEffect(() => {
    const smartGrid = smartNotesGridRef.current
    const regularGrid = regularNotesGridRef.current
    const recentGrid = recentNotesGridRef.current
    const practiceGrid = practiceNotesGridRef.current

    const checkAllScrolls = () => {
      checkScrollButtons(smartNotesGridRef, 'smart')
      checkScrollButtons(regularNotesGridRef, 'regular')
      checkScrollButtons(recentNotesGridRef, 'recent')
      checkScrollButtons(practiceNotesGridRef, 'practice')
    }

    if (smartGrid && regularGrid && recentGrid && practiceGrid) {
      checkAllScrolls()
      
      smartGrid.addEventListener('scroll', () => checkScrollButtons(smartNotesGridRef, 'smart'))
      regularGrid.addEventListener('scroll', () => checkScrollButtons(regularNotesGridRef, 'regular'))
      recentGrid.addEventListener('scroll', () => checkScrollButtons(recentNotesGridRef, 'recent'))
      practiceGrid.addEventListener('scroll', () => checkScrollButtons(practiceNotesGridRef, 'practice'))
      window.addEventListener('resize', checkAllScrolls)
      
      return () => {
        smartGrid.removeEventListener('scroll', () => checkScrollButtons(smartNotesGridRef, 'smart'))
        regularGrid.removeEventListener('scroll', () => checkScrollButtons(regularNotesGridRef, 'regular'))
        recentGrid.removeEventListener('scroll', () => checkScrollButtons(recentNotesGridRef, 'recent'))
        practiceGrid.removeEventListener('scroll', () => checkScrollButtons(practiceNotesGridRef, 'practice'))
        window.removeEventListener('resize', checkAllScrolls)
      }
    }
  }, [smartNotes, regularNotes, recentNotes, practiceNotes])

  const scroll = (direction: 'left' | 'right', gridRef: React.RefObject<HTMLDivElement>) => {
    if (gridRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320
      gridRef.current.scrollLeft += scrollAmount
    }
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <CourseNotesContainer>
      <CourseHeader>
        <h1>{course.title} <BookMark color={course.color} /></h1>
        <ActionButtons>
          
          <AddNoteButtonComponent onUpload={handleAddNote} />
          <PracticeButtonComponent onUpload={handleAddNote} />

        </ActionButtons>
      </CourseHeader>

      <h2>Smart Notes <img src="/smart.svg" alt="menu" /></h2>
      <span>
        {smartNotes.length} Notes
      </span>
      <NotesContainer>
        {canScrollLeft.smart && (
          <SlideButton direction="left" onClick={() => scroll('left', smartNotesGridRef)}>
            <img src="/left-arrow.svg" alt="Previous" />
          </SlideButton>
        )}
        {canScrollRight.smart && (
          <SlideButton direction="right" onClick={() => scroll('right', smartNotesGridRef)}>
            <img src="/right-arrow.svg" alt="Next" />
          </SlideButton>
        )}
        <NotesGrid 
          ref={smartNotesGridRef}
          $canScrollLeft={canScrollLeft.smart}
          $canScrollRight={canScrollRight.smart}
        >
          {smartNotes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              description={note.description}
              lastChecked={note.lastChecked}
              color={note.color}
              clickFunction={() => handleEditNote(note.id)}
              type="smart"
            />
          ))}
          <AddNoteButton onClick={handleAddNote} />
        </NotesGrid>
      </NotesContainer>

      <h2>Regular Notes <img src="/regular.svg" alt="menu" /></h2>
      <span>
        {regularNotes.length} Notes
      </span>
      <NotesContainer>
        {canScrollLeft.regular && (
          <SlideButton direction="left" onClick={() => scroll('left', regularNotesGridRef)}>
            <img src="/left-arrow.svg" alt="Previous" />
          </SlideButton>
        )}
        {canScrollRight.regular && (
          <SlideButton direction="right" onClick={() => scroll('right', regularNotesGridRef)}>
            <img src="/right-arrow.svg" alt="Next" />
          </SlideButton>
        )}
        <NotesGrid 
          ref={regularNotesGridRef}
          $canScrollLeft={canScrollLeft.regular}
          $canScrollRight={canScrollRight.regular}
          onMouseDown={(e) => handleMouseDown(e, regularNotesGridRef)}
          onMouseUp={handleMouseUp}
          onMouseMove={(e) => handleMouseMove(e, regularNotesGridRef)}
          onMouseLeave={handleMouseLeave}
        >
          {regularNotes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              description={note.description}
              lastChecked={note.lastChecked}
              color={note.color}
              clickFunction={() => handleEditNote(note.id)}
              type="regular"
            />
          ))}
          <AddNoteButton onClick={handleAddNote} />
        </NotesGrid>
      </NotesContainer>

      <h2>Practice Notes <img src="/practice.svg" alt="menu" /></h2>
      <span>
        {practiceNotes.length} Notes
      </span>
      <NotesContainer>
        {canScrollLeft.practice && (
          <SlideButton direction="left" onClick={() => scroll('left', practiceNotesGridRef)}>
            <img src="/left-arrow.svg" alt="Previous" />
          </SlideButton>
        )}
        {canScrollRight.practice && (
          <SlideButton direction="right" onClick={() => scroll('right', practiceNotesGridRef)}>
            <img src="/right-arrow.svg" alt="Next" />
          </SlideButton>
        )}
        <NotesGrid 
          ref={practiceNotesGridRef}
          $canScrollLeft={canScrollLeft.practice}
          $canScrollRight={canScrollRight.practice}
          onMouseDown={(e) => handleMouseDown(e, practiceNotesGridRef)}
          onMouseUp={handleMouseUp}
          onMouseMove={(e) => handleMouseMove(e, practiceNotesGridRef)}
          onMouseLeave={handleMouseLeave}
        >
          {practiceNotes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              description={note.description}
              lastChecked={note.lastChecked}
              color={note.color}
              clickFunction={() => handleEditNote(note.id)}
              type="practice"
            />
          ))}
          <AddNoteButton onClick={handleAddNote} />
        </NotesGrid>
      </NotesContainer>

      <h2>Recently Viewed <img src="/recentlyOpened.svg" alt="menu" /></h2>
      
      <NotesContainer>
        {canScrollLeft.recent && (
          <SlideButton direction="left" onClick={() => scroll('left', recentNotesGridRef)}>
            <img src="/left-arrow.svg" alt="Previous" />
          </SlideButton>
        )}
        {canScrollRight.recent && (
          <SlideButton direction="right" onClick={() => scroll('right', recentNotesGridRef)}>
            <img src="/right-arrow.svg" alt="Next" />
          </SlideButton>
        )}
        <NotesGrid 
          ref={recentNotesGridRef}
          $canScrollLeft={canScrollLeft.recent}
          $canScrollRight={canScrollRight.recent}
          onMouseDown={(e) => handleMouseDown(e, recentNotesGridRef)}
          onMouseUp={handleMouseUp}
          onMouseMove={(e) => handleMouseMove(e, recentNotesGridRef)}
          onMouseLeave={handleMouseLeave}
        >
          {recentNotes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              description={note.description}
              lastChecked={note.lastChecked}
              color={note.color}
              clickFunction={() => handleEditNote(note.id)}
            />
          ))}
        </NotesGrid>
      </NotesContainer>

      

      {/* TODO: Add these modals:
        - Add/Edit note modal
        - Delete confirmation modal
      */}

      <RightBoxReplacement></RightBoxReplacement>
    </CourseNotesContainer>
  );
}