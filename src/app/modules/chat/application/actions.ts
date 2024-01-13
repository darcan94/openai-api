'use server'
import { ObjectId } from "mongodb";
import { Chat } from "@/app/modules/chat/domain/Chat";
import { ChatRepositoryImpl } from "@/app/modules/chat/infra/ChatRepositoryImpl";
import { CreateChatService } from "@/app/modules/chat/application/CreateChatService";
import { GetAllChatsService } from "@/app/modules/chat/application/GetAllChatService";
import { GetChatsService } from "@/app/modules/chat/application/GetChatService";
import { DeleteChatsService } from "@/app/modules/chat/application/DeleteChatService";
import { revalidatePath } from "next/cache";
import { UpdateChatService } from "./UpdateChatService";

const chatRepository = new ChatRepositoryImpl();

export async function saveChat(chat: Chat) {
    const createChat = new CreateChatService(chatRepository);
    const chatId = await createChat.execute(chat);
    return chatId;
}

export async function updateChat(chat: Chat) {
    const createChat = new UpdateChatService(chatRepository);
    return await createChat.execute(chat);
}

export async function getChats() {
    const getAllChats = new GetAllChatsService(chatRepository);
    return await getAllChats.execute();
}

export async function getChat(id: ObjectId) {
    const get = new GetChatsService(chatRepository);
    return await get.execute(id);
}

export async function deleteChat(id: ObjectId) {
    const deleteChat = new DeleteChatsService(chatRepository);
    await deleteChat.execute(id);
    return revalidatePath('/chat');
}