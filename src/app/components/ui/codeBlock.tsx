import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCopy, IconCheck } from "@/app/components/ui/Icons";
import useClipboard from "@/app/hooks/useClipboard";
import { Button } from "@/app/components/ui/Button";

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
    <div className="rounded-lg my-4 bg-zinc-800 font-sans">
      <div className="flex items-center justify-between rounded-se-lg rounded-ss-lg bg-zinc-800 px-6 py-2 text-zinc-100">
        <span>{language}</span>
        <div className="flex">
          <Button variant="ghost" size="iconsm" onClick={onCopy}>
            {isCopied ? <IconCheck /> : <IconCopy />}
            <span className="sr-only">Copy code</span>
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
          background: "transparent"
        }}
        codeTagProps={{
          style: {
            fontSize: ".8rem",
          },
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
