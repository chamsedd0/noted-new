"use client";

import { useState } from "react";
import SearchBarComponent from "@/app/components/inputs/searchBar";
import Link from "next/link";
import LogoutModal from "@/app/components/popups/logOutPopUp";
import { useRouter } from "next/navigation";
import { signOutUser } from "@/app/lib/firebase";
import Image from "next/image";
import NotificationCardComponent from "../cards/notificationCard";
import {
  HeaderContainer,
  Logo,
  NavItems,
  UserProfile,
  DropdownNotifications,
  SeparationLine,
  DropdownMenu,
} from "./styles";
import globalStore from "@/app/(user-area)/_store";

interface HeaderProps {
  hightlighted: "profile" | "dashboard" | "scheduler" | "notifications";
}



interface UserProfile {
  name: string;
  photoUrl: string;
}

const Header = ({ hightlighted }: HeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { user } = globalStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] = useState(false);

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
      router.prefetch("/");
      router.replace("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsNotificationsDropdownOpen(false);
  };

  const toggleNotificationsDropdown = () => {
    setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen);
    setIsDropdownOpen(false);
  };

  return (
    <HeaderContainer>
      <Logo>
        <Image src="/logo.svg" width={100} height={30} alt="logo" />
      </Logo>
      <SearchBarComponent />
      <NavItems
        $hightlightCourse={hightlighted === "dashboard"}
        $hightlightSchedule={hightlighted === "scheduler"}
        $hightlightNotifications={hightlighted === "notifications"}
        
      >

        <span className="grades">
          <Link href="/dashboard/grades" prefetch={true}>
            Grades
          </Link>
        </span>
        <span className="courses">
          <Link href="/dashboard" prefetch={true}>
            Courses
          </Link>
        </span>
        <span className="scheduler">
          <Link href="/scheduler" prefetch={true}>
            Scheduler
          </Link>
        </span>
        <span className="notification" onClick={toggleNotificationsDropdown}>
          <Image
            src="/notifications.svg"
            alt="Notifications"
            width={24}
            height={24}
          />
        </span>

        {/* UserProfile Section */}
        <UserProfile onClick={toggleDropdown}>
          {user?.name}
          <Image
            src={"/defaultProfile.png"}
            alt="User profile"
            width={40}
            height={40}
          />
        </UserProfile>

        <DropdownNotifications $isOpen={isNotificationsDropdownOpen}>

            <h2>Notifications</h2>
          
            {
              notifications.map((notification) => (
                <div style={{width: "100%"}}>
                  <NotificationCardComponent title={notification.title} message={notification.message} timestamp={notification.timestamp} />
                  <SeparationLine />

                </div>
              ))
            }
         

          <Link href="/dashboard/notifications" onClick={toggleNotificationsDropdown}>See all notifications</Link>
        </DropdownNotifications>

        <DropdownMenu $isOpen={isDropdownOpen}>
          <Link href="/profile">
            <Image src="/profile.svg" width={24} height={24} alt="profile" />
            Profile
          </Link>


          <button
            onClick={() => {
              setModalOpen(true);
              setIsDropdownOpen(false);
            }}
          >
            <Image src="/logout.svg" width={24} height={24} alt="logout" />
            Log Out
          </button>
        </DropdownMenu>

        <LogoutModal
          isOpen={isModalOpen}
          onCancel={setModalOpen}
          onConfirm={handleLogout}
        />
      </NavItems>
    </HeaderContainer>
  );
};

export default Header;
