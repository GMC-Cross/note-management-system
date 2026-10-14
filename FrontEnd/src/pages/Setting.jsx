import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { profileService } from "../services/profileService";
import { Save, Lock, ShieldCheck } from "lucide-react";

export default function Settings() {
  const { setTheme, setDisplayName } = useContext(AppContext);

  // 1. thông tin profile
  const [basicInfo, setBasicInfo] = useState({
    displayName: "",
    theme: "light",
  });

  // 2. đổi mật khẩu
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // Lấy dữ liệu
  useEffect(() => {
    profileService.getProfile().then((data) => {
      if (data) {
        setBasicInfo({
          displayName: data.displayName || "",
          theme: data.theme || "light",
        });
        if (data.theme) setTheme(data.theme);
        if (data.displayName) setDisplayName(data.displayName);
      }
    });
  }, [setTheme, setDisplayName]);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    // kiểm tra nếu đổi mật khẩu
    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword) {
        alert("Vui lòng nhập mật khẩu hiện tại để xác thực!");
        setLoading(false);
        return;
      }
      if (newPassword.length < 6) {
        alert("Mật khẩu mới phải có độ dài từ 6 ký tự trở lên!");
        setLoading(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        alert("Mật khẩu xác nhận không trùng khớp với mật khẩu mới!");
        setLoading(false);
        return;
      }
    }

    try {
      // gửi dữ liệu vào BE
      const payload = {
        displayName: basicInfo.displayName,
        theme: basicInfo.theme,
        ...(newPassword
          ? { currentPassword, newPassword, confirmPassword }
          : {}),
      };

      const res = await profileService.updateProfile(payload);

      if (res && res.success !== false) {
        alert("Đã lưu thông tin cài đặt thành công!");
        setTheme(basicInfo.theme);
        setDisplayName(basicInfo.displayName);

        // reset form
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        alert(res.message || "Không thể cập nhật cấu hình!");
      }
    } catch {
      alert("Lỗi kết nối máy chủ khi lưu cài đặt!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="pb-5 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-blue-600" /> Cài đặt hệ thống
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Cập nhật thông tin hồ sơ và mật khẩu bảo vệ vùng riêng tư
        </p>
      </div>
      <form onSubmit={handleSave} autoComplete="off" className="space-y-6">
        {/* form thông tin */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Thông tin hiển thị
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Tên hiển thị
            </label>
            <input
              name="displayName"
              value={basicInfo.displayName}
              onChange={(e) =>
                setBasicInfo({ ...basicInfo, displayName: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Giao diện ứng dụng
            </label>
            <select
              name="theme"
              value={basicInfo.theme}
              onChange={(e) =>
                setBasicInfo({ ...basicInfo, theme: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="light">Sáng (Light Mode)</option>
              <option value="dark">Tối (Dark Mode)</option>
            </select>
          </div>
        </div>

        {/* form đổi mật khẩu */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-red-500" />
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Đổi mật khẩu vùng kín
            </h3>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500"></p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Mật khẩu hiện tại
            </label>
            <input
              type="password"
              name="currentPassword"
              autoComplete="new-password"
              placeholder="Nhập mật khẩu đang dùng..."
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Mật khẩu mới
            </label>
            <input
              type="password"
              name="newPassword"
              autoComplete="new-password"
              placeholder="Tối thiểu 6 ký tự..."
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="Nhập lại mật khẩu mới..."
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Nút lưu */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition shadow-md shadow-blue-500/20 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? "Đang cập nhật..." : "Lưu tất cả thay đổi"}</span>
        </button>
      </form>
    </div>
  );
}
