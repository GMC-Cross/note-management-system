const BASE_URL = "http://localhost:5000/api/profile";

export const profileService = {
  // 1. Lấy thongp tin profile
  getProfile: async () => {
    const res = await fetch(BASE_URL);
    return res.json();
  },

  // 2. Cập nhật profile
  updateProfile: async (data) => {
    const res = await fetch(BASE_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
