import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface CodeBlockProps{
    value: string;
    language: string;
}

export default function CodeBlock({value, language}: CodeBlockProps){
    return(
        <SyntaxHighlighter language={ language } style={ coldarkDark }>
            { value }
        </SyntaxHighlighter>
    );
}
