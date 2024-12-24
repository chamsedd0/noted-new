'use client'
import styled from 'styled-components'

export const NoteCardContainer = styled.div`
  background: #36303A;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`

export const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: white;
  }
`

export const NoteContent = styled.p`
  font-size: 14px;
  color: #808080;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const NoteFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  
  span {
    font-size: 12px;
    color: #808080;
  }
`

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  img {
    width: 16px;
    height: 16px;
  }
` 