import { ObjectId } from "mongodb";
import { Chat } from "../domain/Chat";
import { ChatRepository } from "../infra/ChatRepository";

export class ChatService{
    constructor(private chatRepository: ChatRepository){};

    createChat(chat: Chat){
        return this.chatRepository.create(chat);
    }

    findAllChat(){
        return this.chatRepository.findAll();
    }

    findChat(id: ObjectId){
        return this.chatRepository.findById(id);
    }

    updateChat(chat: Chat){
        this.chatRepository.update(chat);
    }

    deleteChat(id: ObjectId){
        this.chatRepository.delete(id);
    }
}