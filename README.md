# Blog Lập Trình Mạng

Blog cá nhân về lập trình mạng với Java và JavaScript, được xây dựng bằng Hugo static site generator.

## Tính năng

- ✅ Menu điều hướng: Trang Chủ, Blog, Về Tôi
- ✅ Trang chủ với giới thiệu cá nhân và bài viết gần đây
- ✅ Trang Blog với 9 bài viết về Java và JavaScript
- ✅ Trang Về Tôi với thông tin chi tiết
- ✅ Thiết kế hiện đại, responsive (mobile-friendly)
- ✅ SEO tối ưu với meta tags
- ✅ Syntax highlighting cho code
- ✅ Liên kết đến GitHub

## Cài đặt

### Yêu cầu

- [Hugo](https://gohugo.io/) (phiên bản 0.90.0 trở lên)

### Cài đặt Hugo

**Windows:**
```bash
# Sử dụng Chocolatey
choco install hugo

# Hoặc tải từ https://github.com/gohugoio/hugo/releases
```

**macOS:**
```bash
brew install hugo
```

**Linux:**
```bash
sudo apt-get install hugo
```

## Chạy website

1. Clone repository hoặc di chuyển vào thư mục dự án:
```bash
cd LapTrinhMang
```

2. Chạy server phát triển:
```bash
hugo server
```

3. Mở trình duyệt và truy cập: `http://localhost:1313`

## Xây dựng website tĩnh

Để tạo các file HTML tĩnh:

```bash
hugo
```

Các file sẽ được tạo trong thư mục `public/`.

## Cấu trúc dự án

```
LapTrinhMang/
├── config.toml          # Cấu hình Hugo
├── content/             # Nội dung website
│   ├── blog/           # Các bài viết blog
│   └── about/          # Trang về tôi
├── themes/
│   └── network-blog-theme/  # Theme tùy chỉnh
│       ├── layouts/    # Templates HTML
│       └── static/     # CSS, JS, images
└── public/             # Website tĩnh (sau khi build)
```

## Nội dung blog

### Java (5 bài)
1. Java Cơ Bản - Tổng Quan và Làm Quen Môi Trường Java
2. Lập trình Socket trong Java - TCP và UDP
3. Xây dựng ứng dụng Client-Server với Socket trong Java
4. Lập trình UDP Socket Java - DatagramSocket và DatagramPacket
5. Java Core - Lập trình hướng đối tượng trong Java

### JavaScript/Node.js (4 bài)
1. JavaScript Căn Bản - Tổng Quan Ngôn Ngữ và Cú Pháp
2. Promise và Async/Await trong JavaScript - Xử Lý Bất Đồng Bộ
3. Event Loop & Cách JavaScript Hoạt Động
4. Node.js - Hướng Dẫn Cơ Bản và Xây Dựng Server Mạng

## Tùy chỉnh

### Thay đổi thông tin cá nhân

Chỉnh sửa file `config.toml`:
```toml
[params]
  author = "Tên của bạn"
  description = "Mô tả blog"
  github = "https://github.com/username"
```

### Thêm bài viết mới

Tạo file markdown trong `content/blog/`:
```bash
hugo new blog/ten-bai-viet.md
```

### Thay đổi giao diện

Chỉnh sửa các file trong `themes/network-blog-theme/`:
- `static/css/main.css` - Styles
- `layouts/` - Templates HTML

## Triển khai lên GitHub Pages

1. Tạo repository trên GitHub (ví dụ: `username.github.io`)

2. Cập nhật `baseURL` trong `config.toml`:
```toml
baseURL = "https://username.github.io/"
```

3. Build website:
```bash
hugo
```

4. Đẩy code lên GitHub:
```bash
cd public
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/username.github.io.git
git push -u origin main
```

5. Bật GitHub Pages trong Settings của repository

## Tài liệu tham khảo

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Hugo Themes](https://themes.gohugo.io/)

## License

MIT License - Tự do sử dụng và chỉnh sửa.

