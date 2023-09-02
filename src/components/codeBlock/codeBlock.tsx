import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface CodeBlockProps{
    value: string;
    language: string;
    isCode: boolean;
}

export default function CodeBlock({value, language, isCode}: CodeBlockProps){
     return isCode ? (
        <SyntaxHighlighter language={ language } style={ coldarkDark }>
            { value }
        </SyntaxHighlighter>
    )
    : (
        <p>{value}</p>
    )
    ;
}
