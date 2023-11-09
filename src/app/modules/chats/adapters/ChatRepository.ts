import { mongoClient as client} from "@/app/modules/chats/infra/db";
import { Chat } from "../domain/Chat";
import { ObjectId } from "mongodb";

export class ChatRepository{

    async create(chat: Chat){
        const collection = client.db('open-api').collection('chats');
        const result = await collection.insertOne(chat);
        return result.insertedId;
    }

    async findAll(){
        const collection = client.db('open-api').collection('chats');
        return await collection.find().toArray();
    }

    async findById(id: ObjectId){
        const collection = client.db('open-api').collection('chats');
        return await collection.findOne({ _id: id });
    }

    async update(chat: Chat,){
        const collection = client.db('open-api').collection('chats');
    }

    async delete(id: ObjectId){
        const collection = client.db('open-api').collection('chats');
        const result = await collection.deleteOne({ _id: id });
        return result.deletedCount;
    }
}