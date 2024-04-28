"use server";
import { ObjectId } from "mongodb";
import { Chat } from "@/app/modules/chat/domain/Chat";
import { ChatService } from "@/app/modules/chat/application/ChatService";
import {CreateMessage} from "ai";

const chatService = ChatService.instance;

export async function saveChat(chat: Chat) {
  return await chatService.create(chat);
}

export async function updateChat(id: ObjectId, newMessage: CreateMessage) {
  return await chatService.update(id, newMessage);
}

export async function getChats() {
  return await chatService.getAll();
}

export async function getChat(id: ObjectId) {
  return await chatService.getById(id);
}

export async function deleteChat(id: ObjectId) {
  await chatService.delete(id);
}
