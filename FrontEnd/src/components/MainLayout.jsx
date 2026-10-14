import React, { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  FileText,
  Lock,
  Settings,
  Notebook,
  Sun,
  Moon,
  User,
} from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function MainLayout() {
  const { displayName, theme, toggleTheme } = useContext(AppContext);

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-200">
      {/* Sidebar bên trái */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo ứng dụng */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Notebook className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base text-slate-800 dark:text-white leading-tight">
                My Notes
              </h1>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Workspace cá nhân
              </p>
            </div>
          </div>

          {/* Menu Điều Hướng */}
          <nav className="flex flex-col gap-1.5">
            <NavLink to="/" className={navItemClass}>
              <FileText className="w-4 h-4" />
              <span>Ghi chú thường</span>
            </NavLink>

            <NavLink to="/private" className={navItemClass}>
              <Lock className="w-4 h-4" />
              <span>Vùng riêng tư</span>
            </NavLink>

            <NavLink to="/settings" className={navItemClass}>
              <Settings className="w-4 h-4" />
              <span>Cài đặt hệ thống</span>
            </NavLink>
          </nav>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
              <User className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate max-w-27.5">
              {displayName || "Sinh viên"}
            </span>
          </div>

          <button
            onClick={toggleTheme}
            title="Đổi giao diện"
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      </aside>

      {/* main */}
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
