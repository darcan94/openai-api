"use client"
import { useLocalStorage } from "@/hooks/useLocalStorage";
import DropDown from "@/components/dropDown";

export interface Model{
  model: string;
  path: string;
}

const models = [
  { model: "openai: gpt-4o", path: "chat" },
  { model: "gemini-pro", path: "chatGemini" },
];

export default function ModelSelector() {  
  const LOCAL_STORAGE_KEY = "modelSelected";
  const [
    selectedModel,
    setSelectedModel
  ] = useLocalStorage(LOCAL_STORAGE_KEY, { model: "gpt-3.5", path: "chat" });

  const handleModelSelect = (model: { model: string, path: string}) => {
    setSelectedModel(model);
  }

  return <DropDown 
            onSelect={ handleModelSelect } 
            models={models}
            selectedModel={ selectedModel } 
        />
}