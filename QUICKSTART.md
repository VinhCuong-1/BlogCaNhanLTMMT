# Hướng Dẫn Nhanh

## Cài đặt Hugo

### Windows
1. Tải Hugo từ: https://github.com/gohugoio/hugo/releases
2. Giải nén và thêm vào PATH
3. Hoặc sử dụng Chocolatey: `choco install hugo`

### macOS
```bash
brew install hugo
```

### Linux
```bash
sudo apt-get install hugo
```

## Chạy Website

1. Mở terminal trong thư mục `LapTrinhMang`
2. Chạy lệnh:
```bash
hugo server
```
3. Mở trình duyệt: http://localhost:1313

## Xây dựng Website Tĩnh

```bash
hugo
```

Các file HTML sẽ được tạo trong thư mục `public/`

## Cấu Trúc Website

- **Trang Chủ** (`/`): Giới thiệu và bài viết gần đây
- **Blog** (`/blog/`): Danh sách 9 bài viết
- **Trang thông tin cá nhân** (`/about/`): Thông tin cá nhân

## Thêm Bài Viết Mới

Tạo file markdown trong `content/blog/`:

```markdown
---
title: "Tiêu đề bài viết"
date: 2024-03-01
tags: ["Java", "Socket"]
summary: "Tóm tắt bài viết"
---

Nội dung bài viết...
```

## Tùy Chỉnh

- **Thông tin cá nhân**: Sửa `config.toml`
- **Giao diện**: Sửa `themes/network-blog-theme/static/css/main.css`
- **Template**: Sửa `themes/network-blog-theme/layouts/`

## Triển Khai GitHub Pages

1. Cập nhật `baseURL` trong `config.toml`
2. Chạy `hugo` để build
3. Đẩy thư mục `public/` lên GitHub repository
4. Bật GitHub Pages trong Settings

