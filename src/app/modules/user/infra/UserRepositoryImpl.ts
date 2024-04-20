import { collection } from "@/app/modules/chat/infra/data-access/MongoDB";
import { unstable_noStore as noStore} from "next/cache";
import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { signIn } from "@/../auth";
import { AuthError } from "next-auth";

export class UserRepositoryImpl implements UserRepository{ 
  async getUser(): Promise<User | null> {
    noStore();
    if (!collection) {
      console.warn(`Database is not connected`);
      return null;
    }

    try {
      const user = null//collection.find().sort({ createdAt: -1 });
      return user ;
    } catch (error) {
      console.error(`Error occurred while getting user: ${error}`);
      throw error;
    }
  }

  async authenticate(
    prevState: string | undefined,
    formData: FormData,
  ): Promise<string | undefined> {
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
}
