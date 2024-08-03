import {Session} from "next-auth";

const exampleMessages = [
  {
    heading: "Explain technical concepts",
    message: 'What is a "serverless function"?',
  },
  {
    heading: "Summarize an article",
    message: "Summarize the following article for a 2nd grader: \n",
  },
  {
    heading: "Draft an email",
    message: "Draft an email to my boss about the following: \n",
  },
];

export default function EmptyChat({ setInput, session }: {setInput: any, session: Session | null}) {
  return (
    <div className=" flex max-w-80 mx-auto items-center justify-center h-full">
      <div className="flex flex-col p-2 h-1/2 justify-center">
        <h1 className="font-semibold text-responsive leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
          Welcome { session?.user?.name }
        </h1>
        <p className="text-xl text-font">
          You can start a conversation here or try the following examples:
        </p>
        <div className="flex flex-wrap mt-16 gap-4 items-center">
          {exampleMessages.map((message, index) => (
            <button
                key={index}
                onClick={() => setInput(message.message)}
                className="p-2 text-start cursor-pointer border border-secondary dark:bg-secondary flex-1 h-24 rounded-lg shadow-sm dark:shadow-none">
              <span
                className="text-sm text-font"
                onClick={() => setInput(message.message)}
              >
                {message.heading}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}