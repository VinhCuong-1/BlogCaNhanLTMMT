---
title: "Xây dựng ứng dụng Client-Server với Socket trong Java"
date: 2024-01-25
tags: ["Java", "Socket", "Client-Server", "Lập trình mạng"]
summary: "Hướng dẫn thực hành từng bước để xây dựng ứng dụng Client-Server hoàn chỉnh với Socket trong Java, bao gồm ví dụ code cụ thể và dễ hiểu."
related:
  - title: "Lập trình Socket trong Java"
    url: "/blog/java-socket/"
  - title: "Lập trình UDP Socket Java"
    url: "/blog/java-udp/"
---

# Xây dựng ứng dụng Client-Server với Socket trong Java

Trong bài viết này, chúng ta sẽ xây dựng một ứng dụng Client-Server hoàn chỉnh sử dụng TCP Socket trong Java. Ứng dụng này sẽ cho phép nhiều client kết nối và giao tiếp với server.

## Kiến trúc ứng dụng

Ứng dụng Client-Server gồm hai phần:
- **Server**: Lắng nghe kết nối từ client và xử lý yêu cầu
- **Client**: Kết nối đến server và gửi/nhận dữ liệu

## Xây dựng Server

### Server đa luồng (Multi-threaded Server)

Để server có thể xử lý nhiều client đồng thời, chúng ta sử dụng đa luồng:

```java
import java.io.*;
import java.net.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MultiThreadedServer {
    private static final int PORT = 8888;
    private static final int MAX_CLIENTS = 10;
    private ExecutorService threadPool;
    
    public MultiThreadedServer() {
        threadPool = Executors.newFixedThreadPool(MAX_CLIENTS);
    }
    
    public void start() {
        try {
            ServerSocket serverSocket = new ServerSocket(PORT);
            System.out.println("Server đang chạy trên port " + PORT);
            
            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("Client mới kết nối: " + 
                    clientSocket.getInetAddress());
                
                // Xử lý mỗi client trong một thread riêng
                ClientHandler handler = new ClientHandler(clientSocket);
                threadPool.execute(handler);
            }
        } catch (IOException e) {
            System.err.println("Lỗi server: " + e.getMessage());
        }
    }
    
    public static void main(String[] args) {
        MultiThreadedServer server = new MultiThreadedServer();
        server.start();
    }
}
```

### Client Handler

Class này xử lý giao tiếp với từng client:

```java
import java.io.*;
import java.net.*;

class ClientHandler implements Runnable {
    private Socket clientSocket;
    
    public ClientHandler(Socket socket) {
        this.clientSocket = socket;
    }
    
    @Override
    public void run() {
        try (
            BufferedReader in = new BufferedReader(
                new InputStreamReader(clientSocket.getInputStream())
            );
            PrintWriter out = new PrintWriter(
                clientSocket.getOutputStream(), true
            )
        ) {
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                System.out.println("Nhận từ client: " + inputLine);
                
                // Xử lý lệnh
                String response = processCommand(inputLine);
                out.println(response);
                
                // Thoát nếu client gửi "quit"
                if ("quit".equalsIgnoreCase(inputLine)) {
                    break;
                }
            }
        } catch (IOException e) {
            System.err.println("Lỗi xử lý client: " + e.getMessage());
        } finally {
            try {
                clientSocket.close();
                System.out.println("Client đã ngắt kết nối");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
    private String processCommand(String command) {
        switch (command.toLowerCase()) {
            case "hello":
                return "Xin chào! Bạn đang kết nối với server.";
            case "time":
                return "Thời gian hiện tại: " + new java.util.Date();
            case "help":
                return "Các lệnh: hello, time, help, quit";
            default:
                return "Lệnh không hợp lệ. Gõ 'help' để xem danh sách lệnh.";
        }
    }
}
```

## Xây dựng Client

Client đơn giản với giao diện dòng lệnh:

