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
  transition: transform 0.2s ease;
  min-height: 200px;

  &:hover {
    transform: translateY(-2px);
  }

  img {
    width: 40px;
    height: 40px;
    opacity: 0.7;
  }

  p {
    color: #808080;
    font-size: 14px;
  }
` 