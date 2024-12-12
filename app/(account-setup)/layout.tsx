"use client";

import { useEffect } from "react";
import { accountSetupStore } from "./_store";
import { Loading } from "./personal-info/styles";

export default function AccountSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loadUser } = accountSetupStore();

  useEffect(() => {
    localStorage.removeItem("account-setup-storage");
    loadUser();
  }, []);

  if (!user) return <Loading>Loading...</Loading>;

  return <>{children}</>;
}
