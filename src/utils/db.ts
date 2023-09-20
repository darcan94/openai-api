import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGO_DB_URI ?? '');

export async function connectDB() {
    try{
        await mongoClient.connect();
        console.log('connect to MongoDB');        
        const database = mongoClient.db('open-api');
        return database.collection('users');
    }catch(error){
        throw new Error(`Failed to connect to MongoDB: ${error}`)
    }
}