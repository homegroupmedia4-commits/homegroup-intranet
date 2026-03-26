const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://com.home-group.fr/api";

export const api = {
  get: async (url) => {
    const res = await fetch(`${BASE_URL}${url}`);
    return res.json();
  },

  post: async (url, data) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  delete: async (url) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE"
    });
    return res.json();
  }
};
