import { ChangeEvent, FormEvent } from "react";

interface ChatFormProps{
    input: string;
    handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function PromptField({input, handleInputChange, handleSubmit}: ChatFormProps){  
    return(
        <form onSubmit={handleSubmit} className="sticky bottom-0 w-full bg-white/50 backdrop-blur-md p-4">
            <div className="flex bg-slate-50 backdrop-blur-lg rounded-xl p-1">
                <textarea className="bg-transparent resize-none w-11/12 outline-none"
                    value={input} 
                    onChange={handleInputChange} 
                    placeholder="type a message">    
                </textarea>
                <button className="w-1/12" type="submit">
                    <svg className="my-0 mx-auto" width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.8147 12.1969L5.28344 13.4521C5.10705 13.4815 4.95979 13.6029 4.89723 13.7704L2.29933 20.7278C2.05066 21.3673 2.72008 21.9773 3.33375 21.6705L21.3337 12.6705C21.8865 12.3941 21.8865 11.6052 21.3337 11.3288L3.33375 2.32885C2.72008 2.02201 2.05066 2.63206 2.29933 3.2715L4.89723 10.2289C4.95979 10.3964 5.10705 10.5178 5.28344 10.5472L12.8147 11.8024C12.9236 11.8205 12.9972 11.9236 12.9791 12.0325C12.965 12.1168 12.899 12.1829 12.8147 12.1969Z" fill="#174ae4"></path>
                    </svg>
                </button>
            </div>
        </form>
    )
}