import { ChatRepository } from "../domain/ChatRepository";


export class GetAllChatsService{
    constructor(private chatRepository: ChatRepository){};

    async execute(){
        return await this.chatRepository.getAll();
    }
}