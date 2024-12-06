"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { checkUserStage } from "./_actions/checkUserStage";
import { AccountSetupStage } from "@/types/User";
import { AuthProvider } from "./contexts/AuthContext";

// Define the stage order based on AccountSetupStage
const STAGE_ORDER = [
  AccountSetupStage.PERSONAL_INFO,
  AccountSetupStage.ADD_COURSES,
  AccountSetupStage.ADD_SYLLABUS,
  AccountSetupStage.ADD_TIME_SLOTS,
  AccountSetupStage.CHOOSE_PLAN,
];

export default function AccountSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { idToken, loading } = useAuth();
  const pathname = usePathname();
  const [isStageValidated, setIsStageValidated] = useState(false);

  useEffect(() => {
    if (!loading && !idToken) {
      redirect("/login");
    }

    const validateStage = async () => {
      if (!idToken) return;

      const currentPath = pathname.split("/").pop();
      const currentPathStage = STAGE_ORDER.find((stage) =>
        stage.includes(currentPath || "")
      );

      if (currentPathStage) {
        await checkUserStage(idToken);
      }
      setIsStageValidated(true);
    };

    validateStage();
  }, [idToken, loading, pathname]);

  if (loading || !isStageValidated) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider value={{ idToken, loading }}>
      <div>
        {children}
      </div>
    </AuthProvider>
  );
}
