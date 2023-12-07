'use client'
import { useTheme } from "next-themes";
import { Button } from "@/app/components/ui/button/Button";
import { useTransition } from "react";
import { IconMoon, IconSun } from "@/app/components/ui/icons/Icons";

export default function ThemeToggle(){
    const {theme, setTheme} = useTheme();
    const [_, startTransition] = useTransition();

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
                <IconMoon />
            ): (
                <IconSun />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}