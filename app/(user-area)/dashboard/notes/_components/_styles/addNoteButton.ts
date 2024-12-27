'use client'
import styled from 'styled-components'

export const AddNoteContainer = styled.div`
  background: #36303A;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 200px;
  min-width: 300px;
  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    background-color: #241E27;
  }

  img {
    width: 50px;
    height: 50px;
    opacity: 0.7;
  }


` 