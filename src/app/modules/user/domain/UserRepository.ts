import { User } from "@/app/modules/user/domain/User";

export interface UserRepository {
  getUser(): Promise<User | null>;
}
