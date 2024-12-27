'use client'
import styled from 'styled-components'

export const CourseNotesContainer = styled.div`
  margin-top: 140px;
  padding: 0 40px;
  width: 80%;
  min-height: 80vh;

  @media (max-width: 1600px) {
    width: 77%;
  }

  @media (max-width: 1400px) {
    width: 74%;
  }

  @media (max-width: 1300px) {
    width: 70%;
  }

  @media (max-width: 1100px) {
    width: 100%;
  }

  h2 {
    font-size: 22px;
    font-weight: 600;
    color: white;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 10px;
  }

  span {
    font-size: 16px;
    font-weight: 400;
    color: white;
  }
`

export const CourseHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  h1 {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 32px;
    font-weight: 700;
    color: white;
  }
`

export const NotesContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: visible;
`

export const NotesGrid = styled.div<{ 
  $canScrollLeft: boolean; 
  $canScrollRight: boolean;
}>`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 10px 0;
  position: relative;
  
  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  /* Blur gradients */
  mask-image: ${props => `linear-gradient(
    to right,
    transparent,
    black ${props.$canScrollLeft ? '100px' : '0px'},
    black calc(100% - ${props.$canScrollRight ? '100px' : '0px'}),
    transparent
  )`};
  -webkit-mask-image: ${props => `linear-gradient(
    to right,
    transparent,
    black ${props.$canScrollLeft ? '100px' : '0px'},
    black calc(100% - ${props.$canScrollRight ? '100px' : '0px'}),
    transparent
  )`};
  transition: -webkit-mask-image 0.1s linear, mask-image 0.1s linear;
`

export const SlideButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'left' ? 'left: -10px' : 'right: -10px'};
  transform: translateY(-50%);
  background: #37323a;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    opacity: 1;
    background: #2e2930;
  }

  img {
    width: 20px;
    height: 20px;
  }
`

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 1200px) {
    gap: 10px;
  }
`
