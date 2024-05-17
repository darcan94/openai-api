import { Message } from "ai";
import { ObjectId } from "mongodb";

export interface Chat {
  id: string;
  title: string;
  createdAt: Date;
  messages: Message[];
  userId?: string;
}
