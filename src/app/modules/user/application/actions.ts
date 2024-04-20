"use server";
import { UserService } from "@/app/modules/user/application/UserService";

const userService = UserService.getInstance();

export async function getUser() {
  return await userService.getUser();
}
