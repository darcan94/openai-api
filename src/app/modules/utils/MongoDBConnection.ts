import { MongoClient } from "mongodb";

const url = process.env.MONGO_DB_URI ?? "";
class MongoDBConnection {
  private static _instance: MongoDBConnection;
  private client: MongoClient;
  private clientPromise: Promise<MongoClient>;

  private constructor() {
    this.client = new MongoClient(url);
    this.clientPromise = this.client.connect();
  }

  public static get instance(): Promise<MongoClient> { 
    if (!this._instance) {
      this._instance = new MongoDBConnection();
    }
    return this._instance.clientPromise;
  }
}

const mongoClient = MongoDBConnection.instance;

export default mongoClient;


