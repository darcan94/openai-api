import Chat from "@/components/chat/chat";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const chatId = uuidv4();

  return <Chat id={ chatId }/>;
}
