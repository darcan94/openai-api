import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface CodeBlockProps{
    value: string;
    languaje: string;
}

export default function CodeBlock({value, languaje}: CodeBlockProps){
    return(
        <SyntaxHighlighter languaje={ languaje } styles={ coldarkDark }>
            { value }
        </SyntaxHighlighter>
    );
}