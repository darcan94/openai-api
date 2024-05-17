import { ObjectId } from "mongodb";
import { Chat } from "@/app/modules/chat/domain/Chat";
import { CreateMessage } from "ai";

export interface ChatRepository {
  save(chat: Chat): Promise<ObjectId | null>;
  update(id: string, message: CreateMessage): Promise<number | null>;
  getAll(): Promise<Chat[] | []>;
  get(id: string): Promise<Chat | null>;
  delete(id: string): Promise<void>;
}
