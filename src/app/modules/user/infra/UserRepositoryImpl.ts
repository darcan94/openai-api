import connectDB from "@/app/modules/user/infra/data-access/MongoDB";
import { UserRepository } from "@/app/modules/user/domain/UserRepository";
import { User } from "@/app/modules/user/domain/User";
import { signIn } from "@/../auth";
import { AuthError } from "next-auth";

let collection: any;
(async function(){collection = await connectDB()})();
export class UserRepositoryImpl implements UserRepository{ 
  async getUser(email: string): Promise<User | null> {
    if (!collection) {
      console.warn(`Database is not connected`);
      return null;
    }

    try {
      const user = await collection.findOne({ email: email });
      return user as unknown as User;
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
