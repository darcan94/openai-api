import { FC, memo, useState } from "react";

const models = [
  { model: "gpt-3.5", path: "chat" },
  { model: "gemini-pro", path: "chatGemini" },
];

interface DropDownProps {
  selectedModel: { model: string, path: string};
  onSelect: ( model:{ model: string, path: string} ) => void;
}

function DropDown({ onSelect, selectedModel }: DropDownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (model: { model: string, path: string}) => {
    onSelect(model);
    setIsOpen(false);
  };

  return (
    <div className="reelative w-full rounded-md bg-background-alpha p-2 text-xl text-font backdrop-blur-md">
        <button
          type="button"
          className="flex items-center w-full focus:outline-none hover:bg-background-beta transition duration-200 ease-in-out"
          onClick={handleClick}
        >
          <span>{ selectedModel.model }</span>
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.293l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414-1.414L10 11.707l-4.707-4.707z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
        <ul
          className="absolute m-2 w-max left-0 rounded-md shadow-md bg-secondary transition duration-300 ease-in-out"
        >
          {models.map((model) => (
            <li
              key={model.path}
              className="px-4 py-2 cursor-default list-none"
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

export const MemoizedDropDown: FC<DropDownProps> = memo(
  DropDown,
  (prevProps, nextProps) =>
    prevProps.selectedModel.path === nextProps.selectedModel.path
);
