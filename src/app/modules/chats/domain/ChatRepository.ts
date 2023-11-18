import { ObjectId } from "mongodb";
import { Chat } from "./Chat";

export interface ChatRepository{
    save(chat: Chat, newMessage: any): Promise<ObjectId | null>;
    getAll(): Promise<Chat[] | null>;    
    get(id: ObjectId): Promise<Chat | null>;   
    delete(id: ObjectId): Promise<number>;  
}