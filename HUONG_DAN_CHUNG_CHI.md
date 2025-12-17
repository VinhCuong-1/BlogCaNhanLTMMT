# Hướng Dẫn Thêm Chứng Chỉ

## Bước 1: Đặt Tên File Hình Ảnh

Copy 3 hình ảnh chứng chỉ vào thư mục:
```
themes/network-blog-theme/static/images/
```

**Đặt tên file như sau:**
- `networking-basics.jpg` (hoặc .png)
- `javascript-essentials-1.jpg` (hoặc .png)
- `javascript-essentials-2.jpg` (hoặc .png)

## Bước 2: Kiểm Tra File Đã Được Cấu Hình

File `content/about/_index.md` đã được cấu hình sẵn với 3 chứng chỉ:

```yaml
certificates:
  - image: "/images/networking-basics.jpg"
    title: "Networking Basics"
  - image: "/images/javascript-essentials-1.jpg"
    title: "JavaScript Essentials 1"
  - image: "/images/javascript-essentials-2.jpg"
    title: "JavaScript Essentials 2"
```

## Bước 3: Chạy Server

Sau khi đã copy hình ảnh vào đúng thư mục, chạy:

```bash
hugo server
```

## Lưu Ý

- ✅ Đảm bảo tên file khớp chính xác với đường dẫn trong `_index.md`
- ✅ File có thể là `.jpg`, `.jpeg`, `.png`, hoặc `.webp`
- ✅ Nếu file có tên khác, sửa đường dẫn trong `_index.md` cho khớp
- ✅ Hình ảnh sẽ tự động hiển thị dạng gallery trên trang "Trang thông tin cá nhân"
- ✅ Click vào hình để xem lớn (lightbox)

## Ví Dụ Nếu File Có Tên Khác

Nếu file của bạn có tên khác, ví dụ:
- `Networking_Basics_Certificate.png`
- `JS_Essentials_1.png`
- `JS_Essentials_2.png`

Thì bạn có 2 cách:

**Cách 1: Đổi tên file** (Khuyến nghị)
- Đổi thành: `networking-basics.png`, `javascript-essentials-1.png`, `javascript-essentials-2.png`

**Cách 2: Sửa đường dẫn trong `_index.md`**
```yaml
certificates:
  - image: "/images/Networking_Basics_Certificate.png"
    title: "Networking Basics"
  - image: "/images/JS_Essentials_1.png"
    title: "JavaScript Essentials 1"
  - image: "/images/JS_Essentials_2.png"
    title: "JavaScript Essentials 2"
```
