import { ObjectId } from "mongodb";
import { ChatRepository } from "../domain/ChatRepository";

export class DeleteChatsService {
  constructor(private chatRepository: ChatRepository) {}

  async execute(id: ObjectId) {
    return await this.chatRepository.delete(id);
  }
}
