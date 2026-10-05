import { profilePath } from "../config/storage.js";

export const getProfile = (req, res) => {
  try {
    const rawData = fs.readFileSync(profilePath, "utf8");
    const profile = JSON.parse(rawData);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Lỗi đọc file" });
  }
};

export const updateProfile = (req, res) => {
  try {
    const newProfile = req.body;
    fs.writeFileSync(profilePath, JSON.stringify(newProfile, null, 2), "utf8");
    res.json({ success: true, message: "Đã cập nhật Profile" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi ghi file" });
  }
};
