import { IconCopy, IconCheck } from "@/components/ui/Icons";
import useClipboard from "@/hooks/useClipboard";
import Button from "@/components/ui/Button";
import SyntaxHighlighter from "@/components/ui/syntaxHighlighter";

interface Props {
  value: string;
  language: string;
}

export default function CodeBlock({ value, language }: Props) {
  const { isCopied, copyToClipboard } = useClipboard({ timeout: 3000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(value);
  };

  return (
    <div className="rounded-lg m-2 bg-zinc-800 font-sans">
      <div className="flex items-center justify-between rounded-se-lg rounded-ss-lg p-2 text-zinc-100">
        <span>{language}</span>
        
        <Button variant="ghost" size="iconsm" onClick={onCopy}>
          {isCopied ? <IconCheck /> : <IconCopy />}
          <span className="sr-only">Copy code</span>
        </Button>        
      </div>
      <SyntaxHighlighter language={language} code={value} showLineNumbers/>
    </div>
  );
}