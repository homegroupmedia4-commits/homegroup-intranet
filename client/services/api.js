const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://com.home-group.fr/api";

const safeJson = async (res) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

export const api = {

  get: async (url) => {
    const res = await fetch(`${BASE_URL}${url}`);
    const data = await safeJson(res);
    return data;
  },

  post: async (url, data) => {
    const isFormData = data instanceof FormData;

    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: isFormData ? {} : { "Content-Type": "application/json" },
      body: isFormData ? data : JSON.stringify(data)
    });

    return await safeJson(res);
  },

  put: async (url, data) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    return await safeJson(res);
  },

  delete: async (url) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE"
    });

    return await safeJson(res);
  }
};
