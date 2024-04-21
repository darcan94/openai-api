import { nanoid } from "nanoid";
import bcrypt from 'bcrypt';
import { MongoClient } from "mongodb";

const db = async () => {
  const client = new MongoClient(process.env.MONGO_DB_URI ?? "").db(process.env.DB_NAME);
  return client.collection('users');
}

async function seedUsers(collection){
   
    try {
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                user.password = await bcrypt.hash(user.password, 10);
                return await collection.insertOne(user);
            })
        );
        
        console.log(`Seeded ${insertedUsers.length} users`);
      } catch (error) {
        console.error(`Error seeding users:`, error);
        throw error;
      }
}

async function main(){
    const collection = await db();
    await seedUsers(collection);
}

main().catch( err => {
    console.error('An error ocurred:', err);
})


const users = [
    {
      _id: nanoid(6),
      name: 'user',
      email: 'ai@mail.com',
      password: 'zxasqw12',
    },
  ];