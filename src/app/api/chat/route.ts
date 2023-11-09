import { connectDB } from "@/app/modules/chats/infra/db";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

//export const runtime = "edge";

export const POST = async (request: Request) => {
  const { messages, id } = await request.json();

  const collection = await connectDB();

  const chat = await collection.findOne({ _id: id });

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    max_tokens: 400,
    temperature: 0,
    stream: true,
  });

  const stream = OpenAIStream(response, {
    onCompletion: async (completion) => {
      if (!chat) {
        const _id = id;
        const title = messages[1].content.substring(0, 100);
        const createdAt = Date.now();
        const payload = {
          _id,
          title,
          createdAt,
          messages: [
            ...messages,
            {
              content: completion,
              role: "assistant",
            },
          ],
        };

        collection.insertOne(payload);
      } else {
        collection.updateOne(
          { _id: id },
          {
            $set: {
              messages: [
                ...messages,
                {
                  content: completion,
                  role: "assistant",
                },
              ],
            },
          },
        );
      }
    },
  });

  return new StreamingTextResponse(stream);
};
