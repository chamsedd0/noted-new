import { NextAuthOptions } from "next-auth";
import {
  GetServerSidePropsContext,
  NextApiResponse,
  NextApiRequest,
} from "next";
import { getServerSession } from "next-auth";
import { unstable_noStore } from "next/cache";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./firebase-admin"; // Firestore admin
import { AccountSetupStage } from "@/src/entities/User"; // Enum for stages

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user) {
        token.id = user.id;

        const userDocRef = db.collection("users").doc(user.id);
        const userDoc = await userDocRef.get();

        if (!userDoc.exists) {
          // Create user if not already in Firestore
          const newUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            photoUrl: user.image,
            accountSetup: {
              accountSetupCompleted: false,
              stage: AccountSetupStage.PERSONAL_INFO, // Default starting stage
            },
            createdAt: new Date().toISOString(),
          };
          await userDocRef.set(newUser);
          token.accountSetup = newUser.accountSetup;
        } else {
          token.accountSetup = userDoc.data()?.accountSetup;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.accountSetup = token.accountSetup;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

// Use it in server contexts
export async function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  unstable_noStore();
  const session = await getServerSession(...args, authOptions);
  return { getUser: () => session?.user && { userId: session.user.id } };
}
