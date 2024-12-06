"use client";

import React, { createContext, useContext } from "react";

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