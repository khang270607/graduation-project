## utils/

- **Mô tả:** Chứa các hàm tiện ích chung (utility functions) giúp tái sử dụng trong nhiều phần của ứng dụng.
- **Chức năng:**
  - Xử lý chuỗi (string manipulation), số (number formatting), ngày tháng (date formatting).
  - Các hàm hỗ trợ như debounce, throttle, validate dữ liệu đầu vào.
  - Các hàm helper liên quan đến logic không thuộc về một component cụ thể.
- **Ví dụ:**
  - `formatDate.ts`: Hàm định dạng ngày tháng.
  - `debounce.ts`: Hàm debounce để tối ưu hiệu suất.
  - `storage.ts`: Hàm lưu trữ và lấy dữ liệu từ AsyncStorage.
