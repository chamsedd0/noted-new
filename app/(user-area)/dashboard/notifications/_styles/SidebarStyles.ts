'use client'
import styled from 'styled-components'

export const SidebarWrapper = styled.div`
  position: absolute;
  left: 40px;
  top: 120px;
  width: 290px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #36303A;
  border-radius: 16px;
  padding: 10px 10px;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  h2 {
    font-size: 16px;
    font-weight: 600;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    
  }
`

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 12px;
  width: 80px;
  height: 60px;

  &:hover {
    background: #413B44;
  }
`

export const SidebarContainer = styled.div`
  background-color: #36303A;
  border-radius: 16px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
  color: white;
  transition: all 0.3s ease;
  
  
  h3 {
    margin: 8px 15px;
    font-weight: 600;
    color: white;
    font-size: 16px;
  }

  img {
    align-self: center;
    justify-self: center;
  }
`

export const SidebarItem = styled.div<{ active?: boolean; isCollapsed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.isCollapsed ? 'center' : 'start'};
  min-height: 60px;
  min-width: 100%;
  gap: 20px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 12px;
  margin: 0.5px 0;
  background-color: ${props => props.active ? '#413B44' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #413B44;
  }

  img {
    align-self: center;
    justify-self: center;
  }

  p {
    font-size: 16px;
    opacity: ${props => props.isCollapsed ? 0 : 1};
    transform: ${props => props.isCollapsed ? 'translateX(-20px)' : 'translateX(0)'};
    transition: opacity 0.3s ease, transform 0.3s ease;
    white-space: nowrap;
    overflow: hidden;
    pointer-events: ${props => props.isCollapsed ? 'none' : 'auto'};
    position: ${props => props.isCollapsed ? 'absolute' : 'relative'};
  }
`