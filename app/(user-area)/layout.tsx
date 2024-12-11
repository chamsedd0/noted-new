"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/components/loading";
import globalStore from "@/app/(user-area)/_store";

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
    <>
      <Loading isLoading={isLoading} />
      {children}
    </>
  );
}
