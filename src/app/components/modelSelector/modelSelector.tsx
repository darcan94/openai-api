export default function ModelSelector(){
    return(
        <div className="rounded-md p-2 text-xl w-fit">
            <select name="select" className="bg-transparent focus:outline-none">
                <option value="chat">gpt-3.5</option>
                <option value="chatGemini">gemini-pro</option>
            </select>
        </div>
    );
}