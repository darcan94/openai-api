import { useState } from "react";
import Button from "@/components/ui/Button";
import { IconSetting } from "@/components/ui/Icons";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Settings() {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="relative z-10">
      <Button variant="ghost" size="icon" onClick={() => setOpen(!isOpen)}>
        <IconSetting />
        <span className="sr-only">Settings</span>
      </Button>
      {isOpen && <ThemeToggle setOpen={setOpen} />}
    </div>
  );
}
