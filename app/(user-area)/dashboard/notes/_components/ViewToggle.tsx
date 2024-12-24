'use client'
import { ToggleButton } from './_styles/viewToggle'

interface ViewToggleProps {
  isGrid: boolean
  onToggle: () => void
}

export default function ViewToggle({ isGrid, onToggle }: ViewToggleProps) {
  return (
    <ToggleButton onClick={onToggle}>
      <img 
        src={isGrid ? "/listView.svg" : "/gridView.svg"} 
        alt={isGrid ? "List view" : "Grid view"} 
      />
    </ToggleButton>
  )
} 