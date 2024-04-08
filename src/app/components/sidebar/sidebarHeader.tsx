import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/Button";
import { IconClearChat } from "@/app/components/ui/Icons";
import { SidebarToggle } from "@/app/components/sidebar/sidebarToggle";

export default function SidebaHeader({state}: {state: string}){
    const router = useRouter();
    return (
        <div className="flex flex-col gap-6">
            <SidebarToggle />
            <Button
                variant="rounded"
                size="lg2"
                className="w-max bg-background"
                onClick={(e) => {
                    e.preventDefault();
                    router.push("/chat");
                }}
                >
                <IconClearChat />
                <span
                    data-state={state}
                    className="mr-2 font-normal data-[state=closed]:hidden"
                >
                    New Chat
                </span>
                <span className="sr-only">New Chat</span>
            </Button>
        </div>
    )
}