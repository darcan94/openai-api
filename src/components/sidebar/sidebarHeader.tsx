import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { IconClearChat } from "@/components/ui/Icons";
import { SidebarToggle } from "@/components/sidebar/sidebarToggle";

export default function SidebarHeader({state}: {state: string}){
    const router = useRouter();
    return (
        <div className="flex flex-col gap-6">
            <SidebarToggle />
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
                    New Chat
                </span>
                <span className="sr-only">New Chat</span>
            </Button>
        </div>
    )
}