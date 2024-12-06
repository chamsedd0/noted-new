"use server";

import { userApi } from "@/api/FirebaseUserApi";

export async function getUserData(uid: string) {
  return await userApi.getUser(uid);
}
