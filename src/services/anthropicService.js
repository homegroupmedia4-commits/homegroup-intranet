export async function sendChatMessage(messages) {
  try {
    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!res.ok) throw new Error("Erreur API");

    return await res.json();
  } catch (err) {
    console.error(err);
    return { reply: "Erreur serveur IA" };
  }
}