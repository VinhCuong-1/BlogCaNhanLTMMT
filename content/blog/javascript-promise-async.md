---
title: "Promise và Async/Await trong JavaScript - Xử Lý Bất Đồng Bộ"
date: 2024-02-15
tags: ["JavaScript", "Promise", "Async/Await", "Bất đồng bộ"]
summary: "Giải thích Promise, async/await trong JavaScript với ví dụ thực tế. Hướng dẫn xử lý bất đồng bộ hiệu quả trong JavaScript."
related:
  - title: "Event loop & cách JavaScript hoạt động"
    url: "/blog/javascript-event-loop/"
  - title: "Node.js - Hướng dẫn cơ bản"
    url: "/blog/nodejs-co-ban/"
  - title: "JavaScript Căn Bản"
    url: "/blog/javascript-co-ban/"
---

# Promise và Async/Await trong JavaScript - Xử Lý Bất Đồng Bộ

JavaScript là ngôn ngữ đơn luồng (single-threaded), nhưng với Promise và Async/Await, chúng ta có thể xử lý các tác vụ bất đồng bộ một cách hiệu quả. Bài viết này sẽ giải thích chi tiết về Promise và Async/Await.

## Vấn đề với Callback Hell

Trước khi có Promise, chúng ta sử dụng callback, dẫn đến "callback hell":

```javascript
// Callback hell - khó đọc và bảo trì
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
            getMoreData(c, function(d) {
                // Code lồng nhau quá nhiều!
            });
        });
    });
});
```

## Promise là gì?

Promise là đối tượng đại diện cho kết quả (thành công hoặc thất bại) của một tác vụ bất đồng bộ trong tương lai.

### Trạng thái của Promise

Promise có 3 trạng thái:
- **Pending**: Đang chờ xử lý
- **Fulfilled**: Đã hoàn thành thành công
- **Rejected**: Đã thất bại

### Tạo Promise

```javascript
// Tạo Promise
const myPromise = new Promise((resolve, reject) => {
    // Tác vụ bất đồng bộ
    setTimeout(() => {
        const success = true;
        
        if (success) {
            resolve("Thành công!"); // Promise fulfilled
        } else {
            reject("Thất bại!");    // Promise rejected
        }
    }, 1000);
});

// Sử dụng Promise
myPromise
    .then(result => {
        console.log(result); // "Thành công!"
    })
    .catch(error => {
        console.error(error); // "Thất bại!"
    });
```

### Ví dụ thực tế: Fetch API

```javascript
// Fetch API trả về Promise
fetch('https://api.example.com/data')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dữ liệu:', data);
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
```

## Promise Methods

### Promise.all()

Chờ tất cả Promise hoàn thành:

```javascript
const promise1 = fetch('/api/user');
const promise2 = fetch('/api/posts');
const promise3 = fetch('/api/comments');

Promise.all([promise1, promise2, promise3])
    .then(responses => {
        // Tất cả đã hoàn thành
        return Promise.all(responses.map(r => r.json()));
    })
    .then(data => {
        console.log('Tất cả dữ liệu:', data);
    })
    .catch(error => {
        // Nếu một Promise thất bại, tất cả thất bại
        console.error('Lỗi:', error);
    });
```

### Promise.allSettled()

Chờ tất cả Promise hoàn thành (thành công hoặc thất bại):

```javascript
Promise.allSettled([promise1, promise2, promise3])
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${index} thành công:`, result.value);
            } else {
                console.log(`Promise ${index} thất bại:`, result.reason);
            }
        });
    });
```

### Promise.race()

Trả về Promise đầu tiên hoàn thành:

```javascript
const fastPromise = new Promise(resolve => 
    setTimeout(() => resolve('Nhanh'), 100)
);
const slowPromise = new Promise(resolve => 
    setTimeout(() => resolve('Chậm'), 1000)
);

Promise.race([fastPromise, slowPromise])
    .then(result => {
        console.log(result); // "Nhanh"
    });
```

## Async/Await

Async/Await là cú pháp mới (ES2017) giúp viết code bất đồng bộ dễ đọc hơn, giống code đồng bộ.

### Async Function

```javascript
// Hàm async luôn trả về Promise
async function fetchData() {
    return "Dữ liệu";
}

// Tương đương với
function fetchData() {
    return Promise.resolve("Dữ liệu");
}
```

### Await

`await` chỉ có thể dùng trong hàm `async`:

```javascript
async function getData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Lỗi:', error);
        throw error;
    }
}

