'use client'
import { useTheme } from "next-themes";
import { Button } from "@/app/components/ui/Button";
import { IconMoon, IconSun, IconSystem } from "@/app/components/ui/Icons";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function ThemeToggle(){
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex justify-center">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTheme('dark')}
                className={clsx("rounded-full", {
                     "bg-background": mounted && theme === 'dark' 
                })}>
                    <IconMoon/>
                    <span className="sr-only">Toggle light theme</span>
            </Button>

            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTheme('system')}
                className={clsx("rounded-full", {
                    "bg-background": mounted && theme === 'system' 
               })}>
                    <IconSystem/>
                    <span className="sr-only">Toggle system theme</span>
            </Button>

            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTheme('light')}
                className={clsx("rounded-full", {
                    "bg-background": mounted && theme === 'light' 
                })}>
                    <IconSun/>
                    <span className="sr-only">Toggle dark theme</span>
            </Button>
        </div>
        
    );
}