'use client'
import styled from 'styled-components'

export const SidebarWrapper = styled.div`
  position: fixed;
  left: 20px;
  top: 70px;
  width: 290px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const SidebarHeader = styled.div<{ isCollapsed: boolean }>`
  display: flex;
  justify-content: ${props => props.isCollapsed ? 'center' : 'space-between'};
  align-items: center;
  background-color: #36303A;
  border-radius: 16px;
  padding: 10px 10px;
  width: ${props => props.isCollapsed ? '80px' : '100%'};
  transition: width 0.3s ease;

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin-left: 10px;
    opacity: ${props => props.isCollapsed ? 0 : 1};
    transition: opacity 0.2s ease;
    white-space: nowrap;
    overflow: hidden;
    display: ${props => props.isCollapsed ? 'none' : 'block'};
    
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

export const SidebarContainer = styled.div<{ isCollapsed: boolean }>`
  background-color: #36303A;
  border-radius: 16px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
  color: white;
  width: ${props => props.isCollapsed ? '80px' : '100%'};
  transition: width 0.3s ease;
  
  h3 {
    margin: 8px 15px;
    font-weight: 600;
    color: white;
    font-size: 16px;
    opacity: ${props => props.isCollapsed ? 0 : 1};
    transition: opacity 0.2s ease;

  }

  img {
    align-self: center;
    justify-self: center;
  }
`

export const SidebarItem = styled.div<{ active?: boolean; isCollapsed?: boolean }>`
  display: flex;
  transition: background-color 0.2s ease;
  align-items: center;
  justify-content: ${props => props.isCollapsed ? 'center' : 'start'};
  min-width: 100%;
  min-height: 60px;
  gap: 20px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 12px;
  margin: 0.5px 0;
  background-color: ${props => props.active ? '#413B44' : 'transparent'};
  
  &:hover {
    background-color: #413B44;
  }

  img {
    align-self: center;
    justify-self: center;
  }


  p {
    opacity: ${props => props.isCollapsed ? 0 : 1};
    transition: opacity 0.2s ease;
    white-space: nowrap;
    overflow: hidden;
    display: ${props => props.isCollapsed ? 'none' : 'block'};
  }
` 