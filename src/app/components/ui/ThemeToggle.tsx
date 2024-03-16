"use client";
import { useTheme } from "next-themes";
import { Button } from "@/app/components/ui/Button";
import { IconMoon, IconSun, IconSystem } from "@/app/components/ui/Icons";

export default function ThemeToggle({
  setOpen,
}: {
  setOpen: (isOpen: boolean) => void;
}) {
  const { setTheme } = useTheme();

  const handleCloseDialog = (theme: string) => {
    setTheme(theme);
    setOpen(false);
  };

  return (
    <div className="absolute bottom-2 left-8 flex flex-col items-start rounded-md bg-background px-2 py-5 shadow-md">
      <Button variant="ghost" onClick={() => handleCloseDialog("dark")}>
        <IconMoon />
        <span className="ml-3 font-light">Dark</span>
        <span className="sr-only">Toggle Dark theme</span>
      </Button>

      <Button variant="ghost" onClick={() => handleCloseDialog("system")}>
        <IconSystem />
        <span className="ml-3 font-light">System</span>
        <span className="sr-only">Toggle system theme</span>
      </Button>

      <Button variant="ghost" onClick={() => handleCloseDialog("light")}>
        <IconSun />
        <span className="ml-3 font-light">Light</span>
        <span className="sr-only">Toggle dark theme</span>
      </Button>
    </div>
  );
}
