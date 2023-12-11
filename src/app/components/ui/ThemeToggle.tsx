'use client'
import { useTheme } from "next-themes";
import { Button } from "@/app/components/ui/Button";
import { useTransition } from "react";
import { IconMoon, IconSun } from "@/app/components/ui/Icons";

export default function ThemeToggle(){
    const {theme, setTheme} = useTheme();
    const [_, startTransition] = useTransition();
    console.log(theme)
    return (
        <Button 
            variant="ghost"
            size="icon"
            onClick={() => {
                startTransition(() => {
                    setTheme(theme === 'light' ? 'dark' : 'light')
                })
            }}>
            {!theme ? null : theme === 'dark' ? (
                <IconSun />
            ): (
                <IconMoon />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}