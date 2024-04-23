"use server";
import { UserService } from "@/app/modules/user/application/UserService";
import { signIn } from "@/../auth";
import { AuthError } from "next-auth";

const userService = UserService.getInstance();

export async function getUser(email: string) {
  return await userService.getUser(email);
}

export async function authenticate(prevState: string | undefined, formData: FormData){
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}