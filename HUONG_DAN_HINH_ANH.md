# Hướng Dẫn Sử Dụng Hình Ảnh

## Cấu Trúc Thư Mục

Có 2 cách để lưu hình ảnh:

### 1. Thư mục trong Theme (Khuyến nghị cho hình ảnh chung)
```
themes/network-blog-theme/static/images/
├── avatar.jpg              # Avatar của bạn
├── certificate-1.jpg      # Chứng chỉ
├── certificate-2.jpg
├── project-1.jpg          # Đồ án
└── project-2.jpg
```

**Cách sử dụng trong code:**
- Đường dẫn: `/images/tên-file.jpg`
- Ví dụ: `/images/avatar.jpg`

### 2. Thư mục trong Content (Cho hình ảnh của bài viết)
```
content/images/
├── java-socket-example.png
├── nodejs-server.png
└── ...
```

**Cách sử dụng trong markdown:**
- Đường dẫn: `/images/tên-file.jpg`
- Hoặc: `![Mô tả](/images/tên-file.jpg)`

## Cách Thêm Hình Ảnh

### 1. Avatar trên Trang Chủ

1. Đặt file `avatar.jpg` vào: `themes/network-blog-theme/static/images/avatar.jpg`
2. File sẽ tự động hiển thị trên trang chủ
3. Nếu không có file, sẽ hiển thị placeholder với chữ cái đầu

### 2. Chứng Chỉ và Đồ Án trên Trang "Về Tôi"

Chỉnh sửa file `content/about/_index.md`:

```yaml
---
title: "Về Tôi"
date: 2024-01-01
type: "about"
certificates:
  - image: "/images/certificate-1.jpg"
    title: "Chứng chỉ Java"
  - image: "/images/certificate-2.jpg"
    title: "Chứng chỉ JavaScript"
  - image: "https://example.com/certificate.jpg"  # Hoặc dùng URL
    title: "Chứng chỉ từ URL"
projects:
  - image: "/images/đacs.jpg"
    title: "Tự động hóa quản lý mạng bằng AI trên GNS3"
    description: "Đồ án sử dụng playbook để tiến hành cấu hình tự động cho router, switch và pc"
  - image: "/images/final.jpg"
    title: "Tạo video có phụ đề và âm thanh bằng AI trên AWS"
    description: "Chỉnh sửa ngôn ngữ phụ đề và âm thanh cho video tự động bằng các dịch vụ trên AWS"
---
```

**Lưu ý:**
- Có thể dùng đường dẫn local: `/images/tên-file.jpg`
- Hoặc URL từ internet: `https://example.com/image.jpg`
- Hình ảnh sẽ tự động hiển thị dạng gallery
- Click vào hình để xem lớn (lightbox)

### 3. Hình Ảnh trong Bài Viết Blog

Trong file markdown của bài viết:

**Cách 1: Sử dụng Markdown**
```markdown
![Mô tả hình ảnh](/images/java-socket-example.png)
```

**Cách 2: Sử dụng HTML**
```html
<img src="/images/java-socket-example.png" alt="Mô tả" style="max-width: 100%;">
```

**Cách 3: Sử dụng URL**
```markdown
![Mô tả](https://example.com/image.jpg)
```

### 4. Đặt Tên File Hình Ảnh

**Quy tắc đặt tên:**
- Sử dụng chữ thường, không dấu
- Dùng dấu gạch ngang `-` thay vì khoảng trắng
- Ví dụ: `chung-chi-java.jpg`, `do-an-client-server.png`

**Ví dụ:**
- ✅ `certificate-java.jpg`
- ✅ `project-chat-app.png`
- ❌ `Chứng chỉ Java.jpg` (có dấu và khoảng trắng)
- ❌ `do an.jpg` (có khoảng trắng)

## Ví Dụ Cụ Thể

### Thêm Chứng Chỉ

1. Copy file hình ảnh vào: `themes/network-blog-theme/static/images/`
   - Ví dụ: `certificate-java.jpg`

2. Sửa file `content/about/_index.md`:
```yaml
certificates:
  - image: "/images/certificate-java.jpg"
    title: "Chứng chỉ Java Programming"
```

3. Chạy lại server:
```bash
hugo server
```

### Thêm Hình Ảnh vào Bài Viết

1. Copy file vào: `content/images/`
   - Ví dụ: `java-socket-diagram.png`

2. Trong file markdown bài viết:
```markdown
## Kiến trúc Socket

![Kiến trúc Socket trong Java](/images/java-socket-diagram.png)

Mô tả về kiến trúc...
```

## Tối Ưu Hình Ảnh

### Kích Thước Khuyến Nghị

- **Avatar**: 300x300px hoặc 400x400px
- **Chứng chỉ**: Tối đa 1200px chiều rộng
- **Đồ án**: Tối đa 1600px chiều rộng
- **Hình trong bài viết**: Tối đa 1200px chiều rộng

### Định Dạng File

- **JPG**: Cho ảnh chụp, có nhiều màu
- **PNG**: Cho ảnh có nền trong suốt, logo
- **WebP**: Định dạng hiện đại, nhẹ hơn (nếu trình duyệt hỗ trợ)

### Nén Hình Ảnh

Trước khi upload, nên nén hình ảnh để tăng tốc độ tải:
- Sử dụng: [TinyPNG](https://tinypng.com/) hoặc [Squoosh](https://squoosh.app/)

## Xử Lý Lỗi

### Hình ảnh không hiển thị

1. Kiểm tra đường dẫn file có đúng không
2. Kiểm tra tên file (phân biệt chữ hoa/thường)
3. Đảm bảo file tồn tại trong thư mục đúng
4. Kiểm tra console trình duyệt (F12) để xem lỗi

### Hình ảnh quá lớn

- Sử dụng công cụ nén hình ảnh
- Giảm kích thước file trước khi upload
- Sử dụng định dạng WebP nếu có thể

## Tổng Kết

- ✅ Đặt hình ảnh vào `themes/network-blog-theme/static/images/` cho hình chung
- ✅ Đặt hình ảnh vào `content/images/` cho hình trong bài viết
- ✅ Sử dụng đường dẫn `/images/tên-file.jpg` trong code
- ✅ Có thể dùng URL từ internet
- ✅ Đặt tên file không dấu, dùng dấu gạch ngang
- ✅ Nén hình ảnh trước khi upload

