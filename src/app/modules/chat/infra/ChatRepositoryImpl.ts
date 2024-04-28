import { ObjectId } from "mongodb";
import { Chat } from "../domain/Chat";
import { ChatRepository } from "../domain/ChatRepository";
import { collection } from "@/app/modules/chat/infra/data-access/MongoDB";
import { revalidatePath, unstable_noStore as noStore} from "next/cache";
import { redirect } from "next/navigation";
import {CreateMessage} from "ai";

export class ChatRepositoryImpl implements ChatRepository {
  async save(chat: Chat): Promise<ObjectId | null> {
    if (!collection) {
      console.warn(`Database is not connected. Chat will not be save`);
      return null;
    }

    try {
      const result = await collection.insertOne(chat);
      revalidatePath("/chat");
      return result.insertedId;
    } catch (error) {
      console.error(`Error occurred while saving chat: ${error}`);
      throw error;
    }
  }

  async update(id: ObjectId, newMessage: CreateMessage): Promise<number | null> {
    if (!collection) {
      console.warn(`Database is not connected. Chat will not be update`);
      return null;
    }

    const filter = { _id: id };
    const update = {
      $set: { messages: newMessage },
    };

    try {
      const result = await collection.updateOne(filter, update);
      return result.modifiedCount;
    } catch (error) {
      console.error(`Error occurred while saving chat: ${error}`);
      throw error;
    }
  }

  async getAll(): Promise<Chat[] | []> {
    noStore();
    if (!collection) {
      console.warn(`Database is not connected`);
      return [];
    }

    try {
      const chats = collection.find().sort({ createdAt: -1 });
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

  async delete(id: ObjectId): Promise<void> {
    if (!collection) {
      console.warn(`Database is not connected`);
      return;
    }

    try {
      await collection.deleteOne({ _id: id });
    } catch (error) {
      console.error(`Error occurred while deleting chat: ${error}`);
      throw error;
    }

    revalidatePath("/chat");
    redirect("/chat");
  }
}
