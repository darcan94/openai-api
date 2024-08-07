import { useTheme } from "next-themes";
import Button from "@/components/ui/Button";
import { IconMoon, IconSun, IconSystem } from "@/components/ui/Icons";

interface Props{
  setOpen: (isOpen: boolean) => void;
}

export default function ThemeToggle({ setOpen }: Props) {
  const { setTheme } = useTheme();

  const handleCloseDialog = (theme: string) => {
    setTheme(theme);
    setOpen(false);
  };

  return (
    <>
      <div className="w-full hover:bg-secondary rounded-md">
        <Button className="" variant="ghost" onClick={() => handleCloseDialog("dark")}>
          <IconMoon />
          <span className="ml-3 font-light">Dark</span>
          <span className="sr-only">Toggle Dark theme</span>
        </Button>
      </div>

      <div className="w-full hover:bg-secondary rounded-md">
        <Button variant="ghost" onClick={() => handleCloseDialog("system")}>
          <IconSystem />
          <span className="ml-3 font-light">System</span>
          <span className="sr-only">Toggle system theme</span>
        </Button>
      </div>

      <div className="w-full hover:bg-secondary rounded-md">
        <Button variant="ghost" onClick={() => handleCloseDialog("light")}>
          <IconSun />
          <span className="ml-3 font-light">Light</span>
          <span className="sr-only">Toggle dark theme</span>
        </Button>
      </div>
    </>
  );
}
