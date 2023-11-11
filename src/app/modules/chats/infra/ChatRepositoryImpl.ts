import { ObjectId } from "mongodb";
import { Chat } from "../domain/Chat";
import { ChatRepository } from "../domain/ChatRepository";
import { connectDB } from "./data-access/MongoDB";

export class ChatRepositoryImpl implements ChatRepository{
    private collection: any;

    constructor(){
        this.init();
    }

    private async init(){
        this.collection = this.collection ?? await connectDB(); 
    }

    async save(chat: Chat): Promise<ObjectId>{
        const result = await this.collection.insertOne(chat);
        return result.insertedId;
    };

    async getAll(): Promise<Chat[] | null>{
        const chats = await this.collection.find();
        return await chats.toArray();
    };  

    async get(id: ObjectId): Promise<Chat | null>{
        const chat = await this.collection.findOne({_id: id}); 
        return chat;
    };    
   
    async update(chat: Chat): Promise<Chat | null>{
        return null;
    };    
   
    async delete(id: ObjectId): Promise<number>{
        const result = await this.collection.deleteOne({_id: id});
        return result.deletedCount;
    }; 
}