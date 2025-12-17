---
title: "Java Cơ Bản - Tổng Quan và Làm Quen Môi Trường Java"
date: 2024-01-15
tags: ["Java", "Cơ bản", "Lập trình"]
summary: "Tổng quan về ngôn ngữ lập trình Java, cú pháp cơ bản, và hướng dẫn thiết lập môi trường phát triển. Bài viết phù hợp cho người mới bắt đầu học Java."
related:
  - title: "Java Core - Lập trình hướng đối tượng"
    url: "/blog/java-oop/"
  - title: "Lập trình Socket trong Java"
    url: "/blog/java-socket/"
---

# Java Cơ Bản - Tổng Quan và Làm Quen Môi Trường Java

Java là một ngôn ngữ lập trình hướng đối tượng, mạnh mẽ và được sử dụng rộng rãi trong phát triển ứng dụng, đặc biệt là trong lập trình mạng. Bài viết này sẽ giới thiệu tổng quan về Java và hướng dẫn bạn làm quen với môi trường phát triển.

## Tổng quan về Java

Java được phát triển bởi Sun Microsystems (hiện thuộc Oracle) vào năm 1995. Ngôn ngữ này có những đặc điểm nổi bật:

- **Độc lập nền tảng**: Code Java có thể chạy trên bất kỳ hệ điều hành nào nhờ Java Virtual Machine (JVM)
- **Hướng đối tượng**: Hỗ trợ đầy đủ các tính năng OOP như class, inheritance, polymorphism
- **An toàn**: Có cơ chế quản lý bộ nhớ tự động và kiểm tra lỗi nghiêm ngặt
- **Đa luồng**: Hỗ trợ lập trình đa luồng (multithreading) mạnh mẽ

## Cài đặt môi trường Java

### 1. Cài đặt JDK (Java Development Kit)

Để lập trình Java, bạn cần cài đặt JDK. Tải phiên bản mới nhất từ [Oracle](https://www.oracle.com/java/technologies/downloads/) hoặc sử dụng OpenJDK.

Sau khi cài đặt, kiểm tra bằng lệnh:

```bash
java -version
javac -version
```

### 2. Thiết lập biến môi trường

Thêm đường dẫn JDK vào biến môi trường `JAVA_HOME` và `PATH`.

## Cú pháp cơ bản

### Cấu trúc chương trình Java

Mọi chương trình Java đều bắt đầu từ một class và phương thức `main`:

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Xin chào, Java!");
    }
}
```

### Biến và kiểu dữ liệu

Java có các kiểu dữ liệu cơ bản:

```java
// Kiểu nguyên thủy
int soNguyen = 10;
double soThuc = 3.14;
boolean laDung = true;
char kyTu = 'A';
String chuoi = "Xin chào";

// Kiểu đối tượng
String ten = new String("Java");
```

### Cấu trúc điều khiển

```java
// If-else
if (diem >= 5) {
    System.out.println("Đậu");
} else {
    System.out.println("Rớt");
}

// Vòng lặp for
for (int i = 0; i < 10; i++) {
    System.out.println("Số: " + i);
}

// Vòng lặp while
int count = 0;
while (count < 5) {
    System.out.println(count);
    count++;
}
```

### Mảng (Array)

```java
// Khai báo và khởi tạo mảng
int[] mangSo = {1, 2, 3, 4, 5};
String[] mangChuoi = new String[3];

// Truy cập phần tử
System.out.println(mangSo[0]); // In ra: 1
```

## Ví dụ minh họa

Chương trình đơn giản tính tổng hai số:

```java
public class TinhTong {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        int tong = a + b;
        
        System.out.println("Tổng của " + a + " và " + b + " là: " + tong);
    }
}
```

## Biên dịch và chạy chương trình

1. **Biên dịch**: Sử dụng `javac` để biên dịch file `.java` thành bytecode
```bash
javac HelloWorld.java
```

2. **Chạy chương trình**: Sử dụng `java` để chạy file `.class`
```bash
java HelloWorld
```

## Kết luận

Java là ngôn ngữ mạnh mẽ với cú pháp rõ ràng, phù hợp cho cả người mới bắt đầu và lập trình viên có kinh nghiệm. Hiểu rõ những kiến thức cơ bản này sẽ là nền tảng vững chắc để bạn tiếp tục học các chủ đề nâng cao như lập trình hướng đối tượng và lập trình mạng.

Trong các bài viết tiếp theo, chúng ta sẽ tìm hiểu về lập trình hướng đối tượng trong Java và cách sử dụng Java để xây dựng các ứng dụng mạng.

