import { ObjectId } from "mongodb";
import { Chat } from "../domain/Chat";
import { ChatRepository } from "../domain/ChatRepository";
import { collection } from "@/app/modules/chats/infra/data-access/MongoDB";

export class ChatRepositoryImpl implements ChatRepository{

    async save(chat: Chat, newMessage: any): Promise<ObjectId | null>{
        const filter = { _id: chat._id };
        const update = { 
            $setOnInsert: { chat },
            $push: { messages: newMessage }
        };
        const options = { upsert: true };

        try {
            const result = await collection.updateOne(filter, update, options);
            return result.upsertedId;
        } catch (error) {
            console.error(`Error occurred while saving chat: ${error}`);
            throw error;
        }        
    };

    async getAll(): Promise<Chat[] | null>{
        try {
            const chats = collection.find();
            return await chats.toArray() as Chat[];
        } catch (error) {
            console.error(`Error occurred while getting all chats: ${error}`);            
            throw error;
        }
        
    };  

    async get(id: ObjectId): Promise<Chat | null>{
        try {
            const chat = await collection.findOne({_id: id}); 
            return chat as Chat;
        } catch (error) {
            console.error(`Error occurred while getting a chat: ${error}`); 
            throw error;          
        }        
    };     
   
    async delete(id: ObjectId): Promise<number>{
        try {
            const result = await collection.deleteOne({_id: id});
            return result.deletedCount; 
        } catch (error) {
            console.error(`Error occurred while deleting chat: ${error}`);
            throw error;
        }       
    }; 
}