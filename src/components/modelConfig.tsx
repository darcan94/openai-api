'use client'
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { ConfigIcon } from "@/components/ui/Icons";
import { motion, AnimatePresence } from "framer-motion";

export default function ModelConfig(){
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
          <ConfigIcon />
          <span className="sr-only">Model Config</span>
        </Button>

        <AnimatePresence>
            { isOpen && (           
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute w-max mx-2 bg-secondary rounded-md shadow-md p-4 right-0 space-y-6">
                
                        <Input min={50} max={2024} step={1} value={50}>Max Tokens</Input>
                        <Input min={0} max={2} step={.1}>Temperature</Input>
                        <Input min={0} max={1} step={.1}>Top P</Input>
                        
                </motion.div>
            )}
        </AnimatePresence>
    </div>
      
  );
}

interface Props{
    children: string;
    value?: number;
    min: number;
    max: number;
    step: number;
}

function Input({min, max, step, children}: Props){
    const [value, setValue] = useState<number>(0);

    const handleChangeValue = (evt:React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(evt.target.value);
        setValue(value);
    }

    return(
        <div>            
            <label className="w-full gap-4 flex justify-between items-center">
                <code className="text-xs">{ children }</code>
                <input 
                    value={value} 
                    type="number" 
                    min={min} 
                    max={max} 
                    onChange={handleChangeValue}
                    className="text-xs w-16 appearance-none rounded-md px-2 bg-transparent border border-gray-300 dark:border-gray-600"/>
            </label>

            <input 
                value={value} 
                type="range" 
                min={min} 
                max={max} 
                step={step} 
                onChange={handleChangeValue} 
                className="w-full h-1 accent-primary"/>                
        </div>  
    )
}