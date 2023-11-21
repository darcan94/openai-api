import { Message } from "ai";
import { ObjectId } from "mongodb";

export interface Chat {
  _id: ObjectId;
  title: string;
  createdAt: Date;
  messages: Message[];
}
