'use client'
import styled from 'styled-components'

export const DropdownContainer = styled.div`
  position: relative;
`

export const DropdownButton = styled.button`
  background: #36303A;
  border: none;
  padding: 10px 20px;
  border-radius: 100px;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  min-width: 150px;

  img {
    width: 12px;
    height: 12px;
  }
`

export const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 5px;
  background: #36303A;
  border-radius: 12px;
  overflow: hidden;
  z-index: 10;
`

export const DropdownItem = styled.div`
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #413B44;
  }
` 