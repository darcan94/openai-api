"use server";
import { UserService } from "@/app/modules/user/application/UserService";

const userService = UserService.getInstance();

export async function getUser(email: string) {
  return await userService.getUser(email);
}

export async function authenticate(prevState: string | undefined, formData: FormData){
  return await userService.authenticate(prevState, formData);
} 