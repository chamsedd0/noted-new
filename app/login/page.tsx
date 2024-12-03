"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import AuthComponent from "./authContainer";
import Footer from "../components/preLoginFooter";
import logo from "@/public/logo.svg";

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
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    await signIn("google");
  };

  useEffect(() => {
    if (status === "authenticated") {
      const { accountSetup } = session.user;

      if (accountSetup?.accountSetupCompleted) {
        router.replace("/dashboard");
      } else {
        router.replace(`/account-setup/${accountSetup?.stage || "personal-info"}`);
      }
    }
  }, [status, session]);

  return (
    <Box>
      <div className="upper">
        <Image id="logo" src={logo} alt="login" />
        <AuthComponent googleAuth={handleGoogleLogin} appleAuth={console.log} />
      </div>
      <Footer />
    </Box>
  );
}
