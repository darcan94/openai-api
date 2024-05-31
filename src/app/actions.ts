'use server'
import { google } from "@ai-sdk/google";
import { CoreMessage, streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

export async function continueConversation(messages: CoreMessage[]){
    const result = await streamText({
        model: google("models/gemini-1.5-pro-latest"),
        messages
    });

    const stream = createStreamableValue(result.textStream);
    return stream.value;
}