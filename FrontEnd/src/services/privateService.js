const BASE_URL = "http://localhost:5000/api/private";

export const privateService = {
  // Xác thực mật khẩu: POST /api/private/auth
  verifyPassword: async (password) => {
    const res = await fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    return res.json();
  },

  // Lấy danh sách ghi chú kín: GET /api/private
  getAll: async () => {
    const res = await fetch(BASE_URL);
    return res.json();
  },

  // Thêm ghi chú kín: POST /api/private
  create: async (data) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Sửa ghi chú kín: PUT /api/private/:id
  update: async (id, data) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Xóa ghi chú kín: DELETE /api/private/:id
  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};
