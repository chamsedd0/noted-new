'use client'
import { TimeStamp, NotificationText, NotificationContainer } from '../_styles/NotificationStyles'

interface NotificationItemProps {
  course: string
  message: string
  date: string
  time: string
}

export default function NotificationItem({ course, message, date, time }: NotificationItemProps) {
  return (
    <NotificationContainer>
        <img src="/emptyCheckbox.svg" alt="Important" />
        <img src="/emptyImportant.svg" alt="Important" />
      <div className='notification-text'>
        <NotificationText>
          <strong>{course}</strong>
          <span>{message}</span>
        </NotificationText>
        <TimeStamp>{`${time}`}</TimeStamp>
      </div>
    </NotificationContainer>
  )
} 