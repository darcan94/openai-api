'use server'
import { ObjectId } from "mongodb";
import { Chat } from "../domain/Chat";
import { ChatRepositoryImpl } from "../infra/ChatRepositoryImpl";
import { CreateChatService } from "./CreateChatService";
import { GetAllChatsService } from "./GetAllChatService";
import { GetChatsService } from "./GetChatService";
import { DeleteChatsService } from "./DeleteChatService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const chatRepository = new ChatRepositoryImpl();

export async function saveChat(chat: Chat, newMessage: any) {
    const createChat = new CreateChatService(chatRepository);
    return await createChat.execute(chat, newMessage);    
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
    deleteChat.execute(id);
    revalidatePath('/chat');
    redirect('/chat');
}