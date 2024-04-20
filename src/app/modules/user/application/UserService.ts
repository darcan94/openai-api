
import { UserRepositoryImpl } from "@/app/modules/user/infra/UserRepositoryImpl";
import { UserRepository } from "@/app/modules/user/domain/UserRepository";
import { User } from "../domain/User";

export class UserService {
  private static instance: UserService;
  private userRepository: UserRepository;

  private constructor() {
    this.userRepository = new UserRepositoryImpl();
  }

  static getInstance(): UserService {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }
  async getUser(email: string): Promise<User | null > {
    return await this.userRepository.getUser(email);
  }

  async authenticate(prevState: string | undefined, formData: FormData): Promise<string | undefined> {
    return  this.userRepository.authenticate(prevState, formData);
  };
}
