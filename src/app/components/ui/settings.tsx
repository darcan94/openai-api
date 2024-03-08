import { useState } from "react";
import { Button } from "./Button";
import { IconSetting } from "./Icons";
import ThemeToggle from "./ThemeToggle";

export default function Settings() {
  const [isOpen, setOpen] = useState(false);

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
