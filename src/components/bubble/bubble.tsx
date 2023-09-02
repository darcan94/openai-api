import { type Message } from "ai";
import styles from "./bubble.module.css";
import CodeBlock from "@/components/codeBlock/codeBlock";

export default function Bubble({message}: {message: Message}){

    const bubbleClass = message.role === 'user' ? 'userBubble' : 'assistantBubble';
    const segments = message.content.split(/(```[\s\S]*?```)/g);    

    return(
        <div key={message.id} className={`${styles.chatBubble} ${styles[bubbleClass]}`}>
           {segments.map((segment, index) => {
                if( message.role === 'assistant' && /^```[\s\S]*$/.test(segment)){
                    const language = segment.split('\n')[0].replace('```', '');
                    const code = segment.replace(/```/g, '');
                    return <CodeBlock key={index} value={code} language={language || ''}/>
                }
                
                const formattedSegments = segment.split(/(`[^`]+`)/g).map((part, i) => {
                      return part.startsWith('`') ? <b key={i}>{part}</b> : part;
                });
                    
                return <p key={index}>{ formattedSegments }</p>;           
           })}
        </div>
    )
}