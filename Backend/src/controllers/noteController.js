import getFilePath from "../config/storage.js";

export const getNote = (req, res) => {
  const filePath = getFilePath(req.params.topic);
  try {
    if (!fs.existsSync(filePath)) return res.json([]);
    const data = fs.readFileSync(filePath, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ message: "Lỗi đọc danh sách ghi chú" });
  }
};

export const createNote = (req, res) => {
  const filePath = getFilePath(req.params.topic);
  try {
    let notes = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf8"))
      : [];

    const newNote = {
      id: Date.now().toString(),
      title: req.body.title || "Không tiêu đề",
      content: req.body.content || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    notes.push(newNote);
    fs.writeFileSync(filePath, JSON.stringify(notes, null, 2), "utf8");
    res.json({ success: true, note: newNote });
  } catch (error) {
    res.status(500).json({ message: "Lỗi thêm ghi chú" });
  }
};

export const updateNote = (req, res) => {
  const filePath = getFilePath(req.params.topic);
  try {
    let notes = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const index = notes.findIndex((n) => n.id === req.params.id);
    if (index !== -1) {
      notes[index].title = req.body.title;
      notes[index].content = req.body.content;
      notes[index].updatedAt = new Date().toISOString();
      fs.writeFileSync(filePath, JSON.stringify(notes, null, 2), "utf8");
      return res.json({ success: true, message: "Đã sửa thành công" });
    }
    res.status(404).json({ message: "Không tìm thấy ghi chú" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật ghi chú" });
  }
};

export const deleteNote = (req, res) => {
  const filePath = getFilePath(req.params.topic);
  try {
    let notes = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const newNotes = notes.filter((n) => n.id !== req.params.id);
    fs.writeFileSync(filePath, JSON.stringify(newNotes, null, 2), "utf8");
    res.json({ success: true, message: "Đã xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa ghi chú" });
  }
};
