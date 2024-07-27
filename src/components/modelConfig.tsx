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

        { isOpen && (
            <AnimatePresence>
              <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 w-max mx-2 mt-1 bg-secondary rounded-md shadow-md p-2 right-0 space-y-4">
              
                    <SettingInput min={50} max={2024} step={1} title="tokens" value={50}>Max Tokens</SettingInput>
                    <SettingInput min={0} max={2} step={.1} title="temperature">Temperature</SettingInput>
                    <SettingInput min={0} max={1} step={.1} title="topP">Top P</SettingInput>
              </motion.div>
            </AnimatePresence>
        )}
    </div>
      
  );
}

function SettingInput({min, max, step, title, children}: SettingProps){
    const [value, setValue] = useState<number>(0);

    const handleChangeValue = (evt:React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(evt.target.value);
        setValue(value);
    }

    return(
        <div className="space-y-2">
            <div className="flex gap-4 justify-between items-center">
                <label className="text-xs" htmlFor={title}>{children}</label>
                <input 
                    name={title}
                    value={value} 
                    type="number" 
                    className="text-xs w-16 appearance-none rounded-md px-2 bg-secondary border border-white/20" 
                    min={min} 
                    max={max} 
                    onChange={handleChangeValue}/>
            </div>
            <input onChange={handleChangeValue} value={value} id={title} type="range" min={min} max={max} step={step} className="w-full border-1"/>    
        </div>  
    )
}

interface SettingProps{
    min: number;
    max: number;
    step: number;
    value?: number;
    title: string;
    children: React.ReactNode;
}