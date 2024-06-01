"use server";
import { Chat } from "@/app/modules/chat/domain/Chat";
import { CreateMessage } from "ai";
import { ChatRepositoryImpl } from "@/app/modules/chat/infra/ChatRepositoryImpl";

const chatRepository = new ChatRepositoryImpl();

export async function saveChat(chat: Chat) {
  return await chatRepository.save(chat);
}

export async function updateChat(id: string, messages: CreateMessage[]) {
  return await chatRepository.update(id, messages);
}

export async function getChats(userId: string) {
  return await chatRepository.getAll(userId);
}

export async function getChat(id: string, userId: string) {
  return await chatRepository.get(id, userId);
}

export async function deleteChat(id: string) {
  await chatRepository.delete(id);
}
