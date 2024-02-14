'use client'
import { useTheme } from "next-themes";
import { Button } from "@/app/components/ui/Button";
import { IconMoon, IconSun, IconSystem } from "@/app/components/ui/Icons";
import clsx from "clsx";

export default function ThemeToggle(){
    const {theme, setTheme} = useTheme();

    return (
        <div className="flex justify-center">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTheme('dark')}
                className={clsx("rounded-full", {"bg-background": theme === 'dark'})}>
                    <IconMoon/>
                    <span className="sr-only">Toggle light theme</span>
            </Button>

            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTheme('system')}
                className={clsx("rounded-full", { "bg-background": theme === 'system'})}>
                    <IconSystem/>
                    <span className="sr-only">Toggle system theme</span>
            </Button>

            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTheme('light')}
                className={clsx("rounded-full", {"bg-background": theme === 'light'})}>
                    <IconSun/>
                    <span className="sr-only">Toggle dark theme</span>
            </Button>
        </div>
        
    );
}