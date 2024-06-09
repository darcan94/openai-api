"use server";
import { signIn } from "@/auth";
import  AuthError  from "next-auth";
import { UserRepositoryImpl } from "@/app/modules/user/infra/UserRepositoryImpl";
import {LoginFormSchema, FormState, SignupFormSchema} from "@/app/(auth)/definitions";
import bcrypt from "bcrypt";
import { User } from "@/app/modules/user/domain/User";
import { nanoid } from "nanoid";

const userRepository = new UserRepositoryImpl();

export async function getUser(email: string) {
  return await userRepository.getUser(email);
}

export async function saveUser(user: User) {
  return await userRepository.saveUser(user);
}

export async function signup(
  prevState: FormState,
  formData: FormData
){
  const validatedFields = SignupFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
  })

  if (!validatedFields.success){
      return{
          errors: validatedFields.error.flatten().fieldErrors,
      }
  }

  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const userId = await saveUser({
    id: nanoid(7),
    name,
    email,
    password: hashedPassword
  })
  
  if(!userId){
      return {
          message: 'An error occurred while creating your account.',
      }
  }

  try {
      await signIn('credentials', validatedFields.data)
  }catch (error){
      throw error
  }
}

export async function authenticate(
    prevState: FormState,
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
          return { message: 'Invalid credentials.' };
        default:
          return { message: 'Something went wrong.' };
      }
    }
    throw error;
  }
}

export async function login() {
  await signIn('github');
}