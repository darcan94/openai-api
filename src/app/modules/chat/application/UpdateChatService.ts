import { Chat } from "@/app/modules/chat/domain/Chat";
import { ChatRepository } from "@/app/modules/chat/domain/ChatRepository";

export class UpdateChatService {
  constructor(private chatRepository: ChatRepository) {}

  async execute(chat: Chat) {
    return await this.chatRepository.update(chat);
  }
}