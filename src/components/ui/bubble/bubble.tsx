import { type Message } from "ai";
import CodeBlock from "@/components/ui/codeBlock/codeBlock";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { MemoizedMarkdown } from "@/components/markdown/memoizedMarkdown";
import { Button } from "@/components/ui/button/Button";
import { IconCheck, IconCopy } from "@/components/ui/icons/Icons";
import useClipboard from "@/hooks/useClipboard";
import clsx from "clsx";

export default function Bubble({ message }: { message: Message }) {
  const { isCopied, copyToClipboard } = useClipboard({ timeout: 3000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(message.content);
  };

  return (
    <div
      key={message.id}
      className={clsx("hover:group-hover group relative w-auto max-w-80 rounded-2xl p-3",
        {
          "self-end bg-gradient-to-r from-custom-blue to-primary text-white rounded-br-none": message.role === "user",
          "self-start pt-4 bg-secondary text-font rounded-bl-none shadow-md dark:shadow-none": message.role === "assistant"
        })
      }>
        
      {message.role !== "user" && (
        <div className="absolute right-2 top-1 hidden group-hover:block">
          <Button variant="ghost" size="iconsm" onClick={onCopy}>
            {isCopied ? <IconCheck /> : <IconCopy />}
          </Button>
        </div>
      )}

      <MemoizedMarkdown
        key={message.id}
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p({ children }) {
            const isEmoji = getEmojiPattern().test(`${children}`);
            return isEmoji 
              ? <span className="text-6xl">{children}</span> 
              : <p className="mb-2 last:mb-0">{children}</p>
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <CodeBlock
                key={message.id}
                language={match[1]}
                value={String(children).replace(/\n$/, "")}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
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