"use client";

import Image from "next/image";
import styled from "styled-components";
import AuthComponent from "./authContainer";
import Footer from "../components/preLoginFooter";
import logo from "@/public/logo.svg";
import { signInWithGoogle, signOutUser } from "@/app/lib/firebase";
import { auth } from "@/app/lib/firebase";
import { isNewUserAction } from "./_actions/isNewUserAction";

const Box = styled.div`
  background: linear-gradient(90deg, #8453C9, #4790AF);
  width: 100vw;
  height: 100vh;
  padding: 50px;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;

  #logo {
    width: 240px;
  }

  .upper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
  }

  @media (max-width: 1470px) {
    .upper {
      gap: 30px;
    }
  }
`;

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();

      if (!auth.currentUser) throw new Error("No user found");

      const userData = {
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName ?? "",
        email: auth.currentUser.email ?? "",
        photoUrl: auth.currentUser.photoURL ?? "",
      };

      await isNewUserAction(userData);
      await signOutUser();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Box>
      <div className="upper">
        <Image id="logo" src={logo} alt="logo" />
        <AuthComponent googleAuth={handleGoogleLogin} appleAuth={console.log} />
      </div>
      <Footer />
    </Box>
  );
}
