---
title: "Java Core - Lập trình hướng đối tượng trong Java"
date: 2024-02-05
tags: ["Java", "OOP", "Lập trình hướng đối tượng", "Class", "Inheritance"]
summary: "Bài viết chuyên sâu về OOP trong Java: class, inheritance, polymorphism, encapsulation. Nền tảng quan trọng trước khi học lập trình mạng."
related:
  - title: "Java Cơ Bản"
    url: "/blog/java-co-ban/"
  - title: "Lập trình Socket trong Java"
    url: "/blog/java-socket/"
---

# Java Core - Lập trình hướng đối tượng trong Java

Lập trình hướng đối tượng (OOP - Object-Oriented Programming) là nền tảng của Java. Hiểu rõ OOP sẽ giúp bạn viết code Java hiệu quả và dễ bảo trì. Bài viết này sẽ giới thiệu các khái niệm cốt lõi của OOP trong Java.

## Bốn nguyên lý cơ bản của OOP

1. **Encapsulation (Đóng gói)**: Ẩn chi tiết triển khai, chỉ expose interface
2. **Inheritance (Kế thừa)**: Tái sử dụng code từ class cha
3. **Polymorphism (Đa hình)**: Một interface, nhiều triển khai
4. **Abstraction (Trừu tượng)**: Tập trung vào "làm gì" thay vì "làm như thế nào"

## Class và Object

### Class (Lớp)

Class là blueprint (bản thiết kế) để tạo object:

```java
public class Student {
    // Thuộc tính (attributes)
    private String name;
    private int age;
    private String studentId;
    
    // Constructor (Hàm khởi tạo)
    public Student(String name, int age, String studentId) {
        this.name = name;
        this.age = age;
        this.studentId = studentId;
    }
    
    // Phương thức (methods)
    public void displayInfo() {
        System.out.println("Tên: " + name);
        System.out.println("Tuổi: " + age);
        System.out.println("Mã SV: " + studentId);
    }
    
    // Getter và Setter
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
}
```

### Object (Đối tượng)

Object là instance (thể hiện) của class:

```java
public class Main {
    public static void main(String[] args) {
        // Tạo object
        Student student1 = new Student("Nguyễn Văn A", 20, "SV001");
        Student student2 = new Student("Trần Thị B", 21, "SV002");
        
        // Sử dụng object
        student1.displayInfo();
        student2.displayInfo();
    }
}
```

## Encapsulation (Đóng gói)

Encapsulation bảo vệ dữ liệu bằng cách sử dụng access modifiers:

```java
public class BankAccount {
    // private: chỉ truy cập trong class
    private double balance;
    private String accountNumber;
    
    // public: truy cập từ bất kỳ đâu
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        if (initialBalance >= 0) {
            this.balance = initialBalance;
        }
    }
    
    // protected: truy cập trong package và subclass
    protected void setBalance(double amount) {
        if (amount >= 0) {
            this.balance = amount;
        }
    }
    
    public double getBalance() {
        return balance;
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
    
    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }
}
```

## Inheritance (Kế thừa)

Inheritance cho phép class con kế thừa từ class cha:

```java
// Class cha (Parent/Super class)
public class Animal {
    protected String name;
    protected int age;
    
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void eat() {
        System.out.println(name + " đang ăn");
    }
    
    public void sleep() {
        System.out.println(name + " đang ngủ");
    }
}

// Class con (Child/Sub class)
public class Dog extends Animal {
    private String breed;
    
    public Dog(String name, int age, String breed) {
        super(name, age); // Gọi constructor của class cha
        this.breed = breed;
    }
    
    // Override method từ class cha
    @Override
    public void eat() {
        System.out.println(name + " đang ăn thức ăn cho chó");
    }
    
    // Method riêng của Dog
    public void bark() {
        System.out.println(name + " đang sủa: Gâu gâu!");
    }
    
    public void displayInfo() {
        System.out.println("Tên: " + name);
        System.out.println("Tuổi: " + age);
        System.out.println("Giống: " + breed);
    }
}

// Sử dụng
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("Lucky", 3, "Golden Retriever");
        dog.eat();      // Override method
        dog.sleep();    // Kế thừa từ Animal
        dog.bark();     // Method riêng
        dog.displayInfo();
    }
}
```

