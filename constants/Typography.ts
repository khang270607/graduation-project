// typography.ts
/**
 * Định nghĩa các kiểu chữ, kích thước font, fontFamily, và các thông số liên quan
 */
export const Typography = {
  // fontSize: Xác định kích thước font chữ cho các cấp độ khác nhau.
  // Các giá trị này được sử dụng để đảm bảo tính nhất quán về kích thước chữ trên toàn bộ ứng dụng.
  fontSize: {
    small: 12, // Kích thước chữ nhỏ, thường dùng cho chú thích hoặc văn bản phụ.
    regular: 14, // Kích thước chữ tiêu chuẩn, phù hợp cho văn bản chính.
    medium: 16, // Kích thước chữ trung bình, có thể dùng cho tiêu đề phụ.
    large: 20, // Kích thước chữ lớn, dùng cho tiêu đề hoặc phần cần nổi bật.
    xlarge: 24, // Kích thước chữ cực lớn, thường dùng cho tiêu đề chính hoặc những đoạn văn bản quan trọng.
  },

  // lineHeight: Định nghĩa khoảng cách giữa các dòng chữ.
  // Giá trị này giúp cải thiện khả năng đọc và tạo ra khoảng cách hợp lý giữa các dòng text.
  lineHeight: {
    small: 16, // Khoảng cách dòng cho văn bản nhỏ.
    regular: 20, // Khoảng cách dòng tiêu chuẩn cho văn bản thông thường.
    medium: 24, // Khoảng cách dòng cho văn bản có kích thước trung bình, đảm bảo không bị chật chội.
    large: 28, // Khoảng cách dòng cho văn bản lớn, tạo sự thoáng đãng cho các tiêu đề hoặc nội dung quan trọng.
  },
}
