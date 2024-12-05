"use server";

import { userApi } from "@/api/FireBaseUserAPI";

export async function getUserData(uid: string) {
  return await userApi.getUser(uid);
}
