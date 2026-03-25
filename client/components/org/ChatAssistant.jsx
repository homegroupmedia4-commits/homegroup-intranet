import useChat from "../../hooks/useChat";

export default function ChatAssistant() {
  const { messages, sendMessage } = useChat();

  return (
    <div className="border p-4 rounded space-y-3">
      <h2 className="font-bold">Assistant IA</h2>

      <div className="h-40 overflow-y-auto bg-gray-50 p-2 rounded">
        {messages.map((msg, i) => (
          <div key={i} className="text-sm">
            {msg}
          </div>
        ))}
      </div>

      <input
        className="border p-2 w-full"
        placeholder="Qui fait quoi ?"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(e.target.value);
            e.target.value = "";
          }
        }}
      />
    </div>
  );
}