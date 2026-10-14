import React, { useState } from "react";
import { Lock, KeyRound } from "lucide-react";

export default function PasswordModal({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setErrorMsg("");

    const isSuccess = await onUnlock(password);
    if (!isSuccess) {
      setErrorMsg("Mật khẩu không chính xác! Vui lòng thử lại.");
      setPassword("");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto my-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl text-center">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center mb-5">
        <Lock className="w-7 h-7" />
      </div>

      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1.5">
        Khu vực riêng tư
      </h2>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
        Nhập mật khẩu đã thiết lập ở trang Cài đặt để mở khóa vùng dữ liệu này.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="relative">
            <input
              type="password"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full px-4 py-3 pl-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition"
            />
            <KeyRound className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          </div>
          {errorMsg && (
            <p className="text-xs text-red-500 mt-2 font-medium">{errorMsg}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition shadow-md shadow-red-500/20 disabled:opacity-50"
        >
          {loading ? "Đang xác thực..." : "Mở khóa ngay"}
        </button>
      </form>
    </div>
  );
}
