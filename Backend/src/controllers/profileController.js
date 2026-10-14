import fs from "fs";
import bcrypt from "bcryptjs";
import { profilePath } from "../config/storage.js";

//  Lấy thông tin
export const getProfile = (req, res) => {
  try {
    const rawData = fs.readFileSync(profilePath, "utf8");
    const profile = JSON.parse(rawData);

    // bỏ password trước khi gửi về client
    const { password, ...safeProfile } = profile;
    res.json(safeProfile);
  } catch (error) {
    res.status(500).json({ message: "Lỗi đọc file profile" });
  }
};

// 2. Cập nhật cấu hình & Đổi mật khẩu có xác nhận, mã hóa bcrypt
export const updateProfile = (req, res) => {
  try {
    const {
      displayName,
      theme,
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;
    let profile = JSON.parse(fs.readFileSync(profilePath, "utf8"));

    // Cập nhật tên hiển thị và giao diện
    if (displayName) profile.displayName = displayName;
    if (theme) profile.theme = theme;

    // Nếu người dùng có nhu cầu đổi mật khẩu
    if (newPassword || currentPassword) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message:
            "Vui lòng nhập đầy đủ mật khẩu hiện tại, mật khẩu mới và xác nhận mật khẩu!",
        });
      }

      // So khớp mật khẩu hiện tại (hỗ trợ cả hash bcrypt và mật khẩu thô cũ)
      const isMatch = profile.password.startsWith("$2")
        ? bcrypt.compareSync(currentPassword, profile.password)
        : profile.password === currentPassword;

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Mật khẩu hiện tại không chính xác!",
        });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Mật khẩu xác nhận không khớp!",
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Mật khẩu mới phải từ 6 ký tự trở lên!",
        });
      }

      // Băm mật khẩu mới bằng bcrypt trước khi lưu
      const salt = bcrypt.genSaltSync(10);
      profile.password = bcrypt.hashSync(newPassword, salt);
    }

    // Ghi đè cấu hình mới vào profile.json
    fs.writeFileSync(profilePath, JSON.stringify(profile, null, 2), "utf8");
    res.json({ success: true, message: "Cập nhật thông tin thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật profile" });
  }
};
