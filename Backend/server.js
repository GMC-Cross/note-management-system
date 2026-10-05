const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());
const profilePath = path.join(__dirname, "data", "profile.json");
app.get("/api/profile", (req, res) => {
  try {
    const rawData = fs.readFileSync(profilePath, "utf8");
    const profile = JSON.parse(rawData);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Lỗi đọc file" });
  }
});
app.put("/api/profile", (req, res) => {
  try {
    const newProfile = req.body;
    fs.writeFileSync(profilePath, JSON.stringify(newProfile, null, 2), "utf8");
    res.json({ success: true, message: "Đã cập nhật Profile" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi ghi file" });
  }
});

const notesDir = path.join(__dirname, "data", "notes");
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir, { recursive: true });
}

const getFilePath = (topic) => path.join(notesDir, `${topic}.json`);

app.get("/api/notes/:topic", (req, res) => {
  const filePath = getFilePath(req.params.topic);
  try {
    if (fs.existsSync(filePath)) {
      return res.json([]);
    }
    const data = fs.readFileSync(filePath, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ message: "Lỗi đọc file" });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Backend chạy tại http://localhost:${PORT}`),
);

/**
 * ============================================================================
 * MODULE: BẢO MẬT & GHI CHÚ RIÊNG TƯ (PRIVATE NOTES)
 * Author: Bùi THành Đạt
 * Date: 5/10/26
 * Description: API kiểm tra mật khẩu và quản lý file private.json
 * ============================================================================
 */
const privateNotesFile = path.join(__dirname, "data", "private.json");
// Khởi tạo file private.json nếu chưa tồn tại
if (!fs.existsSync(privateNotesFile)) {
  fs.writeFileSync(privateNotesFile, "[]", "utf8");
}
// 1. API Xác thực mật khẩu
app.post("/api/private/auth", (req, res) => {
  try {
    const profile = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    // Kiểm tra pass truyền lên có khớp với pass trong profile không
    if (profile.password === req.body.password) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Sai mật khẩu!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống xác thực" });
  }
});
// 2. API Lấy danh sách Ghi chú riêng tư
app.get("/api/private/notes", (req, res) => {
  try {
    const data = fs.readFileSync(privateNotesFile, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ message: "Lỗi đọc ghi chú riêng tư" });
  }
});
// 3. API Thêm Ghi chú riêng tư
app.post("/api/private/notes", (req, res) => {
  try {
    let notes = JSON.parse(fs.readFileSync(privateNotesFile, "utf8"));
    const newNote = {
      id: Date.now().toString(),
      title: req.body.title || "Lưu bút mật",
      content: req.body.content || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    notes.push(newNote);
    fs.writeFileSync(privateNotesFile, JSON.stringify(notes, null, 2), "utf8");
    res.json({ success: true, note: newNote });
  } catch (error) {
    res.status(500).json({ message: "Lỗi thêm ghi chú kín" });
  }
});
