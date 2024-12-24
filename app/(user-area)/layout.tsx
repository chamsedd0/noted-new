"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/components/loading";
import globalStore from "@/app/(user-area)/_store";
import UserFooter from "./_components/UserFooter";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUserData } = globalStore();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    getUserData().finally(() => setIsLoading(false));
  }, [getUserData]);

  return (
    <LayoutWrapper>
      <Loading isLoading={isLoading} />
      <MainContent>
        {children}
      </MainContent>
      <UserFooter />
    </LayoutWrapper>
  );
}
