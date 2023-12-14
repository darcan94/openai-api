'use client'
import { useTheme } from "next-themes";
import { Button } from "@/app/components/ui/Button";
import { IconMoon, IconSun } from "@/app/components/ui/Icons";

export default function ThemeToggle(){
    const {theme, setTheme} = useTheme();
    
    return (
        <Button 
            variant="ghost"
            size="icon"
            onClick={() => {
                setTheme(theme === 'light' ? 'dark' : 'light')
            }}>
             { theme === 'dark' ? <IconSun/> : <IconMoon/>}
             <span className="sr-only">Toggle theme</span>
        </Button>
    );
}