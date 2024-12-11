"use client";

import { useState } from "react";
import SearchBarComponent from "@/app/components/inputs/searchBar";
import Link from "next/link";
import LogoutModal from "@/app/components/popups/logOutPopUp";
import { useRouter } from "next/navigation";
import { signOutUser } from "@/app/lib/firebase";
import Image from "next/image";
import {
  HeaderContainer,
  Logo,
  NavItems,
  UserProfile,
  DropdownMenu,
} from "./styles";
import globalStore from "@/app/(user-area)/_store";

interface HeaderProps {
  hightlighted: "profile" | "coursenotes" | "scheduler";
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
  };

  return (
    <HeaderContainer>
      <Logo>
        <Image src="/logo.svg" width={100} height={30} alt="logo" />
      </Logo>
      <SearchBarComponent />
      <NavItems
        $hightlightCourse={hightlighted === "coursenotes"}
        $hightlightSchedule={hightlighted === "scheduler"}
      >
        <span className="courses">
          <Link href="/dashboard" prefetch={true}>
            Course Notes
          </Link>
        </span>
        <span className="scheduler">
          <Link href="/scheduler" prefetch={true}>
            Scheduler
          </Link>
        </span>
        <span className="notification">
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

        <DropdownMenu $isOpen={isDropdownOpen}>
          <Link href="/profile">
            <Image src="/profile.svg" width={24} height={24} alt="profile" />
            Profile
          </Link>

          <Link href="/settings">
            <Image src="/settings.svg" width={24} height={24} alt="settings" />
            Preferences
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
