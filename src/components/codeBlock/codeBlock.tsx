import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCopy, IconCheck } from "@/components/icons/Icons";
import useClipboard from "@/hooks/useClipboard";
import Button from "@/components/button/Button";

interface CodeBlockProps {
  value: string;
  language: string;
}

export default function CodeBlock({ value, language }: CodeBlockProps) {
  const { isCopied, copyToClipboard } = useClipboard({ timeout: 3000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(value);
  };

  return (
    <div className="codeblock relative my-2 w-full rounded-lg bg-zinc-950 font-sans">
      <div className="flex w-full items-center justify-between rounded-se-lg rounded-ss-lg bg-zinc-800 px-6 py-2 pr-4 text-zinc-100">
        <span className="text-xs lowercase">{language}</span>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="iconsm" onClick={onCopy}>
            {isCopied ? <IconCheck /> : <IconCopy />}
          </Button>
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        showLineNumbers
        PreTag="div"
        customStyle={{
          margin: 0,
          width: "100%",
          background: "transparent",
          padding: "1.5rem 1rem",
          lineHeight: "1.2rem",
        }}
        codeTagProps={{
          style: {
            fontSize: ".8rem",
            fontFamily: "var(--font-mono)",
          },
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
