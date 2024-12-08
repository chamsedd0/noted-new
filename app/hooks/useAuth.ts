"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";

interface AuthState {
  user: FirebaseUser | null;
  idToken: string | null;
  loading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    idToken: null,
    loading: true,
  });

  useEffect(() => {
    let mounted = true;

    const handleAuthStateChange = async (user: FirebaseUser | null) => {
      if (!mounted) return;

      if (user) {
        try {
          const token = await user.getIdToken();
          if (mounted) {
            setAuthState({
              user,
              idToken: token,
              loading: false,
            });
          }
        } catch (error) {
          console.error("Error fetching ID token:", error);
          if (mounted) {
            setAuthState({ user: null, idToken: null, loading: false });
          }
        }
      } else {
        setAuthState({ user: null, idToken: null, loading: false });
      }
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return {
    user: authState.user,
    idToken: authState.idToken,
    loading: authState.loading,
  };
}
