const BASE_URL = "http://localhost:5000/api/notes";

export const noteService = {
  getByTopic: async (topic) => {
    const res = await fetch(`${BASE_URL}/${topic}`);
    return res.json();
  },
  create: async (topic, data) => {
    const res = await fetch(`${BASE_URL}/${topic}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  update: async (topic, id, data) => {
    const res = await fetch(`${BASE_URL}/${topic}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  delete: async (topic, id) => {
    const res = await fetch(`${BASE_URL}/${topic}/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};
