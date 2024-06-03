'use client'
import { useState } from "react";
import Button from "@/components/ui/Button";
import { ConfigIcon } from "@/components/ui/Icons";

export default function ModelConfig(){
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (    
    <div className="relative">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          <ConfigIcon />
          <span className="sr-only">Model Config</span>
        </Button>

        <dialog open={isOpen}
          className="space-y-6 absolute top-48 -left-36 backdrop:bg-black/70 fixed inset-0 space-y-8 p-6 rounded-lg bg-secondary shadow-lg">
            <SettingInput min={50} max={2024} step={1} title="tokens">Max Tokens</SettingInput>
            <SettingInput min={0} max={2} step={.1} title="temperature">Temperature</SettingInput>
            <SettingInput min={0} max={1} step={.1} title="topP">Top P</SettingInput>             
        </dialog>
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
                <label htmlFor={title}>{children}</label>
                <input 
                    value={value} 
                    type="number" 
                    className="w-16 appearance-none rounded-md px-2 text-sm bg-secondary border border-white/20" 
                    min={min} 
                    max={max} 
                    onChange={handleChangeValue}/>
            </div>
            <input onChange={handleChangeValue} value={value} id={title} type="range" min={min} max={max} step={step} className="w-full"/>    
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