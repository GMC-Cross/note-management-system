import fs from "fs";
import { profilePath, privateNotesFile } from "../config/storage.js";

export const authenticate = (req, res) => {
  try {
    const profile = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    if (profile.password === req.body.password) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Sai mật khẩu!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống xác thực" });
  }
};

export const getPrivateNotes = (req, res) => {
  try {
    const data = fs.readFileSync(privateNotesFile, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ message: "Lỗi đọc ghi chú riêng tư" });
  }
};

export const createPrivateNote = (req, res) => {
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
};
