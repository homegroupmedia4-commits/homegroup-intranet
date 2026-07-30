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

const getAuthHeader = () => {
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
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
      headers: isFormData
        ? { ...getAuthHeader() }
        : { "Content-Type": "application/json", ...getAuthHeader() },
      body: isFormData ? data : JSON.stringify(data)
    });

    return await safeJson(res);
  },

  put: async (url, data) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify(data)
    });

    return await safeJson(res);
  },

  delete: async (url) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: { ...getAuthHeader() }
    });

    return await safeJson(res);
  }
};
