
import { UserRepositoryImpl } from "@/app/modules/user/infra/UserRepositoryImpl";
import { UserRepository } from "@/app/modules/user/domain/UserRepository";

export class UserService {
  private static _instance: UserService;
  private userRepository: UserRepository;

  private constructor() {
    this.userRepository = new UserRepositoryImpl();
  }

  static get instance(): UserService {
    if (!this._instance) {
      this._instance = new UserService();
    }
    return this._instance;
  }

  async getUser(email: string) {
    return await this.userRepository.getUser(email);
  }
}