## Polymorphism (Đa hình)

Polymorphism cho phép một interface có nhiều triển khai:

```java
// Abstract class hoặc Interface
public abstract class Shape {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    // Abstract method - phải được implement bởi subclass
    public abstract double getArea();
    public abstract double getPerimeter();
    
    public void displayColor() {
        System.out.println("Màu: " + color);
    }
}

// Class con 1
public class Circle extends Shape {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public double getPerimeter() {
        return 2 * Math.PI * radius;
    }
}

// Class con 2
public class Rectangle extends Shape {
    private double width;
    private double height;
    
    public Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double getArea() {
        return width * height;
    }
    
    @Override
    public double getPerimeter() {
        return 2 * (width + height);
    }
}

// Sử dụng Polymorphism
public class Main {
    public static void main(String[] args) {
        // Polymorphism: cùng kiểu Shape nhưng khác implementation
        Shape[] shapes = {
            new Circle("Đỏ", 5.0),
            new Rectangle("Xanh", 4.0, 6.0),
            new Circle("Vàng", 3.0)
        };
        
        for (Shape shape : shapes) {
            shape.displayColor();
            System.out.println("Diện tích: " + shape.getArea());
            System.out.println("Chu vi: " + shape.getPerimeter());
            System.out.println("---");
        }
    }
}
```

## Interface

Interface định nghĩa contract mà class phải tuân theo:

```java
// Interface
public interface Drawable {
    void draw();
    void resize(double factor);
}

public interface Movable {
    void move(int x, int y);
}

// Class implement nhiều interface
public class Circle implements Drawable, Movable {
    private int x, y;
    private double radius;
    
    public Circle(int x, int y, double radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Vẽ hình tròn tại (" + x + ", " + y + 
            ") với bán kính " + radius);
    }
    
    @Override
    public void resize(double factor) {
        radius *= factor;
    }
    
    @Override
    public void move(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
```

## Abstract Class vs Interface

| Đặc điểm | Abstract Class | Interface |
|----------|----------------|-----------|
| Method có body | Có thể có | Không (Java 8+ có default method) |
| Biến | Có thể có biến instance | Chỉ có constants |
| Kế thừa | Một class | Nhiều interface |
| Access modifier | Bất kỳ | public (mặc định) |

## Ví dụ thực tế: Hệ thống quản lý mạng

```java
// Abstract class cho Network Connection
public abstract class NetworkConnection {
    protected String host;
    protected int port;
    protected boolean connected;
    
    public NetworkConnection(String host, int port) {
        this.host = host;
        this.port = port;
        this.connected = false;
    }
    
    // Abstract methods
    public abstract void connect();
    public abstract void disconnect();
    public abstract void sendData(String data);
    public abstract String receiveData();
    
    // Concrete method
    public boolean isConnected() {
        return connected;
    }
}

// TCP Connection
public class TCPConnection extends NetworkConnection {
    private Socket socket;
    
    public TCPConnection(String host, int port) {
        super(host, port);
    }
    
    @Override
    public void connect() {
        try {
            socket = new Socket(host, port);
            connected = true;
            System.out.println("TCP đã kết nối");
        } catch (IOException e) {
            System.err.println("Lỗi kết nối TCP: " + e.getMessage());
        }
    }
    
    @Override
    public void disconnect() {
        try {
            if (socket != null) {
                socket.close();
                connected = false;
                System.out.println("TCP đã ngắt kết nối");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    @Override
    public void sendData(String data) {
        // Implementation
    }
    
    @Override
    public String receiveData() {
        // Implementation
        return null;
    }
}
```

## Kết luận

OOP là nền tảng vững chắc để xây dựng các ứng dụng Java phức tạp. Hiểu rõ các nguyên lý Encapsulation, Inheritance, Polymorphism và Abstraction sẽ giúp bạn:

- Viết code dễ bảo trì và mở rộng
- Tái sử dụng code hiệu quả
- Xây dựng kiến trúc ứng dụng rõ ràng
- Áp dụng design patterns

Những kiến thức này đặc biệt quan trọng khi bạn bắt đầu xây dựng các ứng dụng mạng phức tạp với Java.

