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

const LOCAL_STORAGE_KEY = "modelSelected";

export default function ModelSelector() {  
  const [
    selectedModel,
    setSelectedModel
  ] = useLocalStorage(LOCAL_STORAGE_KEY, { model: "openai: gpt-4o", path: "chat" });

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
  }

  return <DropDown 
            onSelect={ handleModelSelect } 
            models={models}
            selectedModel={ selectedModel } 
        />
}