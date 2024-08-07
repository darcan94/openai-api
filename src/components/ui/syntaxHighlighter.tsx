import { Highlight } from 'prism-react-renderer';

interface Props{
    code: string;
    language: string;
    showLineNumbers: boolean;
}

export default function SyntaxHighlighter({ code, language, showLineNumbers = false}: Props){    
    return (
        <Highlight code={code} language={language}>
            {({tokens, getLineProps, getTokenProps }) => (
                <div className="overflow-x-scroll p-2" >
                    {tokens.map((line, i) => (
                        <div key={ i } {...getLineProps({ line })}>
                            {showLineNumbers && <small className="text-gray-600 mr-4 select-none">
                                {i + 1}
                            </small>}
                            {line.map((token, key) => {
                                const props = getTokenProps({ token });
                                return <span key={key} {...props} />;
                            })}
                        </div>
                    ))}
                </div>
            )}
        </Highlight>    
    );
}