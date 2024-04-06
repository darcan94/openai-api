import { Button } from "@/app/components/ui/Button";
import { IconArrowRight } from "@/app/components/ui/Icons";

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
    <div className="mx-auto max-w-2xl flex items-center justify-center h-full">
      <div className="rounded-lg bg-secondary p-8 dark:border-none shadow-lg dark:shadow-none">
        <h1 className="mb-2 font-semibold text-font">
          Welcome to Open AI Chatbot!
        </h1>
        <p className="leading-normal text-font">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base text-primary-300"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
