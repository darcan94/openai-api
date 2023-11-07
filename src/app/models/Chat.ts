import { ObjectId } from "mongodb";

export interface Chat{
    _id: ObjectId;
    title: string;
    createdAt: Date;
    messages: Message[];
}

interface Message {
    role: string;
    content: string;
}