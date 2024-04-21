import { MongoDBConnection } from "@/app/modules/utils/MongoDBConnection";

async function connectDB() {
  try {
    const client = await MongoDBConnection.getInstance();
    const database = client.db(process.env.DB_NAME);
    return database.collection(process.env.COLLECTION_USERS_NAME || "");
  } catch (error) {
    console.error(`Failed to connect mongo db: ${error}`);
    return null;
  }
}

export default connectDB;