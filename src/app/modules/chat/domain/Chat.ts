import { Config } from "@/components/modelConfig";
import { Message } from "ai";

export interface Chat {
  id: string;
  title: string;
  createdAt: Date;
  userId?: string;
  config: Config;
  messages: Message[];
}
