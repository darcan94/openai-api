"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { UserRepositoryImpl } from "../infra/UserRepositoryImpl";
import {LoginFormSchema, LoginFormState} from "@/app/login/definitions";

const userRepository = new UserRepositoryImpl();

export async function getUser(email: string) {
  return await userRepository.getUser(email);
}

export async function authenticate(
    prevState: LoginFormState,
    formData: FormData
){
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  });

  if(!validatedFields.success){
    return{
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await signIn('credentials', validatedFields.data);
  } catch (error) {

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          console.log('Invalid credentials.');
          break
        default:
          console.log('Something went wrong.');
      }
    }
    throw error;
  }
}