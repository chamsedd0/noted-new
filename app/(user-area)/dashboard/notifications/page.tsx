'use client'
import { useState } from 'react'
import NotificationItem from './_components/NotificationItem'
import NotificationSidebar from './_components/NotificationSidebar'
import { 
  NotificationsContainer, 
  MainContent, 
  Header, 
  SortButton 
} from './_styles/NotificationStyles'
import { RightBoxReplacement } from '../_styles'

export default function NotificationsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const notifications = [
    {
      course: "Data Structures and Algorithms",
      message: "You have a quiz on 21/10/2024 for Data Structures and Algorithms",
      date: "21/10/2024",
      time: "22:10"
    },
    // Add more notifications as needed
  ]

  return (
    <NotificationsContainer>
      <NotificationSidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <MainContent isSidebarCollapsed={isSidebarCollapsed}>
        <Header>
          <h1>InBox</h1>
          <SortButton>
            Sort by: Date 
          </SortButton>
        </Header>
        {notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            course={notification.course}
            message={notification.message}
            date={notification.date}
            time={notification.time}
          />
        ))}
        <RightBoxReplacement></RightBoxReplacement>
      </MainContent>
      
    </NotificationsContainer>
  )
}