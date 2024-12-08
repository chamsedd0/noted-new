"use client";

import styled from "styled-components";
import SearchBarComponent from "../components/inputs/searchBar";
import Link from "next/link";
import LogoutModal from "../components/popups/logOutPopUp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserData } from "./_actions/userActions";
import { useAuth } from "@/app/hooks/useAuth";
import { signOutUser } from "@/lib/firebase";
import Image from "next/image";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  background-color: #383838;
  padding: 15px 40px;
  max-height: 70px;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  position: fixed;
  z-index: 100;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: white;

  Image {
    width: 100px;
    margin-right: 10px;
  }
`;

interface NavItemsProps {
  $hightlightCourse: boolean;
  $hightlightSchedule: boolean;
}

const NavItems = styled.div<NavItemsProps>`
  display: flex;
  align-items: center;
  gap: 60px;
  color: white;

  span {
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: 1;
    }

    Image {
      height: 25px;
    }
  }

  .courses {
    opacity: ${(props) => (props.$hightlightCourse ? 1 : 0.5)};
  }

  .scheduler {
    opacity: ${(props) => (props.$hightlightSchedule ? 1 : 0.5)};
  }

  .notification {
    opacity: 0.5;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  color: white;
  gap: 24px;
  cursor: pointer;

  Image {
    width: 40px;
    height: 40px;
    border-radius: 100px;
  }
`;

interface DropdownMenuProps {
  $isOpen: boolean;
}

const DropdownMenu = styled.div<DropdownMenuProps>`
  position: absolute;
  top: 60px;
  right: 40px;
  background-color: #545454;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  padding: 16px;
  width: 200px;

  z-index: 100;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  transition: all 0.5s ease;

  overflow: hidden;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "all" : "none")};

  a,
  button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    font-size: 16px;
    font-weight: 500;
    color: white;
    text-decoration: none;
    border: none;
    background: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
    transition: all 0.3s ease;
    border-radius: 10px;

    &:hover {
      background-color: #5b5b5b;
    }
  }

  button {
    color: #fe8686;
    font-weight: 600;
  }
`;

interface HeaderProps {
  hightlighted: "profile" | "coursenotes" | "scheduler";
}

interface UserProfile {
  name: string;
  photoUrl: string;
}

const Header = ({ hightlighted }: HeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    photoUrl: "",
  });

  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        const userData = await getUserData(user.uid);
        if (userData) {
          setUserProfile({
            name: userData.name,
            photoUrl: userData.photoUrl || "",
          });
        }
      } else {
        setUserProfile({ name: "", photoUrl: "" });
      }
    };

    if (!loading) {
      fetchUserData();
    }
  }, [user?.uid, loading]);

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

  if (loading) {
    return null; // Or a loading spinner
  }

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
          <Link href="/dashboard/scheduler" prefetch={true}>
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
          {userProfile.name || ""}
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
