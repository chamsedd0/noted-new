"use client";

import { createContext, useContext } from "react";

// Define the AuthContextValue interface
interface AuthContextValue {
  idToken: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = AuthContext.Provider;

// Export the stage order
export const STAGE_ORDER = [
  "personal-info",
  "add-courses",
  "add-syllabus",
  "add-time-slots",
  "choose-plan",
]; 