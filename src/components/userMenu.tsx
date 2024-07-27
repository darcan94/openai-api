'use client'
import { ReactNode, useState } from "react";
import Button from "@/components/ui/Button";
import Avatar from "./avatar";
import { Session } from "next-auth";

export default function UserMenu({session, children}: {session: Session | null, children: ReactNode}) {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center w-max relative z-10">
      <Button variant="ghost" size="iconlg" onClick={() => setOpen(!isOpen)}>
        <Avatar session={session}/>
        <span className="sr-only">Settings</span>
      </Button>
      {isOpen && 
        <div className="w-max absolute top-12 right-0 flex items-start flex-col rounded-md bg-secondary px-2 py-2 shadow-md">
            { children }
        </div>}
    </div>
  );
}
