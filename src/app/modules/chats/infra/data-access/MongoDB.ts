import { Db, MongoClient } from "mongodb";

export const mongoClient = new MongoClient(process.env.MONGO_DB_URI ?? "");

export async function connectDB() {
  try {
    await mongoClient.connect();
    const database: Db = mongoClient.db(process.env.DB_NAME);
    return database.collection(process.env.COLLECTION_NAME ?? "");
  } catch (error) {
    console.error(`Failed to connect mongo db: ${error}`);
    return null;
  }
}

export const collection = await connectDB();
