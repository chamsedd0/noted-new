"use client";

import styled from "styled-components";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import LogoutModal from "@/app/components/popups/logOutPopUp";
import InputComponent from "@/app/components/inputs/input";
import SaveButtonComponent from "@/app/components/buttons/saveButton";
import ChangePlanButtonComponent from "@/app/components/buttons/changePlanButton";
import PlanDashboardCard from "@/app/components/cards/dashboardPlanCard";
import ContactButtonComponent from "@/app/components/buttons/contactButton";
import SelectDateComponent from "@/app/components/inputs/smallSelect";
import SideBarComponent from "../components/sidebar/sideBar";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import {
  getUserProfile,
  updateProfileAction,
} from "@/app/profile/_actions/updateProfileAction";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Header from "@/app/dashboard/header";
import { Plan } from "@/types/User";
import Loading from "@/app/components/loading";

const CoursesLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #383838;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding: 40px;
  flex: 1;
  margin-top: 70px;

  @media (max-width: 900px) {
    gap: 20px;
  }
`;

const BoxReplacement = styled.div`
  flex: 1;
  min-width: 445px;

  @media (max-width: 1470px) {
    min-width: 360px;
  }

  @media (max-width: 1200px) {
    min-width: 300px;
  }

  @media (max-width: 1020px) {
    min-width: 170px;
  }

  @media (max-width: 900px) {
    min-width: 80px;
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const ProfileSidebar = styled.div`
  position: fixed;
  width: 445px;
  max-height: 400px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  background-color: #444444;
  color: white;
  padding: 20px;

  @media (max-width: 1470px) {
    width: 360px;
  }

  @media (max-width: 1200px) {
    width: 300px;
  }

  @media (max-width: 1020px) {
    width: 170px;
  }

  @media (max-width: 900px) {
    width: 80px;
    gap: 10px;
    left: 20px;
  }

  @media (max-width: 700px) {
    right: 20px;
    left: auto;
  }

  h2 {
    align-self: start;
    margin-bottom: 20px;

    @media (max-width: 1100px) {
      display: none;
    }
  }

  #logout {
    color: #fe8686;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const Button = styled.button<ButtonProps>`
  background: ${({ active }) => (active ? "#545454" : "transparent")};
  width: 100%;
  height: 60px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 16px;
  justify-content: start;
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  overflow: hidden;

  @media (max-width: 1020px) {
    padding: 0px;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 900px) {
    width: 60px;
  }

  span {
    @media (max-width: 1020px) {
      display: none;
    }
  }

  &:hover {
    background: #545454;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 20px;

  @media (max-width: 700px) {
    max-width: 80%;
  }

  h2 {
    color: #fff;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 16px;

    @media (max-width: 700px) {
      font-size: 28px;
    }
  }

  p {
    font-size: 16px;
    color: white;
    max-width: 588px;

    @media (max-width: 700px) {
      font-size: 14px;
      max-width: 350px;
    }

    b {
      font-size: 24px;
    }
  }

  button {
    margin-top: 20px;
  }

  .outlook {
    margin-top: 10px;
    color: white;
    height: 48px;
    padding: 0rem 2rem;
    background-color: #127cd6;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    gap: 10px;
    font-size: 14px;
    font-weight: 600;

    img {
      width: 24px;
    }

    &:hover {
      background-color: #126ebc;
    }
  }
`;

const ProfilePicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 30px;

  img {
    border-radius: 100%;
    width: 150px;

    @media (max-width: 700px) {
      width: 75px;
    }
  }

  span {
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 20px;
    color: white;
    cursor: pointer;

    @media (max-width: 700px) {
      font-size: 14px;
    }

    img {
      width: 24px;
      border-radius: 0px;
    }
  }
`;

const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two equal columns */
  gap: 20px; /* Space between form items */
  max-width: 600px;
  width: 100%;
  margin-top: 16px;

  @media (max-width: 700px) {
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
  }
`;

const RightBoxReplacement = styled.div`
  @media (max-width: 1400px) {
    display: none;
  }
`;

interface ProfileState {
  firstName: string;
  lastName: string;
  email: string;
  day: number | null;
  month: number | null;
  year: number | null;
  profilePicture: string | null;
  chosenPlan: Plan | null;
  loading: boolean;
}

interface SectionRef {
  ref: React.RefObject<HTMLElement>;
  id: string;
}

export default function ProfilePage() {
  const { idToken, loading } = useAuth();
  const router = useRouter();

  const [state, setState] = useState<ProfileState>({
    firstName: "",
    lastName: "",
    email: "",
    day: null,
    month: null,
    year: null,
    profilePicture: null,
    chosenPlan: null,
    loading: true,
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const profileRef = useRef<HTMLElement>(null);
  const subscriptionRef = useRef<HTMLElement>(null);
  const supportRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (loading) return;

      if (!idToken) {
        router.replace("/login");
        return;
      }

      try {
        const { success, data, error } = await getUserProfile(idToken);
        if (success && data) {
          const [firstName, lastName] = data.name?.split(" ") ?? ["", ""];
          const [year, month, day] = data.birthDate?.split("-").map(Number) ?? [
            null,
            null,
            null,
          ];

          setState((prev) => ({
            ...prev,
            firstName,
            lastName,
            email: data.email,
            profilePicture: data.photoUrl,
            chosenPlan: data.plan as Plan,
            day,
            month,
            year,
          }));
        } else {
          alert(error || "Failed to load profile data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load profile data");
      }

      // Set loading to false after minimum 0.5s
      setTimeout(() => setIsLoading(false), 500);
    };

    // Set up intersection observer
    const sections: SectionRef[] = [
      { ref: profileRef, id: "profile" },
      { ref: subscriptionRef, id: "subscription" },
      { ref: supportRef, id: "support" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) {
              setActiveSection(id);
            }
          }
        });
      },
      { threshold: 1 }
    );

    sections.forEach((section) => {
      if (section.ref.current) {
        section.ref.current.id = section.id;
        observer.observe(section.ref.current);
      }
    });

    fetchData();

    return () => {
      sections.forEach((section) => {
        if (section.ref.current) {
          observer.unobserve(section.ref.current);
        }
      });
    };
  }, [idToken, loading, router]);

  const handleLogout = async () => {
    setModalOpen(false);
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idToken) return;

    if (!state.firstName.trim() || !state.lastName.trim()) {
      alert("Name fields cannot be empty");
      return;
    }

    if (!state.email.trim()) {
      alert("Email is required");
      return;
    }

    const { success, error } = await updateProfileAction(idToken, {
      name: `${state.firstName} ${state.lastName}`.trim(),
      email: state.email.trim(),
      birthDate:
        state.year && state.month && state.day
          ? `${state.year}-${state.month}-${state.day}`
          : undefined,
    });

    if (success) {
      alert("Profile updated successfully");
    } else {
      alert(error || "Failed to update profile");
    }
  };

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <CoursesLayout>
        <Header hightlighted="profile" />

        <ContentWrapper>
          {/* Left Sidebar */}
          <BoxReplacement></BoxReplacement>
          <ProfileSidebar>
            <h2>Navigation</h2>
            <Button
              active={activeSection === "profile"}
              onClick={() => scrollToSection(profileRef)}
            >
              <img src="/profileIcon.svg"></img>
              <span>Manage Profile</span>
            </Button>
            <Button
              active={activeSection === "subscription"}
              onClick={() => scrollToSection(subscriptionRef)}
            >
              <img src="/subs.svg"></img>
              <span>Manage Subscription</span>
            </Button>
            <Button
              active={activeSection === "support"}
              onClick={() => scrollToSection(supportRef)}
            >
              <img src="/support.svg"></img>
              <span>Contact Support</span>
            </Button>
            <Button id="logout" onClick={() => setModalOpen(true)}>
              <img src="/logout.svg"></img>
              <span>Log Out</span>
            </Button>
          </ProfileSidebar>

          {/* Main Content */}
          <div style={{ flex: 3 }}>
            <Section ref={profileRef}>
              <h2>Your Profile</h2>
              <p>
                Make sure your information is correct. You can change your email
                or name whenever you want.
              </p>
              <ProfilePicture>
                <img src="/defaultProfile.png"></img>
                <span>
                  Choose profile picture<img src="/editCourses.svg"></img>
                </span>
              </ProfilePicture>
              <Link
                className="outlook"
                href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=fee14eef-b619-4b47-b916-6101e89a4d3a&response_type=code&response_mode=query&scope=openid email Mail.Read offline_access"
              >
                <img src="/outlook.svg"></img>Connect Your University Email
              </Link>
              <InputsContainer>
                <InputComponent
                  title="Your name"
                  placeHolder={state.firstName || "your name"}
                  type="text"
                  error={false}
                  value={state.firstName}
                  setVariable={(value) =>
                    setState((prev) => ({ ...prev, firstName: value }))
                  }
                ></InputComponent>
                <InputComponent
                  title="Your surname"
                  placeHolder={state.lastName || "your surname"}
                  type="text"
                  error={false}
                  value={state.lastName}
                  setVariable={(value) =>
                    setState((prev) => ({ ...prev, lastName: value }))
                  }
                ></InputComponent>
                <SelectDateComponent
                  title="Your Birth Date"
                  day={state.day}
                  setDay={(value) =>
                    setState((prev) => ({ ...prev, day: value }))
                  }
                  month={state.month}
                  setMonth={(value) =>
                    setState((prev) => ({ ...prev, month: value }))
                  }
                  setYear={(value) =>
                    setState((prev) => ({ ...prev, year: value }))
                  }
                  year={state.year}
                ></SelectDateComponent>
                <InputComponent
                  title="Your Email"
                  placeHolder={state.email || "your email"}
                  type="email"
                  error={false}
                  value={state.email}
                  setVariable={(value) =>
                    setState((prev) => ({ ...prev, email: value }))
                  }
                ></InputComponent>
              </InputsContainer>
              <SaveButtonComponent event={handleSave} />
            </Section>

            <Section ref={subscriptionRef}>
              <h2>Your Subscription</h2>
              <p>Manage your subscription, upgrade or cancel it here.</p>
              <PlanDashboardCard plan={state.chosenPlan}></PlanDashboardCard>
              <ChangePlanButtonComponent></ChangePlanButtonComponent>
            </Section>

            <Section ref={supportRef}>
              <h2>Contact Support</h2>
              <p>
                If you are facing any problems with the website or the
                application, please, send us an email and we will handle your
                problem as soon as possible.
              </p>
              <p>
                <b>support@noted.ai</b>
              </p>
              <ContactButtonComponent></ContactButtonComponent>
            </Section>
          </div>

          <RightBoxReplacement></RightBoxReplacement>

          <SideBarComponent page={"profile"}></SideBarComponent>

          <LogoutModal
            isOpen={isModalOpen}
            onCancel={setModalOpen}
            onConfirm={handleLogout}
          />
        </ContentWrapper>
      </CoursesLayout>
    </>
  );
}
