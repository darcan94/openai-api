import { type Message } from "ai";
import styles from "./bubble.module.css";

export default function Bubble({message}: {message: Message}){
    const bubbleClass = message.role === 'user' ? 'userBubble' : 'assistantBubble';

    return(
        <div key={message.id} className={`${styles.chatBubble} ${styles[bubbleClass]}`}>
            <p>{message.content}</p>
        </div>
    )
}