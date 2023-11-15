import { Chat } from "../domain/Chat";
import { ChatRepository } from "../domain/ChatRepository";

export class CreateChatService{
    constructor(private chatRepository: ChatRepository){}

    async execute(chat: Chat){
        return await this.chatRepository.save(chat);
    }
    
}