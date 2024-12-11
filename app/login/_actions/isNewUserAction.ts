"use server";

import { User, AccountSetupStage } from "@/types/User";
import { userApi } from "@/api/FirebaseUserApi";
import { generateToken } from "@/app/utils/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function isNewUserAction(user: User): Promise<void> {
  const existingUser = await userApi.getUser(user.uid);
  let accountSetupStage = AccountSetupStage.PERSONAL_INFO;

  if (!existingUser) {
    await userApi.createUser({
      ...user,
      accountSetupStage: AccountSetupStage.PERSONAL_INFO,
    });
  } else {
    accountSetupStage =
      (existingUser.accountSetupStage as AccountSetupStage) ??
      AccountSetupStage.PERSONAL_INFO;
  }

  const token = await generateToken(user.uid);

  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  if (accountSetupStage === AccountSetupStage.COMPLETED) {
    redirect("/dashboard");
  }

  redirect(`/${accountSetupStage}`);
}
