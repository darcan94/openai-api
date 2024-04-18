import { IconCopy, IconCheck } from "@/components/ui/Icons";
import useClipboard from "@/hooks/useClipboard";
import { Button } from "@/components/ui/Button";
import SyntaxHighlighter from "@/components/ui/syntaxHighlighter";

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
    <div className="rounded-lg m-2 bg-zinc-800 font-sans">
      <div className="flex items-center justify-between rounded-se-lg rounded-ss-lg bg-zinc-800 p-2 text-zinc-100">
        <span>{language}</span>
        <div className="flex">
          <Button variant="ghost" size="iconsm" onClick={onCopy}>
            {isCopied ? <IconCheck /> : <IconCopy />}
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
      </div>
      <SyntaxHighlighter language={language} code={value} showLineNumbers/>
    </div>
  );
}