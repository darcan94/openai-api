'use client'
import { useTheme } from "next-themes";
import { Button } from "../button/Button";
import { useTransition } from "react";
import { IconMoon, IconSun } from "../icons/Icons";

export default function ThemeToggle(){
    const {theme, setTheme} = useTheme();
    const [_, startTransition] = useTransition();

    return (
        <Button 
            variant="ghost"
            size="icon"
            onClick={() => {
                startTransition(() => {
                    setTheme(theme === 'ligth' ? 'dark' : 'ligth')
                })
            }}>
            {
                !theme ? null : theme === 'dark' ? (
                    <IconMoon />
                ): (
                    <IconSun />
                )
            }
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}