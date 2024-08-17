import Dropdown from "./dropDown";

interface Option{
  value: string;
  label: string;
}

const options: Option[] = [
  { label: 'gpt-4o', value: 'chat' },
  { label: 'gemini-1.5-pro-latest', value: 'gemini' },
  { label: 'claude-3-5-sonnet', value: 'claude' }
];

export default function ModelSelector() {  
  return (
    <Dropdown 
      options={options}
      defaultOption={ options[0] } 
      localStorageKey="model"
    />
  )
}