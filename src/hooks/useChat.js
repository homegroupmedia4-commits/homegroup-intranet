import { useState } from "react";

export default function useChat() {
  const [messages, setMessages] = useState([
    "Bonjour 👋 Pose ta question sur l'organisation",
  ]);

  const sendMessage = async (text) => {
    if (!text) return;

    // message user
    setMessages((prev) => [...prev, "🧑 " + text]);

    // FAKE réponse IA (pour l'instant)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        "🤖 Réponse IA (démo)",
      ]);
    }, 500);
  };

  return {
    messages,
    sendMessage,
  };
}