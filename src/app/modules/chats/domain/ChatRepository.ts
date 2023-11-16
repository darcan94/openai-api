import { ObjectId } from "mongodb";
import { Chat } from "./Chat";

export interface ChatRepository{
    save(chat: Chat): Promise<ObjectId | null>;
    getAll(): Promise<Chat[] | null>;    
    get(id: ObjectId): Promise<Chat | null>;    
    update(chat: Chat): Promise<ObjectId | null>;    
    delete(id: ObjectId): Promise<number>;  
}