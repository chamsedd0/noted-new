"use client";

import Image from "next/image";
import styled from "styled-components";
import AuthComponent from "./authContainer";
import Footer from "../components/preLoginFooter";
import logo from "@/public/logo.svg";
import { signInWithGoogle } from "@/lib/firebase";
import { auth } from "@/lib/firebase";
import { isNewUserAction } from "./_actions/isNewUserAction";

const Box = styled.div`
  background-color: #383838;
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
    gap: 100px;
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
      const idToken = await signInWithGoogle();
      await isNewUserAction(
        {
          uid: auth.currentUser!.uid,
          name: auth.currentUser!.displayName ?? "",
          email: auth.currentUser!.email ?? "",
          photoUrl: auth.currentUser!.photoURL ?? "",
        },
        idToken
      );
    } catch (error) {
      console.error(error);
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
