import mongoClient from "@/app/modules/utils/MongoDBConnection";

async function collection() {
  "use server";
  try {
    const client = await mongoClient;
    const database = client.db(process.env.DB_NAME);
    return database.collection(process.env.COLLECTION_USERS_NAME || "");
  } catch (error) {
    console.error(`Failed to connect mongo db: ${error}`);
    return null;
  }
}

const promiseCollection = collection();
export default promiseCollection;