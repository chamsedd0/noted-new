"use client";

import React, { createContext, useContext, useState } from "react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { checkUserStage } from "./_actions/checkUserStage";
import { AccountSetupStage } from "@/types/User";

// Define the AuthContextValue interface
interface AuthContextValue {
  idToken: string | null;
  loading: boolean;
}

// Define the stage order based on AccountSetupStage
const STAGE_ORDER = [
  AccountSetupStage.PERSONAL_INFO,
  AccountSetupStage.ADD_COURSES,
  AccountSetupStage.ADD_SYLLABUS,
  AccountSetupStage.ADD_TIME_SLOTS,
  AccountSetupStage.CHOOSE_PLAN,
];

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

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
    <AuthContext.Provider value={{ idToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
