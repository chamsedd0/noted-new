"use client";
import Link from "next/link";
import { useEffect } from "react";
import { signOutUser } from "@/app/lib/firebase";

import styled from "styled-components";

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .link {
    color: #383838;
    padding: 0.5rem 2rem;
    background-color: white;
    font-weight: bold;
    border-radius: 100px;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export default function Home() {
  useEffect(() => {
    signOutUser();
  }, []);

  return (
    <Box>
      <Link className="link" href="/login">
        Go to Login
      </Link>
    </Box>
  );
}
