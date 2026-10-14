import fs from "fs";
import bcrypt from "bcryptjs";
import { profilePath, privatePath } from "../config/storage.js";

export const authenticate = (req, res) => {
  try {
    const profile = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    const inputPassword = req.body.password || "";

    // dịch mã brypt nếu chưa mã hoá thì so sánh trực tiếp
    const isMatch = profile.password.startsWith("$2")
      ? bcrypt.compareSync(inputPassword, profile.password)
      : profile.password === inputPassword;

    if (isMatch) {
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
    const data = fs.readFileSync(privatePath, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ message: "Lỗi đọc ghi chú riêng tư" });
  }
};

export const createPrivateNote = (req, res) => {
  try {
    let notes = JSON.parse(fs.readFileSync(privatePath, "utf8"));
    const newNote = {
      id: Date.now().toString(),
      title: req.body.title || "Lưu bút mật",
      content: req.body.content || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    notes.push(newNote);
    fs.writeFileSync(privatePath, JSON.stringify(notes, null, 2), "utf8");
    res.json({ success: true, note: newNote });
  } catch (error) {
    res.status(500).json({ message: "Lỗi thêm ghi chú kín" });
  }
};

export const updatePrivateNote = (req, res) => {
  try {
    let notes = JSON.parse(fs.readFileSync(privatePath, "utf8"));
    const index = notes.findIndex((n) => n.id === req.params.id);
    if (index !== -1) {
      notes[index].title = req.body.title;
      notes[index].content = req.body.content;
      notes[index].updatedAt = new Date().toISOString();
      fs.writeFileSync(privatePath, JSON.stringify(notes, null, 2), "utf8");
      return res.json({
        success: true,
        message: "Đã sửa ghi chú kín thành công",
      });
    }
    res.status(404).json({ message: "Không tìm thấy ghi chú kín" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật ghi chú kín" });
  }
};

export const deletePrivateNote = (req, res) => {
  try {
    let notes = JSON.parse(fs.readFileSync(privatePath, "utf8"));
    const newNotes = notes.filter(
      (n) => String(n.id || n._id) !== String(req.params.id),
    );
    fs.writeFileSync(privatePath, JSON.stringify(newNotes, null, 2), "utf8");
    res.json({ success: true, message: "Đã xóa ghi chú kín thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa ghi chú kín" });
  }
};
