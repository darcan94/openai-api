"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { UserRepositoryImpl } from "../infra/UserRepositoryImpl";

const userRepository = new UserRepositoryImpl();

export async function getUser(email: string) {
  return await userRepository.getUser(email);
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
){
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