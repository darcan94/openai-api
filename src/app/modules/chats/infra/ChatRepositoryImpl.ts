import { ObjectId } from "mongodb";
import { Chat } from "../domain/Chat";
import { ChatRepository } from "../domain/ChatRepository";

export class ChatRepositoryImpl implements ChatRepository{
    constructor(private collection: any){}

    async save(chat: Chat): Promise<ObjectId>{
        try {
            const result = await this.collection.insertOne(chat);
            return result.insertedId;
        } catch (error) {
            console.error(`Error occurred while saving chat: ${error}`);
            throw error;
        }        
    };

    async getAll(): Promise<Chat[] | null>{
        try {
            const chats = await this.collection.find();
            return await chats.toArray();
        } catch (error) {
            console.error(`Error occurred while getting all chats: ${error}`);            
            throw error;
        }
        
    };  

    async get(id: ObjectId): Promise<Chat | null>{
        try {
            const chat = await this.collection.findOne({_id: id}); 
            return chat;
        } catch (error) {
            console.error(`Error occurred while getting a chat: ${error}`); 
            throw error;          
        }        
    };    
   
    async update(chat: Chat): Promise<Chat | null>{
        try {
            const result = await this.collection.updateOne({_id: chat._id}, chat);
            return result.insertedId;
        } catch (error) {
            console.error(`Error occurred while updating chat: ${error}`);
            throw error;
        }
    };    
   
    async delete(id: ObjectId): Promise<number>{
        try {
            const result = await this.collection.deleteOne({_id: id});
            return result.deletedCount; 
        } catch (error) {
            console.error(`Error occurred while deleting chat: ${error}`);
            throw error;
        }       
    }; 
}