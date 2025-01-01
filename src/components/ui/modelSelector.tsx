import Dropdown from "@/components/ui/dropDown";

interface Option{
  value: string;
  label: string;
}

const options: Option[] = [
  { label: 'gpt-4o', value: 'openai' },
  { label: 'gemini-1.5-pro-latest', value: 'google' },
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