"use client";

import { useState } from "react";
import SearchBarComponent from "@/app/components/inputs/searchBar";
import Link from "next/link";
import LogoutModal from "@/app/components/popups/logOutPopUp";
import Image from "next/image";
import NotificationCardComponent from "../cards/notificationCard";
import {
  HeaderContainer,
  Logo,
  MobileMenuButton,
  MobileMenu,
  MobileMenuContent,
  DropdownNotifications,
  SeparationLine,
  UserProfile,
  MobileNavItems,
  NavItems,
  DropdownMenu,
  NotificationIndicator,
  NotificationWrapper,
} from "./styles";
import globalStore from "@/app/(user-area)/_store";
import { signOutUser } from "@/app/lib/firebase";

interface HeaderProps {
  hightlighted: "profile" | "dashboard" | "scheduler" | "notifications";
}

interface UserProfile {
  name: string;
  photoUrl: string;
}

const Header = ({ hightlighted }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = globalStore();
  const [isModalOpen, setModalOpen] = useState(false);

  const notifications = [
    {
      title: "Notification 1",
      message: "This is a notification",
      timestamp: "2024-01-01",
    },
    {
      title: "Notification 2",
      message: "This is a notification",
      timestamp: "2024-01-01",
    },
    {
      title: "Notification 3",
      message: "This is a notification",
      timestamp: "2024-01-01",
    },
  ];  

  const handleLogout = async () => {
    setModalOpen(false);
    try {
      await signOutUser();
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsNotificationsDropdownOpen(false);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('mobile-overlay')) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsNotificationsDropdownOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <HeaderContainer>
      <Logo>
        <Image src="/logo.svg" width={100} height={30} alt="logo" />
      </Logo>

      <div className="search-section">
        <SearchBarComponent />
      </div>

      {/* Desktop Navigation */}
      <div className="desktop-nav">
        <NavItems
          $hightlightCourse={hightlighted === "dashboard"}
          $hightlightSchedule={hightlighted === "scheduler"}
          $hightlightNotifications={hightlighted === "notifications"}
        >
          <span className="grades">
            <Link href="/dashboard/grades">Grades</Link>
          </span>
          <span className="courses">
            <Link href="/dashboard">Courses</Link>
          </span>
          <span className="scheduler">
            <Link href="/scheduler">Scheduler</Link>
          </span>
          <NotificationWrapper className="notification" onClick={() => setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen)}>
            <Image src="/notifications.svg" alt="Notifications" width={24} height={24} />
            {notifications.length > 0 && <NotificationIndicator />}
          </NotificationWrapper>
          <UserProfile onClick={toggleDropdown}>
            {user?.name}
            <Image src={"/defaultProfile.png"} alt="User profile" width={40} height={40} />
          </UserProfile>
        </NavItems>

        <DropdownMenu $isOpen={isDropdownOpen}>
          <Link href="/profile">
            <Image src="/profile.svg" width={24} height={24} alt="profile" />
            Profile
          </Link>
          <button onClick={() => setModalOpen(true)}>
            <Image src="/logout.svg" width={24} height={24} alt="logout" />
            Log Out
          </button>
        </DropdownMenu>
      </div>

      {/* Mobile Controls */}
      <div className="mobile-controls">
        <NotificationWrapper className="notification" onClick={() => setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen)}>
          <Image src="/notifications.svg" alt="Notifications" width={24} height={24} />
          {notifications.length > 0 && <NotificationIndicator />}
        </NotificationWrapper>
        <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)}>
          <img src="/burger.svg" alt="Menu" />
        </MobileMenuButton>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        $isOpen={isMobileMenuOpen} 
        className="mobile-overlay"
        onClick={handleClickOutside}
      >
        <MobileMenuContent $isOpen={isMobileMenuOpen}>
          <div className="menu-header">
            <h2>Menu</h2>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <img src="/close.svg" alt="Close" style={{ width: '20px', height: '20px' }} />
            </button>
          </div>

          <div className="search-container">
            <SearchBarComponent />
          </div>

          <MobileNavItems>
            <Link href="/dashboard/grades" onClick={handleLinkClick}>
              <img src="/grades.svg" alt="Grades" />
              Grades
            </Link>
            <Link href="/dashboard" onClick={handleLinkClick}>
              <img src="/courses.svg" alt="Courses" />
              Courses
            </Link>
            <Link href="/scheduler" onClick={handleLinkClick}>
              <img src="/schedule.svg" alt="Scheduler" />
              Scheduler
            </Link>
            <Link href="/dashboard/notifications" onClick={handleLinkClick}>
              <NotificationWrapper>
                <img src="/notifications.svg" alt="Notifications" />
                {notifications.length > 0 && <NotificationIndicator />}
              </NotificationWrapper>
              Notifications
            </Link>
            <Link href="/profile" onClick={handleLinkClick}>
              <img src="/profile.svg" alt="Profile" />
              Profile
            </Link>
          </MobileNavItems>

          <div className="profile-section">
            <UserProfile>
              {user?.name}
              <Image src={"/defaultProfile.png"} alt="User profile" width={40} height={40} />
            </UserProfile>

            <button 
              className="logout-button"
              onClick={() => setModalOpen(true)}
            >
              <Image src="/logout.svg" width={24} height={24} alt="logout" />
              Log Out
            </button>
          </div>
        </MobileMenuContent>
      </MobileMenu>

      <DropdownNotifications $isOpen={isNotificationsDropdownOpen}>
        <h2>Notifications</h2>
        {notifications.map((notification, index) => (
          <div key={index} style={{width: "100%"}}>
            <NotificationCardComponent {...notification} />
            <SeparationLine />
          </div>
        ))}
        <Link href="/dashboard/notifications" onClick={() => setIsNotificationsDropdownOpen(false)}>
          See all notifications
        </Link>
      </DropdownNotifications>

      <LogoutModal
        isOpen={isModalOpen}
        onCancel={setModalOpen}
        onConfirm={handleLogout}
      />
    </HeaderContainer>
  );
};

export default Header;
