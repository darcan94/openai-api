import { IconClearChat } from "@/components/ui/Icons";
import { Link } from "next-view-transitions";

export default function SidebarHeader({state}: {state: string}){
    return (         
        <Link 
            href="/"
            className="flex items-center no-underline text-font p-2 rounded-full w-max bg-background-alpha hover:bg-background">
            <IconClearChat />
            <span
                data-state={state}
                className="mr-2 data-[state=closed]:hidden">
                New Chat
            </span>
            <span className="sr-only">New Chat</span>
        </Link>
    )
}