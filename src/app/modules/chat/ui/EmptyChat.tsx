import { Button } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/Icons";

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

export default function EmptyChat({ setInput }: any) {
  return (
    <div className=" flex max-w-80 mx-auto items-center justify-center h-full">
      <div className="flex flex-col p-2 h-1/2">
        <h1 className="font-semibold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
          Welcome to AI Chatbot!
        </h1>
        <p className="text-2xl text-font">
          You can start a conversation here or try the following examples:
        </p>
        <div className="flex flex-wrap mt-16 gap-4 items-center">
          {exampleMessages.map((message, index) => (
            <div key={index} className="bg-secondary flex-1 h-24 rounded-lg shadow-md dark:shadow-none">
              <Button
                variant="link"
                className="h-auto p-0 text-base text-primary dark:text-primary-300 text-left"
                onClick={() => setInput(message.message)}
              >
                {message.heading}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}