```java
import java.io.*;
import java.net.*;
import java.util.Scanner;

public class ChatClient {
    private static final String SERVER_HOST = "localhost";
    private static final int SERVER_PORT = 8888;
    
    public void start() {
        try (
            Socket socket = new Socket(SERVER_HOST, SERVER_PORT);
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader in = new BufferedReader(
                new InputStreamReader(socket.getInputStream())
            );
            Scanner scanner = new Scanner(System.in)
        ) {
            System.out.println("Đã kết nối đến server!");
            System.out.println("Gõ 'help' để xem danh sách lệnh, 'quit' để thoát.");
            
            // Thread để nhận tin nhắn từ server
            Thread receiveThread = new Thread(() -> {
                try {
                    String response;
                    while ((response = in.readLine()) != null) {
                        System.out.println("Server: " + response);
                    }
                } catch (IOException e) {
                    System.out.println("Đã ngắt kết nối với server");
                }
            });
            receiveThread.start();
            
            // Gửi tin nhắn đến server
            String userInput;
            while (true) {
                System.out.print("Bạn: ");
                userInput = scanner.nextLine();
                
                if (userInput == null || userInput.isEmpty()) {
                    continue;
                }
                
                out.println(userInput);
                
                if ("quit".equalsIgnoreCase(userInput)) {
                    break;
                }
            }
            
        } catch (IOException e) {
            System.err.println("Lỗi kết nối: " + e.getMessage());
        }
    }
    
    public static void main(String[] args) {
        ChatClient client = new ChatClient();
        client.start();
    }
}
```

## Ví dụ ứng dụng: Chat Server

Ứng dụng chat đơn giản cho phép nhiều client chat với nhau thông qua server:

```java
import java.io.*;
import java.net.*;
import java.util.*;

public class ChatServer {
    private static final int PORT = 8888;
    private Set<ClientThread> clients = Collections.synchronizedSet(new HashSet<>());
    
    public void start() {
        try {
            ServerSocket serverSocket = new ServerSocket(PORT);
            System.out.println("Chat Server đang chạy trên port " + PORT);
            
            while (true) {
                Socket clientSocket = serverSocket.accept();
                ClientThread clientThread = new ClientThread(clientSocket, this);
                clients.add(clientThread);
                clientThread.start();
            }
        } catch (IOException e) {
            System.err.println("Lỗi server: " + e.getMessage());
        }
    }
    
    public void broadcast(String message, ClientThread sender) {
        for (ClientThread client : clients) {
            if (client != sender) {
                client.sendMessage(message);
            }
        }
    }
    
    public void removeClient(ClientThread client) {
        clients.remove(client);
    }
    
    public static void main(String[] args) {
        ChatServer server = new ChatServer();
        server.start();
    }
}

class ClientThread extends Thread {
    private Socket socket;
    private ChatServer server;
    private PrintWriter out;
    private String username;
    
    public ClientThread(Socket socket, ChatServer server) {
        this.socket = socket;
        this.server = server;
    }
    
    @Override
    public void run() {
        try (
            BufferedReader in = new BufferedReader(
                new InputStreamReader(socket.getInputStream())
            )
        ) {
            out = new PrintWriter(socket.getOutputStream(), true);
            
            // Nhận username
            username = in.readLine();
            server.broadcast(username + " đã tham gia chat", this);
            
            String message;
            while ((message = in.readLine()) != null) {
                if ("quit".equalsIgnoreCase(message)) {
                    break;
                }
                server.broadcast(username + ": " + message, this);
            }
        } catch (IOException e) {
            System.err.println("Lỗi client: " + e.getMessage());
        } finally {
            server.removeClient(this);
            try {
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
    public void sendMessage(String message) {
        if (out != null) {
            out.println(message);
        }
    }
}
```

## Chạy ứng dụng

1. **Chạy Server**:
```bash
javac MultiThreadedServer.java ClientHandler.java
java MultiThreadedServer
```

2. **Chạy Client** (trong terminal khác):
```bash
javac ChatClient.java
java ChatClient
```

## Kết luận

Với kiến thức về Socket và đa luồng, bạn có thể xây dựng các ứng dụng Client-Server mạnh mẽ trong Java. Ứng dụng này có thể mở rộng để xây dựng các hệ thống phức tạp hơn như game online, hệ thống chat, hoặc các dịch vụ mạng khác.

