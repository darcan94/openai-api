const models = [
  { model: "gpt-3.5", path: "chat" },
  { model: "gemini-pro", path: "chatGemini" },
];

export default function DropDown() {
  return (
    <div className="w-full rounded-md bg-background-alpha p-2 text-xl text-font backdrop-blur-md">
      <select name="select" className="bg-transparent focus:outline-none">
        {models.map((model) => (
          <option key={model.path} value={model.path} className="bg-background text-font">
            {model.model}
          </option>
        ))}
      </select>
    </div>
  );
}
