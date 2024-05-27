import { useState } from "react";
import { DropDownIcon } from "@/components/ui/Icons";

const models = [
  { model: "gpt-3.5", path: "chat" },
  { model: "gemini-pro", path: "chatGemini" },
];

interface DropDownProps {
  selectedModel: { model: string, path: string};
  onSelect: ( model:{ model: string, path: string} ) => void;
}

export default function DropDown({ onSelect, selectedModel }: DropDownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (model: { model: string, path: string}) => {
    onSelect(model);
    setIsOpen(false);
  };

  return (
    <div className="relative rounded-md bg-background-alpha p-2 text-font backdrop-blur-md">
        <button
          type="button"
          className="flex items-center w-full focus:outline-none hover:text-highlight"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{ selectedModel.model }</span>
          <DropDownIcon />          
        </button>

        {isOpen && (
        <ul
          className="absolute m-2 p-1 w-max left-0 rounded-md shadow-md bg-secondary">
            {models.map((model) => (
              <li
                key={model.path}
                className="px-4 py-2 cursor-default list-none hover:bg-background"
                onClick={() => handleSelect( model )}
              >
                { model.model }
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
