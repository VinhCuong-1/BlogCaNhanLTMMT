---
title: "JavaScript Căn Bản - Tổng Quan Ngôn Ngữ và Cú Pháp"
date: 2024-02-10
tags: ["JavaScript", "Cơ bản", "DOM", "Lập trình web"]
summary: "Tổng quan về ngôn ngữ JavaScript, cú pháp cơ bản, biến, hàm, và DOM. Bài viết phù hợp cho người mới bắt đầu học JavaScript."
related:
  - title: "Promise và Async/Await trong JavaScript"
    url: "/blog/javascript-promise-async/"
  - title: "Event loop & cách JavaScript hoạt động"
    url: "/blog/javascript-event-loop/"
---

# JavaScript Căn Bản - Tổng Quan Ngôn Ngữ và Cú Pháp

JavaScript là ngôn ngữ lập trình phổ biến nhất trên thế giới, được sử dụng để phát triển web frontend, backend (Node.js), và nhiều ứng dụng khác. Bài viết này sẽ giới thiệu những kiến thức cơ bản về JavaScript.

## Tổng quan về JavaScript

JavaScript là ngôn ngữ:
- **Động**: Không cần khai báo kiểu dữ liệu
- **Thông dịch**: Chạy trực tiếp mà không cần biên dịch
- **Đa mô hình**: Hỗ trợ OOP, functional, và procedural programming
- **Chạy mọi nơi**: Browser, server (Node.js), mobile apps

## Biến và Kiểu Dữ Liệu

### Khai báo biến

```javascript
// var (cũ, không nên dùng)
var oldVariable = "Cách cũ";

// let (có thể thay đổi)
let name = "JavaScript";
name = "JS"; // OK

// const (hằng số, không thể thay đổi)
const PI = 3.14159;
// PI = 3.14; // Lỗi!

// Khai báo nhiều biến
let x = 1, y = 2, z = 3;
```

### Kiểu dữ liệu

```javascript
// Kiểu nguyên thủy (Primitive)
let number = 42;              // Number
let text = "Hello";           // String
let isTrue = true;            // Boolean
let nothing = null;           // Null
let notDefined = undefined;  // Undefined
let bigInt = 9007199254740991n; // BigInt
let symbol = Symbol('id');    // Symbol

// Kiểu đối tượng (Object)
let person = {
    name: "Nguyễn Văn A",
    age: 25,
    city: "Hà Nội"
};

let numbers = [1, 2, 3, 4, 5]; // Array
let date = new Date();          // Date
```

### Template Literals

```javascript
let name = "JavaScript";
let version = 2024;

// Cách cũ
let message = "Xin chào " + name + ", phiên bản " + version;

// Template Literal (ES6+)
let message2 = `Xin chào ${name}, phiên bản ${version}`;
```

## Hàm (Functions)

### Function Declaration

```javascript
function greet(name) {
    return `Xin chào, ${name}!`;
}

console.log(greet("JavaScript")); // Xin chào, JavaScript!
```

### Function Expression

```javascript
const greet = function(name) {
    return `Xin chào, ${name}!`;
};
```

### Arrow Function (ES6+)

```javascript
// Cú pháp ngắn gọn
const greet = (name) => {
    return `Xin chào, ${name}!`;
};

// Nếu chỉ có một câu lệnh return
const greet2 = (name) => `Xin chào, ${name}!`;

// Không có tham số
const sayHello = () => "Xin chào!";
```

### Default Parameters

```javascript
function greet(name = "Khách") {
    return `Xin chào, ${name}!`;
}

console.log(greet());        // Xin chào, Khách!
console.log(greet("JS"));    // Xin chào, JS!
```

## Cấu trúc Điều Khiển

### If-Else

```javascript
let age = 20;

if (age >= 18) {
    console.log("Đã trưởng thành");
} else if (age >= 13) {
    console.log("Thiếu niên");
} else {
    console.log("Trẻ em");
}

// Ternary Operator
let status = age >= 18 ? "Trưởng thành" : "Chưa trưởng thành";
```

### Switch

```javascript
let day = 3;
let dayName;

switch (day) {
    case 1:
        dayName = "Chủ nhật";
        break;
    case 2:
        dayName = "Thứ hai";
        break;
    case 3:
        dayName = "Thứ ba";
        break;
    default:
        dayName = "Không xác định";
}

console.log(dayName); // Thứ ba
```

### Vòng lặp

