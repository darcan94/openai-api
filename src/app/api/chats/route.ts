import { NextResponse } from "next/server";
import { connectDB } from "@/app/modules/chats/infra/data-access/MongoDB";

export const GET = async () => {
  const collection = await connectDB();
  const chats = collection.find();

  return NextResponse.json({
    chats: await chats.toArray(),
  });
};
