"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  idToken: string | null;
  initialized: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: auth.currentUser,
    idToken: null,
    initialized: false,
  });
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    // Check if there's a persisted session
    const persistedUser = auth.currentUser;
    if (persistedUser) {
      persistedUser.getIdToken().then((token) => {
        if (mounted) {
          setAuthState({
            user: persistedUser,
            idToken: token,
            initialized: true,
          });
        }
      });
    }

    const updateToken = async (user: User | null) => {
      if (!user) {
        if (mounted) {
          setAuthState((prev) => ({
            ...prev,
            user: null,
            idToken: null,
            initialized: true,
          }));
          // Only redirect if we're sure there's no session
          if (authState.initialized) {
            router.push("/login");
          }
        }
        return;
      }

      try {
        const token = await user.getIdToken();
        if (mounted) {
          setAuthState({ user, idToken: token, initialized: true });
        }
      } catch (error) {
        console.error("Error getting token:", error);
        if (mounted) {
          setAuthState((prev) => ({ ...prev, initialized: true }));
          router.push("/login");
        }
      }
    };

    const unsubscribe = auth.onAuthStateChanged(updateToken);

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [router, authState.initialized]);

  return {
    user: authState.user,
    idToken: authState.idToken,
    loading: !authState.initialized,
  };
}
