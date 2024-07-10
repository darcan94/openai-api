import Button from "@/components/ui/Button";
import { IconArrowDown } from "@/components/ui/Icons";
import Bubble from "@/components/ui/bubble";
import { useAutoScroll, useScrollDetection, useScrollToBottom } from "@/hooks/useScroll";
import { type Message } from "ai";
import Image from "next/image";
import { useEffect } from "react";

export default function ChatList({ messages }: { messages: Message[] }) {
  const chatListRef = useAutoScroll(messages);
  const isAtBottom = useScrollDetection(chatListRef);
  const scrollToBottom = useScrollToBottom(chatListRef);

  useEffect(() => {
    const ref = chatListRef.current;
    ref?.scrollTo({top: ref.scrollHeight})
  })

  return (
    <div  ref={chatListRef} className="flex xl:w-9/12 mx-auto h-full flex-col gap-4 px-2 pt-10 pb-24 overflow-y-auto overflow-x-hidden">
      {messages.map((message, index) => 
        {
          if(Array.isArray(message.content) && message.content.length > 1 && 'image' in message.content[1])
            return (
              <div key={index}>
                <Bubble message={{id: message.id, role: message.role, content: message.content[0].text}} />
                <Image 
                  width={32} 
                  height={32} 
                  src={message.content[1].image} 
                  alt="Image Preview" 
                  className="rounded-xl w-8/12 md:w-6/12 lg:w-4/12"/>
              </div>
            )

          return <Bubble key={index} message={message} />
        }        
      )}
      
      {!isAtBottom && (
        <Button
          variant="rounded"
          className="absolute bottom-28 right-6 z-10 bg-secondary"
          size="iconlg"
          onClick={scrollToBottom}
        >
          <IconArrowDown />
          <span className="sr-only">Go to bottom page</span>
        </Button>
      )}
    </div>
  );
}


/* 
(<Bubble key={index} message={message} />)

  typeof message.content === 'object'
                        ? (
                          <>
                            {message.content[0].text}
                            <Image width={6} height={4} src={message.content[1].image} alt="Image Preview" className="w-36 h-28 object-cover rounded-[20px]"/>
                          </>
                        )
                        : message.content
*/