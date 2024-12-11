"use client";
import Header from "@/app/components/header";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import LogoutModal from "@/app/components/popups/logOutPopUp";
import InputComponent from "@/app/components/inputs/input";
import SaveButtonComponent from "@/app/components/buttons/saveButton";
import ChangePlanButtonComponent from "@/app/components/buttons/changePlanButton";
import PlanDashboardCard from "@/app/components/cards/dashboardPlanCard";
import ContactButtonComponent from "@/app/components/buttons/contactButton";
import SelectDateComponent from "@/app/components/inputs/smallSelect";
import SideBarComponent from "@/app/components/sidebar";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { Plan } from "@/types/User";
import {
  BoxReplacement,
  ContentWrapper,
  ProfileSidebar,
  RightBoxReplacement,
  Section,
  ProfilePicture,
  InputsContainer,
  Button,
  CoursesLayout,
} from "./_styles";
import globalStore from "../_store";

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
  const { user, updateUserData } = globalStore();
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

  useEffect(() => {
    const setData = async () => {
      setState((prev) => ({
        ...prev,
        firstName: user?.name.split(" ")[0] || "",
        lastName: user?.name.split(" ")[1] || "",
        email: user?.email || "",
        chosenPlan: (user?.plan as Plan) || "",
        day: user?.birthDate ? parseInt(user?.birthDate.split("-")[2]) : null,
        month: user?.birthDate ? parseInt(user?.birthDate.split("-")[1]) : null,
        year: user?.birthDate ? parseInt(user?.birthDate.split("-")[0]) : null,
        profilePicture: user?.photoUrl || null,
        loading: false,
      }));
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

    setData();

    return () => {
      sections.forEach((section) => {
        if (section.ref.current) {
          observer.unobserve(section.ref.current);
        }
      });
    };
  }, [user]);

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

    if (!state.firstName.trim() || !state.lastName.trim()) {
      alert("Name fields cannot be empty");
      return;
    }

    if (!state.email.trim()) {
      alert("Email is required");
      return;
    }

    try {
      await updateUserData({
        name: `${state.firstName} ${state.lastName}`,
        email: state.email,
        birthDate: `${state.year}-${state.month}-${state.day}`,
      });
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
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
