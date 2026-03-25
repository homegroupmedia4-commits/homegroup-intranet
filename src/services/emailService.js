export async function sendQRS(data) {
  try {
    const res = await fetch("http://localhost:3000/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}