import { Collection, Db, MongoClient } from "mongodb";

export const mongoClient = new MongoClient(process.env.MONGO_DB_URI ?? "");

export async function connectDB() {
  try {
    await mongoClient.connect();
    const database: Db = mongoClient.db("open-api");
    return database.collection("chats");
  } catch (error) {
    throw new Error(`Failed to connect to MongoDB: ${error}`);
  }
}