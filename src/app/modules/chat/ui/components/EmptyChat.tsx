import { Button } from "@/app/components/ui/button/Button";
import { IconArrowRight } from "@/app/components/ui/icons/Icons";

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
    <div className="mx-auto mb-48 max-w-2xl px-4">
      <div className="rounded-lg bg-secondary p-8 dark:border-none">
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
              className="h-auto p-0 text-base text-custom-blue"
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
