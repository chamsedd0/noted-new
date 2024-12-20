"use client";

import Header from "@/app/components/header";
import SideBarComponent from "@/app/components/sidebar";
import { usePathname } from "next/navigation";



export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header hightlighted={usePathname().split('/')[usePathname().split('/').length - 1] as "profile" | "dashboard" | "scheduler" | "notifications"} />
      {children}
      <SideBarComponent page="dashboard" />
    </>
  );
}
