'use client'
import styled from 'styled-components'

export const NotificationsContainer = styled.div`
  margin-top: 110px;
  margin-bottom: 40px;
  display: flex;
  width: 80%;
  background-color: transparent;
  color: white;
  border-radius: 16px;

  
  @media (max-width: 1600px) {
    width: 77%;
  }

  @media (max-width: 1400px) {
    width: 73%;
  }

  @media (max-width: 1300px) {
    width: 74%;
  }

  @media (max-width: 1100px) {
    width: 100%;
  }
`

export const MainContent = styled.div<{ isSidebarCollapsed: boolean }>`
  flex: 1;
  margin-right: 40px;
  margin-left: ${props => props.isSidebarCollapsed ? '160px' : '350px'};
  transition: margin-left 0.3s ease;
  
  .notifications-container {
    background-color: #36303A;
    border-radius: 16px;
    padding: 10px 30px;
    min-height: 590px;
    max-height: 600px;
    overflow-y: scroll;
  }
`

export const NotificationContainer = styled.div`

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
  padding: 20px 0px;
  border-bottom: 0.5px solid #3a3a3a;

  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  } 

  .notification-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    gap: 20px;
  }

`



export const NotificationText = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;



  strong {
    font-size: 16px;
    font-weight: 600;
  }

  span {
    font-size: 14px;
    font-weight: 400;
  } 
`

export const TimeStamp = styled.div`

  font-size: 12px;
  font-weight: 400;
  color: #808080;

`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  
  h1 {
    font-size: 16px;
    font-weight: 600;
  }
`

export const ControlButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 30px;
`   
export const Button = styled.button`
  border: none;
  cursor: pointer;
  background: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 10;

  img {
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
`

export const SortButton = styled.button`
  background: #36303A;
  color: white;
  border: none;
  padding: 8px 20px;
  width: 200px;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 300;
` 