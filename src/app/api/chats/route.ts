import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";

export const GET = async () => {
    const collection = await connectDB();
    const chats = collection.find()

    return NextResponse.json({
        chats: await chats.toArray()
    });
};