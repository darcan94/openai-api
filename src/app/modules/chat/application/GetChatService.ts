import { ObjectId } from "mongodb";
import { ChatRepository } from "@/app/modules/chat/domain/ChatRepository";

export class GetChatsService {
  constructor(private chatRepository: ChatRepository) {}

  async execute(id: ObjectId) {
    return await this.chatRepository.get(id);
  }
}
