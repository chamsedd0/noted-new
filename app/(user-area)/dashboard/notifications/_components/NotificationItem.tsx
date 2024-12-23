'use client'
import { Checkbox, BookmarkButton, TimeStamp, NotificationText, NotificationContainer } from '../_styles/NotificationStyles'

interface NotificationItemProps {
  course: string
  message: string
  date: string
  time: string
}

export default function NotificationItem({ course, message, date, time }: NotificationItemProps) {
  return (
    <NotificationContainer>
      <Checkbox type="checkbox" />
      <BookmarkButton>
        <span className="bookmark-icon">🔖</span>
      </BookmarkButton>
      <div>
        <NotificationText>
          <strong>{course}</strong>
          <span>{message}</span>
        </NotificationText>
        <TimeStamp>{`${date} ${time}`}</TimeStamp>
      </div>
    </NotificationContainer>
  )
} 