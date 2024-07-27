'use client'
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Option{
    value: string;
    label: string;
}

interface Props {
    options: Option[];
    localStorageKey: string;
    defaultOption: Option;
}

export default function Dropdown({ options, localStorageKey, defaultOption }: Props){
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ selectedOption, setSelectedOption ] = useLocalStorage<Option>(localStorageKey, defaultOption);
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

    const handleSelect = (option: Option) => {
        setSelectedOption(option);
        setIsOpen(false);
    }

    return (
        <div className="relative w-64" ref={dropdownRef}>
            <button 
                onClick={ handleToggle }
                className="w-full p-2 rounded-md shadow-sm flex items-center  focus:outline-none hover:text-highlight">

                    <span className="truncate">
                        {selectedOption.label}
                    </span>

            </button>

            <AnimatePresence>

                { isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 w-full mx-2 mt-1 bg-secondary rounded-md shadow-md p-1">

                        { options.map((option) => (
                            <li 
                                key={option.value}
                                onClick={() => handleSelect(option)}
                                className="px-4 py-2 list-none hover:bg-background">
                                    { option.label }
                            </li>
                        )) }

                    </motion.ul>    
                )}

            </AnimatePresence>
        </div>
    )
} 