import { useTheme } from 'next-themes';
import { Highlight, themes } from 'prism-react-renderer';

interface Props{
    code: string;
    language: string;
    showLineNumbers: boolean;
}

export default function SyntaxHighlighter({ code, language, showLineNumbers = false}: Props){    
    const { resolvedTheme } = useTheme();
    
    return (
        <Highlight 
            code={code} 
            language={language} 
            theme={ resolvedTheme === 'dark' ?  themes.oneDark : themes.oneLight}>
            {
                ({ tokens, getLineProps, getTokenProps }) => (
                    <pre className="overflow-x-scroll p-2 space-y-1" >
                        {tokens.map((line, i) => (
                            <div key={ i } {...getLineProps({ line })}>

                                { showLineNumbers && 
                                    <small className="text-gray-600 mr-4 select-none">
                                        {i + 1}
                                    </small>
                                }

                                { 
                                    line.map((token, key) => <span key={key} {...getTokenProps({ token })} />)
                                }
                            </div>
                        ))}
                    </pre>
                )
            }
        </Highlight>    
    );
}