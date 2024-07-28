'use client'
import { ReactNode, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Avatar from "./avatar";
import { Session } from "next-auth";
import { motion, AnimatePresence } from "framer-motion";

export default function UserMenu({session, children}: {session: Session | null, children: ReactNode}) {

  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = ( event : MouseEvent) => {
        if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
            setIsOpen(false);
        }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = (): void => setIsOpen(!isOpen);

  return (
    <div className="relative" ref={dropdownRef}>
      
      <Button variant="ghost" size="iconlg" onClick={handleToggle}>
        <Avatar session={ session }/>
        <span className="sr-only">Settings</span>
      </Button>

      { isOpen && (
        <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-max mx-2 mt-1 bg-secondary rounded-md shadow-md p-1 right-0">
                { children }
            </motion.div>
        </AnimatePresence>
      )}

    </div>
  );
}
