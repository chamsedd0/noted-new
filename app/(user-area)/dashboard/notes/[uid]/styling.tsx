'use client'
import styled from 'styled-components'

export const CourseNotesContainer = styled.div`
  margin-top: 110px;
  padding: 0 40px;
  width: 80%;
  min-height: 80vh;
`

export const CourseHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  h1 {
    font-size: 24px;
    font-weight: 600;
    color: white;
  }
`

export const NotesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
