import { User } from "@/app/modules/user/domain/User";

export interface UserRepository {
  getUser(email: string): Promise<User | null>;
}