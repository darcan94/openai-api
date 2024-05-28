import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { IconClearChat } from "@/components/ui/Icons";

export default function SidebarHeader({state}: {state: string}){
    const router = useRouter();
    return (
        <div id="sidebar-header" className="flex flex-col gap-6">            
            <Button
                variant="rounded"
                size="lg2"
                className="w-max bg-background-alpha hover:bg-background"
                onClick={(e) => {
                    e.preventDefault();
                    router.push("/");
                }}
                >
                <IconClearChat />
                <span
                    data-state={state}
                    className="mr-2 font-normal data-[state=closed]:hidden"
                >
                    {state && 'New Chat'}
                </span>
                <span className="sr-only">New Chat</span>
            </Button>
        </div>
    )
}