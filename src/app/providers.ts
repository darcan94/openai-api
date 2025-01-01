import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';

export const providers = {
  'openai': openai('gpt-4o'),
  'google': google('models/gemini-1.5-pro-latest'),
  'claude': anthropic('claude-3-5-sonnet')
}