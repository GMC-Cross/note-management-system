import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [displayName, setDisplayName] = useState('Phạm Mai Trọng Hiếu');
  const [theme, setTheme] = useState('light'); // 'light' hoặc 'dark'

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppContext.Provider value={{ displayName, setDisplayName, theme, setTheme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};
