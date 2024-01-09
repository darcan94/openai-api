import { MongoClient } from "mongodb";

export class MongoDBConnection {
  private static instance: MongoClient;

  static async getInstance() {
    if (!this.instance) {
      this.instance = new MongoClient(
        process.env.MONGO_DB_URI ?? "",
      );
      await this.instance.connect();
    }
    return this.instance;
  }
}
