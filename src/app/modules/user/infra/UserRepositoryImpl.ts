import collection from "@/app/modules/user/infra/data-access/MongoDB";
import { UserRepository } from "@/app/modules/user/domain/UserRepository";
import { User } from "@/app/modules/user/domain/User";
import { ObjectId } from "mongodb";

export class UserRepositoryImpl implements UserRepository{ 

  async getUser(email: string): Promise<User | null> {
    const client = await collection;
    if (!client) {
      console.warn(`Database is not connected`);
      return null;
    }

    try {
      const user = await client?.findOne({ email: email });
      return user as unknown as User;
    } catch (error) {
      console.error(`Error occurred while getting user: ${error}`);
      throw error;
    }
  }

  async saveUser(user: User): Promise<ObjectId | null> {
    const client = await collection;
    if (!client) {
      console.warn(`Database is not connected`);
      return null;
    }

    try {
      const result = await client?.insertOne(user);
      return result.insertedId;
    } catch (error) {
      console.error(`Error occurred while getting user: ${error}`);
      throw error;
    }
  }
}
