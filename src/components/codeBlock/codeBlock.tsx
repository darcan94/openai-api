import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface CodeBlockProps{
    value: string;
    language: string;
}

export default function CodeBlock({value, language}: CodeBlockProps){
     return (
        <div className="relative w-full font-sans codeblock bg-zinc-950 rounded-lg">
            <div className="flex items-center justify-between w-full px-6 py-2 pr-4 bg-zinc-800 text-zinc-100 rounded-ss-lg rounded-se-lg">
                <span className="text-xs lowercase">{language}</span>
            </div>
            <SyntaxHighlighter 
                language={ language } 
                style={ coldarkDark }
                showLineNumbers
                PreTag="div"
                customStyle={{
                    margin: 0,
                    width: '100%',
                    background: 'transparent',
                    padding: '1.5rem 1rem'
                }}
                codeTagProps={{
                    style: {
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-mono)'
                    }
                }}>
                    { value }
            </SyntaxHighlighter>
        </div>
    )
}
