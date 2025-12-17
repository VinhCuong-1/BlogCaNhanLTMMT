---
title: "Event Loop & Cách JavaScript Hoạt Động"
date: 2024-02-20
tags: ["JavaScript", "Event Loop", "Asynchronous", "Concurrency"]
summary: "Giải thích event loop, microtask/macrotask trong JavaScript. Hiểu sâu cách JavaScript xử lý I/O và bất đồng bộ thông qua event loop."
related:
  - title: "Promise và Async/Await trong JavaScript"
    url: "/blog/javascript-promise-async/"
  - title: "Node.js - Hướng dẫn cơ bản"
    url: "/blog/nodejs-co-ban/"
---

# Event Loop & Cách JavaScript Hoạt Động

Event Loop là cơ chế cốt lõi giúp JavaScript xử lý bất đồng bộ mặc dù là ngôn ngữ đơn luồng. Hiểu rõ Event Loop sẽ giúp bạn viết code JavaScript hiệu quả và debug tốt hơn.

## JavaScript là Đơn Luồng

JavaScript chỉ có một luồng thực thi (single thread), nghĩa là tại một thời điểm chỉ có thể thực thi một đoạn code. Tuy nhiên, JavaScript vẫn có thể xử lý bất đồng bộ nhờ:

- **Call Stack**: Nơi lưu các hàm đang thực thi
- **Web APIs**: Các API của browser/Node.js (setTimeout, fetch, etc.)
- **Callback Queue**: Hàng đợi các callback
- **Event Loop**: Vòng lặp điều phối

## Call Stack

Call Stack là cấu trúc dữ liệu LIFO (Last In, First Out) lưu các hàm đang thực thi:

```javascript
function first() {
    console.log("1");
    second();
}

function second() {
    console.log("2");
    third();
}

function third() {
    console.log("3");
}

first();
// Output: 1, 2, 3
```

Khi `first()` được gọi:
1. `first()` được đẩy vào stack
2. `second()` được đẩy vào stack
3. `third()` được đẩy vào stack
4. `third()` thực thi xong, pop khỏi stack
5. `second()` thực thi xong, pop khỏi stack
6. `first()` thực thi xong, pop khỏi stack

## Web APIs và Callback Queue

Khi gặp hàm bất đồng bộ, JavaScript giao cho Web APIs xử lý:

```javascript
console.log("1");

setTimeout(() => {
    console.log("2");
}, 0);

console.log("3");

// Output: 1, 3, 2
```

**Giải thích:**
1. `console.log("1")` → Stack → Thực thi → "1"
2. `setTimeout` → Stack → Giao cho Web API → Pop khỏi stack
3. `console.log("3")` → Stack → Thực thi → "3"
4. Web API hoàn thành → Callback được đẩy vào Queue
5. Event Loop lấy callback từ Queue → Stack → Thực thi → "2"

## Event Loop

Event Loop liên tục kiểm tra:
1. Call Stack có rỗng không?
2. Nếu rỗng, lấy callback từ Queue đẩy vào Stack

```javascript
console.log("Start");

setTimeout(() => console.log("Timeout 1"), 0);
setTimeout(() => console.log("Timeout 2"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");

// Output: Start, End, Promise, Timeout 1, Timeout 2
```

## Microtask Queue vs Macrotask Queue

JavaScript có 2 loại queue:

### Microtask Queue (Ưu tiên cao)
- Promise callbacks (`.then()`, `.catch()`)
- `queueMicrotask()`
- `MutationObserver`

### Macrotask Queue (Ưu tiên thấp)
- `setTimeout`, `setInterval`
- I/O operations
- UI rendering

**Thứ tự ưu tiên:**
1. Call Stack
2. Microtask Queue (xử lý hết)
3. Macrotask Queue (một item)
4. Lặp lại

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => {
    console.log("3");
    return Promise.resolve().then(() => console.log("4"));
});

setTimeout(() => console.log("5"), 0);

console.log("6");

// Output: 1, 6, 3, 4, 2, 5
```

**Giải thích:**
1. "1" → Stack → Output
2. `setTimeout` → Web API → Macrotask Queue
3. `Promise.resolve()` → Microtask Queue
4. `setTimeout` → Web API → Macrotask Queue
5. "6" → Stack → Output
6. Stack rỗng → Xử lý Microtask Queue:
   - "3" → Output
   - "4" → Output
7. Xử lý một Macrotask:
   - "2" → Output
8. Xử lý Macrotask tiếp theo:
   - "5" → Output

## Ví dụ phức tạp

```javascript
async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
}

