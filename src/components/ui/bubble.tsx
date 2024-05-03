import { type Message } from "ai";
import CodeBlock from "@/components/ui/codeBlock";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { MemoizedMarkdown } from "@/components/markdown/memoizedMarkdown";
import { Button } from "@/components/ui/Button";
import { IconCheck, IconCopy } from "@/components/ui/Icons";
import useClipboard from "@/hooks/useClipboard";

export default function Bubble({ message }: { message: Message }) {
  const { isCopied, copyToClipboard } = useClipboard({ timeout: 3000 });
  const isUser = message.role === "user";

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(message.content);
  };

  return (
    <div
      key={message.id}
      className={"hover:group-hover group w-full p-3 text-font"}>
      
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
            const isEmoji = getEmojiPattern().test(`${children}`);
            return isEmoji ? (
              <span className="text-6xl">{children}</span>
            ) : (
              <p className="mb-2 last:mb-0">{children}</p>
            );
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
    </div>
  );
}

function getEmojiPattern() {
  return /^(?:[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2702}-\u{27B0}\u{24C2}-\u{1F251}\u{1F900}-\u{1F9FF}\u{1F650}-\u{1F67F}\u{2600}-\u{26FF}]*[\n\r]*)+$/gu;
}