// Sử dụng
getData()
    .then(data => console.log('Hoàn thành:', data))
    .catch(error => console.error('Lỗi:', error));
```

### So sánh Promise và Async/Await

**Với Promise:**
```javascript
function getUserData(userId) {
    return fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            return fetch(`/api/posts?userId=${user.id}`)
                .then(response => response.json())
                .then(posts => {
                    return { user, posts };
                });
        })
        .catch(error => {
            console.error('Lỗi:', error);
        });
}
```

**Với Async/Await:**
```javascript
async function getUserData(userId) {
    try {
        const userResponse = await fetch(`/api/users/${userId}`);
        const user = await userResponse.json();
        
        const postsResponse = await fetch(`/api/posts?userId=${user.id}`);
        const posts = await postsResponse.json();
        
        return { user, posts };
    } catch (error) {
        console.error('Lỗi:', error);
        throw error;
    }
}
```

## Ví dụ thực tế: Xử lý nhiều API

```javascript
async function loadUserDashboard(userId) {
    try {
        // Chờ tuần tự
        const user = await fetchUser(userId);
        const posts = await fetchUserPosts(userId);
        const comments = await fetchUserComments(userId);
        
        return {
            user,
            posts,
            comments
        };
    } catch (error) {
        console.error('Lỗi tải dashboard:', error);
        throw error;
    }
}

// Tối ưu: Chạy song song
async function loadUserDashboardParallel(userId) {
    try {
        // Chạy song song với Promise.all
        const [user, posts, comments] = await Promise.all([
            fetchUser(userId),
            fetchUserPosts(userId),
            fetchUserComments(userId)
        ]);
        
        return { user, posts, comments };
    } catch (error) {
        console.error('Lỗi:', error);
        throw error;
    }
}

// Helper functions
async function fetchUser(userId) {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
}

async function fetchUserPosts(userId) {
    const response = await fetch(`/api/posts?userId=${userId}`);
    return response.json();
}

async function fetchUserComments(userId) {
    const response = await fetch(`/api/comments?userId=${userId}`);
    return response.json();
}
```

## Xử lý lỗi với Async/Await

```javascript
async function processData() {
    try {
        const data = await fetchData();
        const processed = await processData(data);
        return processed;
    } catch (error) {
        // Xử lý tất cả lỗi
        if (error instanceof NetworkError) {
            console.error('Lỗi mạng:', error);
        } else if (error instanceof ValidationError) {
            console.error('Lỗi validation:', error);
        } else {
            console.error('Lỗi không xác định:', error);
        }
        throw error; // Re-throw để caller xử lý
    }
}
```

## Ví dụ: Retry Logic

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            }
            throw new Error(`HTTP ${response.status}`);
        } catch (error) {
            if (i === maxRetries - 1) {
                throw error; // Lần thử cuối cùng
            }
            console.log(`Lần thử ${i + 1} thất bại, thử lại...`);
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}

// Sử dụng
fetchWithRetry('https://api.example.com/data')
    .then(data => console.log('Thành công:', data))
    .catch(error => console.error('Thất bại sau 3 lần thử:', error));
```

## Best Practices

1. **Luôn sử dụng try-catch với async/await**
```javascript
async function safeOperation() {
    try {
        return await riskyOperation();
    } catch (error) {
        // Xử lý lỗi
        return null;
    }
}
```

2. **Sử dụng Promise.all cho các tác vụ độc lập**
```javascript
// Tốt: Chạy song song
const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
]);

// Không tốt: Chạy tuần tự
const user = await fetchUser();
const posts = await fetchPosts();
```

3. **Tránh await trong vòng lặp**
```javascript
// Không tốt
for (const id of ids) {
    await processItem(id); // Chậm
}

// Tốt hơn
await Promise.all(ids.map(id => processItem(id)));
```

## Kết luận

Promise và Async/Await là công cụ mạnh mẽ để xử lý bất đồng bộ trong JavaScript:

- **Promise**: Cơ chế cơ bản để xử lý bất đồng bộ
- **Async/Await**: Cú pháp mới, dễ đọc và dễ bảo trì
- **Promise.all/race/allSettled**: Xử lý nhiều Promise cùng lúc

Hiểu rõ các khái niệm này sẽ giúp bạn viết code JavaScript hiệu quả hơn, đặc biệt khi làm việc với Node.js và các API.

