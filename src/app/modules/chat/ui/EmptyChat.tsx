import { getSamplePrompts } from "@/app/actions";
import {Session} from "next-auth";
import { useEffect, useState } from "react";
interface SamplePrompt{
  title: string;
  prompt: string;
}

export default function EmptyChat({ setInput, session }: {setInput: any, session: Session | null}) {
  const [ samplePrompts, setSamplePrompts ] = useState<SamplePrompt[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { prompts}  = await getSamplePrompts();
      setSamplePrompts(prompts)
    }

    fetchData();
  }, []);

  return (
    
    <div className=" flex max-w-80 mx-auto items-center justify-center h-full">
      <div className="flex flex-col p-2 h-1/2 justify-center">
        <h1 className="font-semibold text-5xl leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
          Welcome { session?.user?.name }
        </h1>
        <p className="text-2xl text-font">
          You can start a conversation here or try the following examples:
        </p>
        <div className="flex flex-wrap mt-16 gap-4 items-center">
          {samplePrompts?.map((p, index) => (
            <button
                key={index}
                onClick={() => setInput(p.prompt)}
                className="p-2 text-start cursor-pointer border border-secondary dark:bg-secondary flex-1 h-24 rounded-lg shadow-sm dark:shadow-none">
              <span className="text-sm text-primary dark:text-primary-300">
                {p.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}