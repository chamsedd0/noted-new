"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { checkUserStage } from "./_actions/checkUserStage";
import { AuthProvider, STAGE_ORDER } from "./contexts/AuthContext";

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
    return null;
  }

  return (
    <AuthProvider value={{ idToken, loading }}>
      {children}
    </AuthProvider>
  );
}