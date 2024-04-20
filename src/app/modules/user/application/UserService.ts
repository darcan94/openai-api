
import { UserRepositoryImpl } from "@/app/modules/user/infra/UserRepositoryImpl";
import { UserRepository } from "@/app/modules/user/domain/UserRepository";

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
  async getUser() {
    return await this.userRepository.getUser();
  }
}
