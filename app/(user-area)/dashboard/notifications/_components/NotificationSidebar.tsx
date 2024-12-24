'use client'
import { 
  SidebarWrapper,
  SidebarHeader, 
  ToggleButton, 
  SidebarContainer, 
  SidebarItem 
} from '../_styles/SidebarStyles'

interface NotificationSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

export default function NotificationSidebar({ isCollapsed, setIsCollapsed }: NotificationSidebarProps) {
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <SidebarWrapper>
        <h1>Inbox</h1>
      <SidebarHeader isCollapsed={isCollapsed}>
        <h2>Notifications</h2>
        <ToggleButton onClick={toggleSidebar}>
          <img 
            src={isCollapsed ? "/burger.svg" : "/close.svg"} 
            alt={isCollapsed ? "Menu" : "Close"}
            style={!isCollapsed ? {width: '20px', height: '20px'} : undefined}
          />
        </ToggleButton>
      </SidebarHeader>

      <SidebarContainer isCollapsed={isCollapsed}>
        <SidebarItem active isCollapsed={isCollapsed}>
          <img src="/inbox.svg" alt="Inbox" />
          <p>Inbox</p>
        </SidebarItem>

        <SidebarItem isCollapsed={isCollapsed}>
            <img src="/icon3.svg" alt="Important" />
          <p>Important</p>
        </SidebarItem>
        <SidebarItem isCollapsed={isCollapsed}>
            <img src="/icon2.svg" alt="Snoozed" />
          <p>Snoozed</p>
        </SidebarItem>
        <SidebarItem isCollapsed={isCollapsed}>
          <img src="/deleteInbox.svg" alt="Trash" />
          <p>Trash</p>
        </SidebarItem>
        
        {isCollapsed ? <img style={{margin: '10px 0'}} src="/eventLine.svg" alt="New Events" /> : <h3>Events</h3>}

        <SidebarItem isCollapsed={isCollapsed}>
          <img src="/newEvent.svg" alt="New Events" />
          <p>New Events</p>
        </SidebarItem>
        <SidebarItem isCollapsed={isCollapsed}>
          <img src="/icon5.svg" alt="Checked" />
          <p>Checked</p>
        </SidebarItem>

        <SidebarItem isCollapsed={isCollapsed}>
          <img src="/icon1.svg" alt="Cancelled" />
          <p>Cancelled</p>
        </SidebarItem>

      </SidebarContainer>
    </SidebarWrapper>
  )
} 