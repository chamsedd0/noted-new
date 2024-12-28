'use client'
import { motion, AnimatePresence } from 'framer-motion'
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

  const sidebarVariants = {
    expanded: { width: '100%' },
    collapsed: { width: '80px' },
  }

  const textVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -30 }
  }

  return (
    <SidebarWrapper>
      <h1>Inbox</h1>
      <motion.div
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          width: '100%',

        }}
      >
        <SidebarHeader>
          <motion.h2
            variants={textVariants}
            animate={isCollapsed ? 'collapsed' : 'expanded'}
            transition={{ duration: 0.3 }}
            style={{
              position: isCollapsed ? 'absolute' : 'relative',
              pointerEvents: isCollapsed ? 'none' : 'auto'
            }}
          >
            Notifications
          </motion.h2>
          <ToggleButton onClick={toggleSidebar}>
            <img 
              src={isCollapsed ? "/burger.svg" : "/close.svg"} 
              alt={isCollapsed ? "Menu" : "Close"}
              style={!isCollapsed ? {width: '20px', height: '20px'} : undefined}
            />
          </ToggleButton>
        </SidebarHeader>

        <SidebarContainer>
          <AnimatePresence mode="wait">
            <motion.div
              key={isCollapsed ? 'collapsed' : 'expanded'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                alignItems: isCollapsed ? 'center' : 'flex-start'
              }}
            >
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

            </motion.div>
          </AnimatePresence>
        </SidebarContainer>
      </motion.div>
    </SidebarWrapper>
  )
}