import { ObjectId } from "mongodb";
import { Chat } from "../domain/Chat";
import { ChatRepository } from "../domain/ChatRepository";
import { collection } from "@/app/modules/chat/infra/data-access/MongoDB";
import { CreateMessage } from "ai";

export class ChatRepositoryImpl implements ChatRepository {
  async save(chat: Chat): Promise<ObjectId | null> {
    if (!collection) {
      console.warn(`Database is not connected. Chat will not be save`);
      return null;
    }

    const filter = { _id: chat._id };
    const update = {
      $setOnInsert: { 
        "_id": chat._id,
        "title": chat.title,
        "createdAt": chat.createdAt,
       },
      $set: { messages: chat.messages },
    };
    const options = { upsert: true };

    try {
      const result = await collection.updateOne(filter, update, options);
      return result.upsertedId;
    } catch (error) {
      console.error(`Error occurred while saving chat: ${error}`);
      throw error;
    }
  }

  async getAll(): Promise<Chat[] | []> {
    if (!collection) {
      console.warn(`Database is not connected`);
      return [];
    }

    try {
      const chats = collection.find();
      return (await chats.toArray()) as Chat[];
    } catch (error) {
      console.error(`Error occurred while getting all chats: ${error}`);
      throw error;
    }
  }

  async get(id: ObjectId): Promise<Chat | null> {
    if (!collection) {
      console.warn(`Database is not connected`);
      return null;
    }

    try {
      const chat = await collection.findOne({ _id: id });
      return chat as Chat;
    } catch (error) {
      console.error(`Error occurred while getting a chat: ${error}`);
      throw error;
    }
  }

  async delete(id: ObjectId): Promise<number> {
    if (!collection) {
      console.warn(`Database is not connected`);
      return 0;
    }

    try {
      const result = await collection.deleteOne({ _id: id });
      return result.deletedCount;
    } catch (error) {
      console.error(`Error occurred while deleting chat: ${error}`);
      throw error;
    }
  }
}
