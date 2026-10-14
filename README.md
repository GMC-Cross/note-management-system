# ĐỒ ÁN MÔN HỌC: HỆ THỐNG QUẢN LÝ GHI CHÚ VÀ THÔNG TIN RIÊNG TƯ

> Ứng dụng Single Page Application (SPA) hỗ trợ ghi chép, phân loại theo chủ đề và bảo mật thông tin nhạy cảm lưu trữ dạng File System.

---

## THÔNG TIN THỰC HIỆN

- **Giảng viên hướng dẫn:** Nguyễn Hoàng Việt
- **Nhóm thực hiện:**
- **Thành viên:**
  1. **Bùi Thành Đạt** - 0306231099 - _Vai trò:_ Fullstack Developer , PM , QA&QC
  2. **Phạm Mai Trọng Hiếu** - 0306241194 - _Vai trò:_ Presenter , Technical Writer , Designer

---

## CÔNG NGHỆ SỬ DỤNG

### 1. Frontend

- **Framework:** ReactJS (khởi tạo với Vite).
- **Styling:** Tailwind CSS, Lucide React (Bộ icon hiện đại).
- **Điều hướng & Quản lý State:** React Router DOM (v6), React Context API.
- **Kiểm thực dữ liệu (Validation):** Yup.

### 2. Backend

- **Nền tảng:** Node.js & Express.js.
- **Kiến trúc:** Layered / MVC Architecture (Tách biệt Route, Controller, Config).
- **Bảo mật:** `bcryptjs` (Băm mật khẩu 1 chiều cho vùng riêng tư).
- **Cơ sở dữ liệu:** File System (`fs`) lưu trữ cục bộ dưới định dạng `.json`.

---

## YÊU CẦU MÔI TRƯỜNG

- Máy tính đã cài đặt **Node.js** (phiên bản `v16.0.0` trở lên, khuyến nghị LTS).
- Trình quản lý gói **npm** (đi kèm Node.js).
- Trình duyệt khuyến nghị: **Google Chrome** hoặc **Microsoft Edge**.

---

## HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN

Dự án gồm 2 phần độc lập (**Backend** và **Frontend**). Vui lòng mở **2 cửa sổ Terminal** riêng biệt để chạy song song:

# sử dụng **git clone https://github.com/GMC-Cross/note-management-system.git** để cập nhật code mới nhất từ nhóm

### Bước 1: Khởi động Backend (Máy chủ API)

Mở **Terminal 1**, di chuyển vào thư mục `Backend` và chạy các lệnh:

- cd Backend
- npm install
- npm run dev / npm start

### Bước 2: Khởi động Frontend (Giao diện)

Mở **Terminal 2**, di chuyển vào thư mục Frontend và chạy các lệnh:

- cd Frontend
- npm install
- npm run dev
  Giao diện web sẽ khởi chạy tại: http://localhost:5173 (hoặc cổng hiển thị trên Terminal).

Mở liên kết trên bằng trình duyệt để trải nghiệm ứng dụng.

## THÔNG TIN DEMO & MẬT KHẨU VÙNG KÍN

Ứng dụng hoạt động theo cơ chế Local Workspace cá nhân, không yêu cầu đăng nhập tài khoản.

Mật khẩu Vùng riêng tư mặc định: 123456

Thay đổi mật khẩu: Truy cập menu "Cài đặt hệ thống" (/settings) để cập nhật tên hiển thị, chuyển đổi giao diện Sáng/Tối hoặc thiết lập mật khẩu mới (Mật khẩu được mã hóa an toàn bằng Bcrypt trước khi ghi đĩa).

## CẤU TRÚC LƯU TRỮ DỮ LIỆU

Toàn bộ dữ liệu của hệ thống được quản lý trong thư mục Backend/data/:

Backend/data/
├── profile.json # Lưu cấu hình: displayName, theme, password (hash)
├── private.json # Lưu danh sách ghi chú vùng kín
└── notes/ # Thư mục chứa ghi chú công khai theo chủ đề
├── hoc-tap.json
├── cong-viec.json
└── ca-nhan.json

# Lưu ý: Vui lòng không xóa thư mục data/ trong lúc ứng dụng đang chạy.

## CÁC CHỨC NĂNG CHÍNH ĐÃ HOÀN THIỆN

- Cài đặt & Cá nhân hóa (Sprint 1): Cập nhật Tên hiển thị, thay đổi Theme Sáng/Tối (Real-time).

- Ghi chú thông thường (Sprint 2): Phân loại ghi chú theo từng chủ đề (Học tập, Công việc, Cá nhân) với đầy đủ thao tác Thêm, Sửa, Xóa (CRUD).

- Bảo mật & Vùng riêng tư (Sprint 3):

- Lớp bảo vệ (Password Guard) chặn truy cập dữ liệu mật.

- Cơ chế tự động khóa màn hình bảo vệ mỗi khi tải lại trang (F5).

- Đổi mật khẩu có xác thực mật khẩu cũ và mã hóa chuẩn Bcrypt.

---
