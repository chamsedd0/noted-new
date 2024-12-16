"use client";
import Header from "@/app/components/header";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import LogoutModal from "@/app/components/popups/logOutPopUp";
import InputComponent from "@/app/components/inputs/input";
import SaveButtonComponent from "@/app/components/buttons/saveButton";
import ChangePlanButtonComponent from "@/app/components/buttons/changePlanButton";
import SelectDateComponent from "@/app/components/inputs/smallSelect";
import SideBarComponent from "@/app/components/sidebar";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { Plan } from "@/types/User";
import {
  ContentWrapper,
  ErrorMessage,
  RightBoxReplacement,
  Section,    
  Section2,
  ContactSection,
  ProfilePicture,
  InputsContainer,
  PersonalInformationForm,
  SubscriptionSection,
  CancelButton,
  CoursesLayout,
} from "./_styles";
import globalStore from "../_store";
import ContactButtonComponent from "@/app/components/buttons/contactButton";

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
    

    setData();

    
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



  return (
    <>
      <CoursesLayout>
        <Header hightlighted="profile" />

        <h2 className="bigTitle">Your Profile</h2>

        <ContentWrapper>
          
              

              <Section>

              <ProfilePicture>
                <span className="title">Profile Picture</span>
                <img src="/defaultProfile.png"></img>
                <span>
                  Choose profile picture<img src="/editCourses.svg"></img>
                </span>
              </ProfilePicture>

              <PersonalInformationForm>
                <span className="title">Personal Information</span>
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
                <div className="bottomContainer">
                  <ErrorMessage>
                    <img src="/warning.svg"></img>
                    <p>You have unsaved changes!</p>
                  </ErrorMessage>
                  <SaveButtonComponent event={handleSave} />
                </div>
              </PersonalInformationForm>

              
              
            </Section>

            

            <Section2>

               <SubscriptionSection plan={state.chosenPlan}>
                  <span className="title">Your Subscription</span>
                  <span className="plan">{state.chosenPlan}</span>

                  <div className="details">
                    <span>Until: 04/25</span>
                    <span>Next payment: 10.05.2024</span>
                  </div>
                  
                  <div className="bottomContainer">
                    <CancelButton>Cancel Subscription</CancelButton>
                    <ChangePlanButtonComponent></ChangePlanButtonComponent>
                  </div>
                </SubscriptionSection>

                <ContactSection>
                  <span className="title">Contact Support</span>
                  <b className="subtitle">Our Support is here!</b>
                  <span className="message">If you are facing any problems with the website or the application, please, send us an email and we will handle your problem as soon as possible.</span>
                  <div className="info">
                    <span>support@noted.ai</span>
                    <ContactButtonComponent></ContactButtonComponent>
                  </div>
                </ContactSection>
              
            </Section2>

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
