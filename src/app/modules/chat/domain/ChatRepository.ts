import { ObjectId } from "mongodb";
import { Chat } from "@/app/modules/chat/domain/Chat";
import { Message } from "ai";

export interface ChatRepository {
  save(chat: Chat): Promise<ObjectId | null>;
  update(id: ObjectId, newMessage: Message[]): Promise<number | null>;
  getAll(): Promise<Chat[] | []>;
  get(id: ObjectId): Promise<Chat | null>;
  delete(id: ObjectId): Promise<void>;
}
