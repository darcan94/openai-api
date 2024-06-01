import { ObjectId } from "mongodb";
import { Chat } from "../domain/Chat";
import { ChatRepository } from "../domain/ChatRepository";
import { collection } from "@/app/modules/chat/infra/data-access/MongoDB";
import { revalidatePath, unstable_noStore as noStore} from "next/cache";
import { redirect } from "next/navigation";
import { CreateMessage } from "ai";

export class ChatRepositoryImpl implements ChatRepository {
  async save(chat: Chat): Promise<ObjectId | null> {
    if (!collection) {
      console.warn(`Database is not connected. Chat will not be save`);
      return null;
    }

    try {
      const result = await collection.insertOne(chat);
      revalidatePath("/");
      return result.insertedId;
    } catch (error) {
      console.error(`Error occurred while saving chat: ${error}`);
      throw error;
    }
  }

  async update(id: string, messages: CreateMessage[]): Promise<number | null> {
    if (!collection) {
      console.warn(`Database is not connected. Chat will not be update`);
      return null;
    }

    const filter = { id: id };
    const update = {
      $set: { messages: messages },
    };

    try {
      const result = await collection.updateOne(filter, update);
      return result.modifiedCount;
    } catch (error) {
      console.error(`Error occurred while saving chat: ${error}`);
      throw error;
    }
  }

  async getAll(userId: string): Promise<Chat[] | []> {
    noStore();
    if (!collection) {
      console.warn(`Database is not connected`);
      return [];
    }

    try {
      const chats = collection.find({userId}).sort({ createdAt: -1 });
      return (await chats.toArray()) as unknown as Chat[];
    } catch (error) {
      console.error(`Error occurred while getting all chats: ${error}`);
      throw error;
    }
  }

  async get(id: string, userId: string): Promise<Chat | null> {
    if (!collection) {
      console.warn(`Database is not connected`);
      return null;
    }

    try {
      const chat = await collection.findOne({ id, userId });
      return chat as unknown as Chat;
    } catch (error) {
      console.error(`Error occurred while getting a chat: ${error}`);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    if (!collection) {
      console.warn(`Database is not connected`);
      return;
    }

    try {
      await collection.deleteOne({ id: id });
    } catch (error) {
      console.error(`Error occurred while deleting chat: ${error}`);
      throw error;
    }

    revalidatePath("/");
    redirect("/");
  }
}
