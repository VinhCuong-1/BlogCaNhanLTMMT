---
title: "Node.js - Hướng Dẫn Cơ Bản và Xây Dựng Server Mạng"
date: 2024-02-25
tags: ["Node.js", "Server", "HTTP", "Lập trình mạng"]
summary: "Giới thiệu Node.js, cách tạo server, xử lý request/response. Hướng dẫn xây dựng server mạng bằng Node.js từ cơ bản đến nâng cao."
related:
  - title: "JavaScript Căn Bản"
    url: "/blog/javascript-co-ban/"
  - title: "Promise và Async/Await trong JavaScript"
    url: "/blog/javascript-promise-async/"
  - title: "Event loop & cách JavaScript hoạt động"
    url: "/blog/javascript-event-loop/"
---

# Node.js - Hướng Dẫn Cơ Bản và Xây Dựng Server Mạng

Node.js là môi trường chạy JavaScript phía server, cho phép xây dựng các ứng dụng mạng hiệu suất cao. Bài viết này sẽ giới thiệu Node.js và hướng dẫn xây dựng server mạng.

## Tổng quan về Node.js

Node.js là:
- **Runtime**: Chạy JavaScript trên server (không phải browser)
- **Event-driven**: Dựa trên Event Loop
- **Non-blocking I/O**: Xử lý I/O bất đồng bộ
- **NPM**: Hệ thống quản lý package lớn nhất thế giới

### Cài đặt Node.js

Tải và cài đặt từ [nodejs.org](https://nodejs.org/), sau đó kiểm tra:

```bash
node --version
npm --version
```

## Module System

### CommonJS (require/module.exports)

```javascript
// math.js
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = {
    add,
    subtract
};

// hoặc
exports.add = add;
exports.subtract = subtract;

// main.js
const math = require('./math');
console.log(math.add(2, 3)); // 5
```

### ES Modules (import/export)

```javascript
// math.js
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

// main.js
import { add, subtract } from './math.js';
console.log(add(2, 3)); // 5
```

## Built-in Modules

### File System (fs)

```javascript
const fs = require('fs');

// Đọc file đồng bộ
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);

// Đọc file bất đồng bộ
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Lỗi:', err);
        return;
    }
    console.log(data);
});

// Promise-based (fs/promises)
const fsPromises = require('fs/promises');

async function readFile() {
    try {
        const data = await fsPromises.readFile('file.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error('Lỗi:', err);
    }
}
```

### HTTP Module

```javascript
const http = require('http');

// Tạo HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Xin chào từ Node.js!</h1>');
});

server.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
});
```

## Xây dựng HTTP Server

### Server cơ bản

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    // Phân tích URL
    const url = req.url;
    const method = req.method;
    
    console.log(`${method} ${url}`);
    
    // Routing đơn giản
    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <html>
                <head><title>Trang chủ</title></head>
                <body>
                    <h1>Chào mừng đến với Node.js!</h1>
                    <a href="/about">Về chúng tôi</a>
                </body>
            </html>
        `);
    } else if (url === '/about' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>Về chúng tôi</h1><p>Đây là trang giới thiệu</p>');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 - Không tìm thấy</h1>');
    }
});

server.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
});
```

### Xử lý POST Request

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/api/data') {
        let body = '';
        
        // Nhận dữ liệu từ request
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                console.log('Nhận dữ liệu:', data);
                
                res.writeHead(200, { 
                    'Content-Type': 'application/json; charset=utf-8' 
                });
                res.end(JSON.stringify({ 
                    success: true, 
                    message: 'Đã nhận dữ liệu',
                    data: data 
                }));
            } catch (error) {
                res.writeHead(400, { 
                    'Content-Type': 'application/json; charset=utf-8' 
                });
                res.end(JSON.stringify({ 
                    success: false, 
                    error: 'Dữ liệu không hợp lệ' 
                }));
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000);
```

## Express.js - Framework phổ biến

Express.js là framework web phổ biến nhất cho Node.js:

### Cài đặt

```bash
npm init -y
npm install express
```

### Server với Express

```javascript
const express = require('express');
const app = express();

// Middleware để parse JSON
app.use(express.json());

// Route GET
app.get('/', (req, res) => {
    res.send('<h1>Xin chào từ Express!</h1>');
});

app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Nguyễn Văn A' },
        { id: 2, name: 'Trần Thị B' }
    ];
    res.json(users);
});

// Route POST
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = {
        id: Date.now(),
        name,
        email
    };
    res.status(201).json(newUser);
});

// Route với parameters
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    res.json({ id, name: 'User ' + id });
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Có lỗi xảy ra!' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
```

## Xây dựng RESTful API

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Dữ liệu mẫu (thực tế sẽ dùng database)
let users = [
    { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com' },
    { id: 2, name: 'Trần Thị B', email: 'b@example.com' }
];

// GET /api/users - Lấy tất cả users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET /api/users/:id - Lấy user theo ID
app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    
    if (!user) {
        return res.status(404).json({ error: 'User không tồn tại' });
    }
    
    res.json(user);
});

// POST /api/users - Tạo user mới
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ 
            error: 'Name và email là bắt buộc' 
        });
    }
    
    const newUser = {
        id: users.length + 1,
        name,
        email
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /api/users/:id - Cập nhật user
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User không tồn tại' });
    }
    
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json(users[userIndex]);
});

// DELETE /api/users/:id - Xóa user
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User không tồn tại' });
    }
    
    users.splice(userIndex, 1);
    res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API Server đang chạy tại http://localhost:${PORT}`);
});
```

## WebSocket với Socket.io

WebSocket cho phép giao tiếp hai chiều real-time:

```bash
npm install socket.io
```

```javascript
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('User đã kết nối:', socket.id);
    
    socket.on('chat message', (msg) => {
        console.log('Tin nhắn:', msg);
        io.emit('chat message', msg); // Gửi đến tất cả clients
    });
    
    socket.on('disconnect', () => {
        console.log('User đã ngắt kết nối:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
});
```

## Package.json và NPM Scripts

```json
{
  "name": "nodejs-server",
  "version": "1.0.0",
  "description": "Node.js server example",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

## Kết luận

Node.js là công cụ mạnh mẽ để xây dựng server mạng:

- **HTTP Module**: Xây dựng server cơ bản
- **Express.js**: Framework phổ biến, dễ sử dụng
- **RESTful API**: Xây dựng API chuẩn
- **WebSocket**: Giao tiếp real-time
- **NPM**: Quản lý packages và dependencies

Với Node.js, bạn có thể:
- Xây dựng web server
- Tạo RESTful API
- Xây dựng ứng dụng real-time
- Xử lý I/O bất đồng bộ hiệu quả

Kết hợp với kiến thức về JavaScript (Promise, Async/Await, Event Loop), bạn có thể xây dựng các ứng dụng mạng hiệu suất cao và hiện đại.

