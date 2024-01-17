'use server'
import { ObjectId } from "mongodb";
import { Chat } from "@/app/modules/chat/domain/Chat";
import { ChatRepositoryImpl } from "@/app/modules/chat/infra/ChatRepositoryImpl";
import { ChatService } from "@/app/modules/chat/application/ChatService";
import { revalidatePath } from "next/cache";

const chatService = new ChatService(new ChatRepositoryImpl());

export async function saveChat(chat: Chat) {
    return await chatService.create(chat);
}

export async function updateChat(chat: Chat) {
    return await chatService.update(chat);
}

export async function getChats() {
    return await chatService.getAll();
}

export async function getChat(id: ObjectId) {
    return await chatService.getById(id);
}

export async function deleteChat(id: ObjectId) {
    await chatService.delete(id);
    return revalidatePath('/chat');
}