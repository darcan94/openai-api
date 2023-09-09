import { type Message } from "ai";
import styles from "./bubble.module.css";
import CodeBlock from "@/components/codeBlock/codeBlock";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { MemoMarkdown } from "../markdown/memoMarkdown";

export default function Bubble({message}: {message: Message}){

    const bubbleClass = message.role === 'user' ? 'userBubble' : 'assistantBubble';

    return(
        <div key={message.id} className={`${styles.chatBubble} ${styles[bubbleClass]}`}>           
                 <MemoMarkdown 
                        key={message.id}
                        remarkPlugins={[remarkGfm, remarkMath]}
                        components={{
                            p({ children }) {
                                return <p className="mb-2 last:mb-0">{children}</p>
                            },
                            code({ node, inline, className, children, ...props }){
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <CodeBlock 
                                        key={message.id}
                                        language={match[1]}
                                        value={String(children).replace(/\n$/, '')}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                )
                            }
                        }}>
                            {message.content}
                </MemoMarkdown>
        </div>
    )
}