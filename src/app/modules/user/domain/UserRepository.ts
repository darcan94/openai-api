import { User } from "@/app/modules/user/domain/User";
import { ObjectId } from "mongodb";

export interface UserRepository {
  saveUser(user: User): Promise<ObjectId | null>;
  getUser(email: string): Promise<User | null>;
}
