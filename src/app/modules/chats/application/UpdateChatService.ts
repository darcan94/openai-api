import { Chat } from "../domain/Chat";
import { ChatRepository } from "../domain/ChatRepository";

export class UpdateChatService{
    constructor(private chatRepository: ChatRepository){}

    async execute(chat: Chat){
        return await this.chatRepository.update(chat);
    }
    
}