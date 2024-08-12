import { type Message } from "ai";
import CodeBlock from "@/components/ui/codeBlock";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { MemoizedMarkdown } from "@/components/memoizedMarkdown";
import Button from "@/components/ui/Button";
import { IconCheck, IconCopy } from "@/components/ui/Icons";
import useClipboard from "@/hooks/useClipboard";
import Image from "next/image";

export default function Bubble({ message }: { message: Message }) {
  const { isCopied, copyToClipboard } = useClipboard({ timeout: 3000 });
  const isUser = message.role === "user";

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(message.content);
  };

  return (
    <div
      id={ message.id }
      className="hover:group-hover group w-full p-3 text-font font-sans font-extralight">
      
      <div className="flex relative justify-between items-center h-6 w-full">
        <p className="font-bold">{ isUser ? "You" : "AI"}</p>
        <div className="hidden group-hover:block h-full absolute right-0">
          <Button variant="ghost" size="iconsm" onClick={onCopy}>
            {isCopied ? <IconCheck /> : <IconCopy />}
            <span className="sr-only">Copy message</span>
          </Button>
        </div>
      </div>

      <MemoizedMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p({ children }) {
            return <p className="mb-2 last:mb-0">{children}</p>
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            if(inline){
                return(
                    <code className={className} {...props}>
                        { children }
                    </code>
                )
            }

            return (
                <CodeBlock
                    key={message.id}
                    language={ (match && match[1]) || "" }
                    value={String(children).replace(/\n$/, "")}
                />
            )
          },
        }}
      >
        {message.content}
      </MemoizedMarkdown>
      {
        message.experimental_attachments && (
          <Image 
            width={32} 
            height={32} 
            src={message.experimental_attachments[0].url} 
            alt="Image Preview" 
            className="rounded-xl w-8/12 md:w-6/12 lg:w-4/12"/>
        )
      }
    </div>
  );
}
