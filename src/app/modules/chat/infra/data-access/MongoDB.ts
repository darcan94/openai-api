import { MongoDBConnection } from "@/app/modules/utils/MongoDBConnection";
import { Db } from "mongodb";

export async function connectDB() {
  try {
    const client = await MongoDBConnection.getInstance();
    const database: Db = client.db(process.env.DB_NAME);
    return database.collection(process.env.COLLECTION_NAME || "");
  } catch (error) {
    console.error(`Failed to connect mongo db: ${error}`);
    return null;
  }
}

export const collection = await connectDB();
