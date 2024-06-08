'use server'
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

export async function getSamplePrompts(){
    const {object: prompts} = await generateObject({
        model: google("models/gemini-1.5-pro-latest"),
        schema: z.object({
            prompts: z.array(
                z.object({
                    title: z.string(),
                    prompt: z.string()
                })
            )
        }),
        prompt: 'Generate four sample basic prompts for LLM',
        mode: 'json',
        maxRetries: 1
    })

    return  prompts ;
}