import { ObjectId } from "mongodb";
import { Chat } from "./Chat";

export interface ChatRepository{
    create(chat: Chat): Promise<ObjectId>;
    findAll(): Promise<Chat[]>;
    find(id: ObjectId): Promise<Chat>;
    update(chat: Chat): Promise<Chat>;
    delete(id: ObjectId): Promise<number>;  
}