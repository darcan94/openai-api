import { MongoClient } from "mongodb";

export class MongoDBConnection {
  private static instance: MongoClient;

  private constructor() {}

  static async getInstance() {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoClient(
        process.env.MONGO_DB_URI ?? "",
      );
      await MongoDBConnection.instance.connect();
    }
    return MongoDBConnection.instance;
  }
}
