import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";

export const GET = async () => {
    const collection = await connectDB();
    const users = collection.find()

    return NextResponse.json({
        users: await users.toArray()
    });
};