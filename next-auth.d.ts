import { DefaultSession } from "next-auth";
import { AccountSetupStage } from "@/src/entities/User";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      accountSetup?: {
        accountSetupCompleted: boolean;
        stage: AccountSetupStage;
      };
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accountSetup?: {
      accountSetupCompleted: boolean;
      stage: AccountSetupStage;
    };
  }
}
