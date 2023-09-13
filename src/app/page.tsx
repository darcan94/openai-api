import Chat from "@/components/chat/chat";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-[4rem] flex h-screen justify-end w-full my-0 mx-auto">
        <Sidebar key="history" className="w-1/4">
          <h1>History</h1>
        </Sidebar>
        <Chat />
      </main>
    </>
  )
}
