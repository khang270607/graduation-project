## services/

- **Mô tả:** Chứa các logic liên quan đến API hoặc các dịch vụ khác.
- **Chức năng:**
  - Quản lý gọi API (fetching data).
  - Tương tác với cơ sở dữ liệu hoặc storage.
  - Xử lý xác thực người dùng.
  - Kết nối với các dịch vụ bên thứ ba (third-party services) như Firebase, Stripe, v.v.
- **Ví dụ:**
  - `authService.ts`: Hàm đăng nhập, đăng ký, xác thực token.
  - `apiService.ts`: Hàm gọi API chung sử dụng `fetch` hoặc `axios`.
  - `notificationService.ts`: Quản lý thông báo đẩy (push notification).
