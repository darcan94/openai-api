import { type Message } from "ai";
import styles from "./bubble.module.css";
import CodeBlock from "@/components/codeBlock/codeBlock";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { MemoizedMarkdown } from "@/components/markdown/memoizedMarkdown";

export default function Bubble({ message }: { message: Message }) {
  const bubbleClass =
    message.role === "user" ? "userBubble" : "assistantBubble";

  return (
    <div
      key={message.id}
      className={`${styles.chatBubble} ${styles[bubbleClass]}`}
    >
      <MemoizedMarkdown
        key={message.id}
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p({ children }) {
            const isEmoji = getEmojiPattern().test(`${children}`);
            if (isEmoji) {
              return <span className="text-6xl">{children}</span>;
            }
            return <p className="mb-2 last:mb-0">{children}</p>;
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
