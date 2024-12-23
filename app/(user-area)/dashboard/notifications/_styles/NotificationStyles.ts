'use client'
import styled from 'styled-components'

export const NotificationsContainer = styled.div`
  margin-top: 70px;
  display: flex;
  min-height: 100vh;
  max-width: 80%;
  background-color: transparent;
  color: white;

  @media (max-width: 1100px) {
    max-width: 100%;
  }
`

export const MainContent = styled.div<{ isSidebarCollapsed: boolean }>`
  flex: 1;
  padding: 40px;
  margin-left: ${props => props.isSidebarCollapsed ? '120px' : '290px'};
  transition: margin-left 0.3s ease;
`

export const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #3a3a3a;
  gap: 15px;
`

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

export const BookmarkButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 20px;
`

export const NotificationText = styled.div`
  display: flex;
  gap: 10px;
  
  strong {
    color: white;
  }
  
  span {
    color: #a0a0a0;
  }
`

export const TimeStamp = styled.div`
  color: #a0a0a0;
  font-size: 0.9em;
  text-align: right;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  
  h1 {
    font-size: 24px;
    font-weight: 600;
  }
`

export const SortButton = styled.button`
  background: #3a3a3a;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
` 