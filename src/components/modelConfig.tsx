'use client'
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { ConfigIcon } from "@/components/ui/Icons";
import { motion, AnimatePresence } from "framer-motion";

export interface Config{
    maxTokens: number;
    temperature: number;
    topP: number;
}

interface ConfigContextType {
    config: Config;
    setConfig: (config: Config) => void;
    resetToDefault: () => void;
}

const defaultConfig: Config = {
    maxTokens: 300,
    temperature: 1.0,
    topP: 0.5
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);


export const ConfigProvider: React.FC<{ children: React.ReactNode}> = ({children}) => {
    const [config, setConfigState] = useState<Config>(defaultConfig);

    const setConfig = (newConfig: Config) => {
        setConfigState(newConfig);
    };

    const resetToDefault = () => {
        setConfigState(defaultConfig);
    };

    return (
      <ConfigContext.Provider value={{config, setConfig, resetToDefault }}>
        {children}
      </ConfigContext.Provider>
    );
}

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
}


export default function ModelConfig(){
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { config, setConfig } = useConfig();
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setConfig({
        ...config,
        [name]: parseFloat(value),
    });
  }

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
                    className="absolute w-max md:w-80 mx-2 bg-secondary rounded-md shadow-md p-4 right-0 space-y-6">                        
                    
                            <Input 
                                name="maxTokens"
                                min={50} 
                                max={2024} 
                                step={1} 
                                value={config.maxTokens}
                                onChange={handleConfigChange}>
                                    Max Tokens
                            </Input>

                            <Input 
                                name="temperature"
                                min={0} 
                                max={2} 
                                step={.1}
                                value={config.temperature}
                                onChange={handleConfigChange}>
                                    Temperature
                            </Input>

                            <Input 
                                name="topP"
                                min={0} 
                                max={1} 
                                step={.1}
                                value={config.topP}
                                onChange={handleConfigChange}>
                                    Top P
                            </Input>                        
                        
                </motion.div>
            )}
        </AnimatePresence>
    </div>
      
  );
}

interface Props{
    children: string;
    name?: string;
    value?: number;
    min: number;
    max: number;
    step: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({min, max, step, children, name, value, onChange}: Props){

    return(
        <div>            
            <label className="w-full gap-4 flex justify-between items-center">
                <code className="text-sm">{ children }</code>
                <input 
                    name={name}
                    value={value} 
                    type="number" 
                    min={min} 
                    max={max} 
                    step={step}
                    onChange={onChange}
                    className="text-sm text-right w-16 appearance-none rounded-md px-2 bg-transparent border border-gray-300 dark:border-gray-600"/>
            </label>

            <input 
                name={name}
                value={value} 
                type="range" 
                min={min} 
                max={max} 
                step={step} 
                onChange={onChange} 
                className="w-full h-1 accent-primary"/>                
        </div>  
    )
}