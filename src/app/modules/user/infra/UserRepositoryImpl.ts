import { collection } from "@/app/modules/chat/infra/data-access/MongoDB";
import { unstable_noStore as noStore} from "next/cache";
import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";

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
}
