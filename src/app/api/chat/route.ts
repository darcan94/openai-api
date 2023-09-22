import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

export const POST = async (request: Request) => {
  const { messages } = await request.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    max_tokens: 400,
    temperature: 0,
    stream: true,
  });

  const stream = OpenAIStream(response, {
    onCompletion: async (completion) => {
      const title = messages[1].content.substring(0, 100);
      const createdAt = Date.now();
      const payload = {
        title, 
        createdAt,
        messages: [
          ...messages, 
          {
            content: completion, 
            role: 'assistant'
          }
        ]
      }    
    }
  });

  return new StreamingTextResponse(stream);
};
