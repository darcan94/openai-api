import Chat from "@/components/chat/chat";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const chatId = uuidv4();
  return (
    <>
      <Header />
      <main className="mx-auto my-0 flex h-screen w-full justify-end pt-[4rem]">
        <Sidebar key="history" className="w-1/4">
          <h1>History</h1>
        </Sidebar>
        <Chat id={ chatId }/>
      </main>
    </>
  );
}
