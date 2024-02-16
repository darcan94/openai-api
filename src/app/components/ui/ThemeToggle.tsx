'use client'
import { useTheme } from "next-themes";
import { Button } from "@/app/components/ui/Button";
import { IconMoon, IconSetting, IconSun, IconSystem } from "@/app/components/ui/Icons";
import clsx from "clsx";
import { useState } from "react";

export default function ThemeToggle(){
    const {theme, setTheme} = useTheme();
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = (theme: string) => {
        setTheme(theme);
        setOpenDialog(false);
    };
    return (
        <div className="relative">
            <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleOpenDialog}>
                        <IconSetting/>
                        <span className="sr-only">Settings</span>
            </Button>
           { openDialog && <div className="absolute left-10 bottom-0 py-5 px-2 rounded-md shadow-md flex flex-col items-start bg-background">
                <Button 
                    variant="ghost" 
                    onClick={() => handleCloseDialog('dark')}
                    className={clsx("rounded-full", {"bg-background": theme === 'dark'})}>
                        <IconMoon/>
                        <span className="ml-3">Dark</span>
                        <span className="sr-only">Toggle light theme</span>
                </Button>

                <Button 
                    variant="ghost" 
                    onClick={() => handleCloseDialog('system')}
                    className={clsx("rounded-full", { "bg-background": theme === 'system'})}>
                        <IconSystem/>
                        <span className="ml-3">System</span>
                        <span className="sr-only">Toggle system theme</span>
                </Button>

                <Button 
                    variant="ghost" 
                    onClick={() => handleCloseDialog('light')}
                    className={clsx("rounded-full", {"bg-background": theme === 'light'})}>
                        <IconSun/>
                        <span className="ml-3">Light</span>
                        <span className="sr-only">Toggle dark theme</span>
                </Button>
            </div>}
        </div>
    );
}