async function async2() {
    console.log("async2");
}

console.log("script start");

setTimeout(() => console.log("setTimeout"), 0);

async1();

new Promise(resolve => {
    console.log("promise1");
    resolve();
}).then(() => {
    console.log("promise2");
});

console.log("script end");

// Output:
// script start
// async1 start
// async2
// promise1
// script end
// promise2
// async1 end
// setTimeout
```

## Blocking Event Loop

Các tác vụ đồng bộ nặng sẽ block Event Loop:

```javascript
// ❌ Không tốt: Block Event Loop
function heavyTask() {
    let sum = 0;
    for (let i = 0; i < 10000000000; i++) {
        sum += i;
    }
    return sum;
}

heavyTask(); // Block toàn bộ ứng dụng

// ✅ Tốt: Chia nhỏ tác vụ
function heavyTaskAsync() {
    return new Promise(resolve => {
        let sum = 0;
        let i = 0;
        
        function processChunk() {
            const end = Math.min(i + 1000000, 10000000000);
            for (; i < end; i++) {
                sum += i;
            }
            
            if (i < 10000000000) {
                // Cho Event Loop xử lý các tác vụ khác
                setTimeout(processChunk, 0);
            } else {
                resolve(sum);
            }
        }
        
        processChunk();
    });
}

heavyTaskAsync().then(result => {
    console.log("Hoàn thành:", result);
});
```

## Event Loop trong Node.js

Node.js sử dụng libuv để xử lý Event Loop, có các phase:

1. **Timer**: Xử lý `setTimeout`, `setInterval`
2. **Pending callbacks**: Xử lý I/O callbacks bị trì hoãn
3. **Idle, prepare**: Chỉ dùng nội bộ
4. **Poll**: Lấy sự kiện mới, thực thi I/O callbacks
5. **Check**: Xử lý `setImmediate` callbacks
6. **Close callbacks**: Xử lý close callbacks (socket.on('close'))

```javascript
// Node.js Event Loop phases
setTimeout(() => console.log("Timer"), 0);

setImmediate(() => console.log("Immediate"));

process.nextTick(() => console.log("Next Tick"));

Promise.resolve().then(() => console.log("Promise"));

// Output:
// Next Tick (ưu tiên cao nhất)
// Promise
// Timer
// Immediate
```

## Best Practices

### 1. Tránh blocking Event Loop

```javascript
// ❌ Không tốt
function processLargeArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        // Xử lý nặng
        heavyComputation(arr[i]);
    }
}

// ✅ Tốt
async function processLargeArrayAsync(arr) {
    for (let i = 0; i < arr.length; i++) {
        await heavyComputationAsync(arr[i]);
        // Cho Event Loop xử lý tác vụ khác
        await new Promise(resolve => setImmediate(resolve));
    }
}
```

### 2. Sử dụng Web Workers (Browser)

```javascript
// main.js
const worker = new Worker('worker.js');
worker.postMessage({ data: largeArray });
worker.onmessage = (e) => {
    console.log('Kết quả:', e.data);
};

// worker.js
self.onmessage = (e) => {
    const result = processData(e.data.data);
    self.postMessage(result);
};
```

### 3. Sử dụng Worker Threads (Node.js)

```javascript
const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js', {
    workerData: { data: largeArray }
});

worker.on('message', (result) => {
    console.log('Kết quả:', result);
});
```

## Debugging Event Loop

```javascript
// Kiểm tra stack trace
console.trace("Current stack");

// Đo thời gian
console.time("Task");
// ... code ...
console.timeEnd("Task");

// Monitor Event Loop lag
const start = Date.now();
setImmediate(() => {
    const lag = Date.now() - start;
    console.log(`Event Loop lag: ${lag}ms`);
});
```

## Kết luận

Event Loop là cơ chế cốt lõi của JavaScript:

- **Call Stack**: Thực thi code đồng bộ
- **Web APIs**: Xử lý tác vụ bất đồng bộ
- **Microtask Queue**: Promise, queueMicrotask (ưu tiên cao)
- **Macrotask Queue**: setTimeout, I/O (ưu tiên thấp)
- **Event Loop**: Điều phối giữa các queue

Hiểu rõ Event Loop giúp bạn:
- Viết code bất đồng bộ hiệu quả
- Tránh blocking Event Loop
- Debug các vấn đề về timing
- Tối ưu hiệu suất ứng dụng

Kiến thức này đặc biệt quan trọng khi làm việc với Node.js và xây dựng các ứng dụng mạng hiệu suất cao.

