"use client";
import Link from "next/link";

import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center a {
    color: #383838;
    padding: 0.5rem 1rem;
    background-color: white;
    border-radius: 100px;
  }
`;

export default function Home() {
  return (
    <Box>
      <Link href="/login">Go to Login</Link>
    </Box>
  );
}
