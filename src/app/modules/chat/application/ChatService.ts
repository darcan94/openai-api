import { Chat } from "@/app/modules/chat/domain/Chat";
import { ChatRepository } from "@/app/modules/chat/domain/ChatRepository";
import { ObjectId } from "mongodb";
import { ChatRepositoryImpl } from "../infra/ChatRepositoryImpl";

export class ChatService {
  private static instance: ChatService;
  private chatRepository: ChatRepository;

  private constructor() {
    this.chatRepository = new ChatRepositoryImpl();
  }

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  async create(chat: Chat) {
    return await this.chatRepository.save(chat);
  }

  async update(chat: Chat) {
    return await this.chatRepository.update(chat);
  }

  async getAll() {
    return await this.chatRepository.getAll();
  }

  async getById(id: ObjectId) {
    return await this.chatRepository.get(id);
  }

  async delete(id: ObjectId) {
    return await this.chatRepository.delete(id);
  }
}
