"use server";
import { ObjectId } from "mongodb";
import { Chat } from "@/app/modules/chat/domain/Chat";
import { CreateMessage } from "ai";
import { ChatRepositoryImpl } from "@/app/modules/chat/infra/ChatRepositoryImpl";

const chatRepository = new ChatRepositoryImpl();

export async function saveChat(chat: Chat) {
  return await chatRepository.save(chat);
}

export async function updateChat(id: ObjectId, message: CreateMessage) {
  return await chatRepository.update(id, message);
}

export async function getChats() {
  return await chatRepository.getAll();
}

export async function getChat(id: ObjectId) {
  return await chatRepository.get(id);
}

export async function deleteChat(id: ObjectId) {
  await chatRepository.delete(id);
}
