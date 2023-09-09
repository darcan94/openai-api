import { FC, memo } from "react"
import  ReactMarkdown, { Options }  from "react-markdown";

export const MemoMarkdown: FC<Options> = memo(
    ReactMarkdown, (prevProps, nextProps) =>
        prevProps.children === nextProps.children &&
        prevProps.className === nextProps.className
);