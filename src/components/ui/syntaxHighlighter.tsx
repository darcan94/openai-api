import { Highlight } from 'prism-react-renderer';

export default function SyntaxHighlighter({ code, language, showLineNumbers}: any){    
    return (
        <Highlight code={code} language={language}>
            {({ className, tokens, getLineProps, getTokenProps }) => (                
                <pre className={`${className} overflow-x-scroll p-2`} >
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
                </pre>
            )}
        </Highlight>    
    );
}