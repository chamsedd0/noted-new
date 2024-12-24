'use client'
import { 
  DropdownContainer,
  DropdownButton,
  DropdownContent,
  DropdownItem 
} from './_styles/sortDropdown'
import { useState } from 'react'

interface SortDropdownProps {
  onSort: (value: string) => void
}

export default function SortDropdown({ onSort }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('Date')

  const handleSelect = (value: string) => {
    setSelected(value)
    onSort(value)
    setIsOpen(false)
  }

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        <span>Sort by: {selected}</span>
        <img 
          src="/vector.svg" 
          alt="toggle" 
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.3s ease'
          }} 
        />
      </DropdownButton>

      {isOpen && (
        <DropdownContent>
          <DropdownItem onClick={() => handleSelect('Date')}>Date</DropdownItem>
          <DropdownItem onClick={() => handleSelect('Title')}>Title</DropdownItem>
          <DropdownItem onClick={() => handleSelect('Last Modified')}>Last Modified</DropdownItem>
        </DropdownContent>
      )}
    </DropdownContainer>
  )
} 