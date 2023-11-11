import { ObjectId } from "mongodb";
import { Chat } from "../domain/Chat";
import { ChatRepository } from "../domain/ChatRepository";

export class SaveChat{
    private chatRespository: ChatRepository;

    constructor(chatRepository: ChatRepository){
        this.chatRespository = chatRepository;
    }

    async run(chat: Chat){
        
    }
    
}