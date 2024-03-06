const models = [
    { model: 'gpt-3.5', path: 'chat' },
    { model: 'gemini-pro', path: 'chatGemini' }
];

export default function ModelSelector(){
    return(
        <div className="rounded-md p-2 text-xl w-fit bg-background">
            <select name="select" className="bg-transparent focus:outline-none">
                { models.map( model => (
                    <option 
                        key={model.path} 
                        value={model.path}
                        className="bg-background">
                            {model.model}
                    </option>
                ))}
            </select>
        </div>
    );
}