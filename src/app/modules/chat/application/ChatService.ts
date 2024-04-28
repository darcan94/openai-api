import { Chat } from "@/app/modules/chat/domain/Chat";
import { ChatRepository } from "@/app/modules/chat/domain/ChatRepository";
import { ObjectId } from "mongodb";
import { ChatRepositoryImpl } from "../infra/ChatRepositoryImpl";
import {CreateMessage} from "ai";

export class ChatService {
  private static _instance: ChatService;
  private chatRepository: ChatRepository;

  private constructor() {
    this.chatRepository = new ChatRepositoryImpl();
  }

  static get instance(): ChatService {
    if (!this._instance) {
      this._instance = new ChatService();
    }
    return this._instance;
  }

  async create(chat: Chat) {
    return await this.chatRepository.save(chat);
  }

  async update(id: ObjectId, newMessage: CreateMessage) {
    return await this.chatRepository.update(id, newMessage);
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
