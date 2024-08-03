import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { IconSetting } from "@/components/ui/Icons";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export default function Settings() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

      <Button variant="ghost" size="icon" onClick={handleToggle}>
        <IconSetting />
        <span className="sr-only">Settings</span>
      </Button>

      <AnimatePresence>
        { isOpen && (              
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-max mx-10 mt-1 bg-background rounded-md shadow-md p-2 bottom-6">  
                <ThemeToggle setOpen={setIsOpen} />
            </motion.div>  
        )}
      </AnimatePresence>  

    </div>
  );
}