```javascript
// For loop
for (let i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
}

// While loop
let count = 0;
while (count < 5) {
    console.log(count);
    count++;
}

// For...of (Array)
let fruits = ["Táo", "Chuối", "Cam"];
for (let fruit of fruits) {
    console.log(fruit);
}

// For...in (Object)
let person = { name: "A", age: 25 };
for (let key in person) {
    console.log(key + ": " + person[key]);
}
```

## Mảng (Arrays)

```javascript
// Tạo mảng
let numbers = [1, 2, 3, 4, 5];
let fruits = new Array("Táo", "Chuối");

// Truy cập phần tử
console.log(numbers[0]); // 1

// Các phương thức mảng
numbers.push(6);           // Thêm cuối
numbers.pop();             // Xóa cuối
numbers.unshift(0);        // Thêm đầu
numbers.shift();           // Xóa đầu

// Map - tạo mảng mới
let doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// Filter - lọc phần tử
let evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// Reduce - tính toán
let sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// Find - tìm phần tử
let found = numbers.find(n => n > 3);
// 4
```

## Đối Tượng (Objects)

```javascript
// Tạo object
let person = {
    name: "Nguyễn Văn A",
    age: 25,
    city: "Hà Nội",
    
    // Method
    greet: function() {
        return `Xin chào, tôi là ${this.name}`;
    },
    
    // Shorthand method (ES6+)
    introduce() {
        return `Tôi ${this.name}, ${this.age} tuổi`;
    }
};

// Truy cập
console.log(person.name);        // Nguyễn Văn A
console.log(person["age"]);     // 25
console.log(person.greet());    // Xin chào, tôi là Nguyễn Văn A

// Thêm/sửa thuộc tính
person.email = "a@example.com";
person.age = 26;

// Destructuring (ES6+)
let { name, age } = person;
console.log(name, age); // Nguyễn Văn A 26
```

## DOM (Document Object Model)

DOM cho phép JavaScript tương tác với HTML:

```javascript
// Chọn phần tử
let element = document.getElementById("myId");
let elements = document.getElementsByClassName("myClass");
let element2 = document.querySelector("#myId");
let elements2 = document.querySelectorAll(".myClass");

// Thay đổi nội dung
element.textContent = "Nội dung mới";
element.innerHTML = "<strong>HTML mới</strong>";

// Thay đổi style
element.style.color = "red";
element.style.backgroundColor = "yellow";

// Thêm/xóa class
element.classList.add("new-class");
element.classList.remove("old-class");
element.classList.toggle("active");

// Tạo phần tử mới
let newDiv = document.createElement("div");
newDiv.textContent = "Phần tử mới";
document.body.appendChild(newDiv);

// Event Listener
element.addEventListener("click", function() {
    console.log("Đã click!");
});

// Arrow function
element.addEventListener("click", () => {
    console.log("Đã click!");
});
```

## Ví dụ: Ứng dụng Todo List đơn giản

```html
<!DOCTYPE html>
<html>
<head>
    <title>Todo List</title>
</head>
<body>
    <h1>Todo List</h1>
    <input type="text" id="todoInput" placeholder="Nhập công việc...">
    <button id="addBtn">Thêm</button>
    <ul id="todoList"></ul>

    <script>
        const todoInput = document.getElementById("todoInput");
        const addBtn = document.getElementById("addBtn");
        const todoList = document.getElementById("todoList");

        addBtn.addEventListener("click", () => {
            const task = todoInput.value.trim();
            if (task) {
                // Tạo phần tử li
                const li = document.createElement("li");
                li.textContent = task;
                
                // Nút xóa
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Xóa";
                deleteBtn.addEventListener("click", () => {
                    li.remove();
                });
                
                li.appendChild(deleteBtn);
                todoList.appendChild(li);
                
                // Xóa input
                todoInput.value = "";
            }
        });
    </script>
</body>
</html>
```

## Kết luận

JavaScript là ngôn ngữ mạnh mẽ và linh hoạt. Những kiến thức cơ bản này bao gồm:
- Biến và kiểu dữ liệu
- Hàm và arrow functions
- Cấu trúc điều khiển
- Mảng và đối tượng
- DOM manipulation

Trong các bài viết tiếp theo, chúng ta sẽ tìm hiểu về Promise, Async/Await, và Event Loop - những khái niệm quan trọng để hiểu cách JavaScript xử lý bất đồng bộ.

