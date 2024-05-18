import { Message } from "ai";

export interface Chat {
  id: string;
  title: string;
  createdAt: Date;
  messages: Message[];
  userId?: string;
}
