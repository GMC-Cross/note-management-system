import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const MainLayout = () => {
  const { theme, toggleTheme, displayName } = useContext(AppContext);

  // Logic CSS đổi màu nền và màu chữ theo state theme
  const isDark = theme === 'dark';

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: isDark ? '#121212' : '#ffffff',
        color: isDark ? '#ffffff' : '#1a1a1a',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Sidebar chứa link điều hướng */}
      <aside
        style={{
          width: '240px',
          padding: '20px',
          borderRight: isDark ? '1px solid #333' : '1px solid #e0e0e0',
          backgroundColor: isDark ? '#1e1e1e' : '#f8f9fa',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
        }}
      >
        <div>
          <h3 style={{ marginTop: 0 }}>Ứng Dụng</h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              🏠 Home
            </Link>
            <Link to="/settings" style={{ color: 'inherit', textDecoration: 'none' }}>
              ⚙️ Cài đặt
            </Link>
            <Link to="/private" style={{ color: 'inherit', textDecoration: 'none' }}>
              🔒 Vùng kín
            </Link>
          </nav>
        </div>

        <div style={{ paddingTop: '20px', borderTop: isDark ? '1px solid #333' : '1px solid #ddd' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
            Xin chào: <strong>{displayName}</strong>
          </p>
          <button
            onClick={toggleTheme}
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: isDark ? '#f0f0f0' : '#333333',
              color: isDark ? '#333333' : '#ffffff',
              width: '100%',
              fontWeight: 'bold',
            }}
          >
            Chế độ: {theme.toUpperCase()}
          </button>
        </div>
      </aside>

      {/* Vùng hiển thị trang nội dung */}
      <main style={{ flex: 1, padding: '24px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
