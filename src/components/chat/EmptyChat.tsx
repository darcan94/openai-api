import { Button } from "@/components/ui/button/Button"
import { IconArrowRight } from "@/components/ui/icons/Icons"

const exampleMessages = [
    {
      heading: 'Explain technical concepts',
      message: {
        role: 'user',
        constent:'What is a "serverless function"?'
      }
    },
    {
      heading: 'Summarize an article',
      message: {
        role: 'user',
        constent: 'Summarize the following article for a 2nd grader: \n'
      }
    },
    {
      heading: 'Draft an email',
      message: {
        role: 'user',
        consten: 'Draft an email to my boss about the following: \n'
      }
    }
  ]

export default function EmptyChat({ setMessages } : any){
    return (
        <div className="mx-auto max-w-2xl px-4">
          <div className="bg-secondary rounded-lg dark:border-none p-8">
            <h1 className="mb-2 text-font font-semibold">
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
                  onClick={() => setMessages(message.message)}
                >
                  <IconArrowRight />
                  {message.heading}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )
}