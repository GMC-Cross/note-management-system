import React, { createContext, useState, useEffect } from "react";
import { profileService } from "../services/profileService";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [displayName, setDisplayName] = useState("Sinh viên");
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);

  // lấy dữ liệu từ BE
  useEffect(() => {
    profileService
      .getProfile()
      .then((data) => {
        if (data) {
          if (data.displayName) setDisplayName(data.displayName);
          if (data.theme) setTheme(data.theme);
        }
      })
      .catch((err) => console.error("Lỗi khởi tạo Profile từ Backend:", err))
      .finally(() => setLoading(false));
  }, []);

  // đổi theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <AppContext.Provider
      value={{
        displayName,
        setDisplayName,
        theme,
        setTheme,
        toggleTheme,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
