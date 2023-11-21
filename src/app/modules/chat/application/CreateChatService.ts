import { Chat } from "@/app/modules/chat/domain/Chat";
import { ChatRepository } from "@/app/modules/chat/domain/ChatRepository";

export class CreateChatService {
  constructor(private chatRepository: ChatRepository) {}

  async execute(chat: Chat, newMessage: any) {
    return await this.chatRepository.save(chat, newMessage);
  }
}
