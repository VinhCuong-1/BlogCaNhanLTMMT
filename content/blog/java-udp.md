---
title: "Lập trình UDP Socket Java - DatagramSocket và DatagramPacket"
date: 2024-01-30
tags: ["Java", "UDP", "Socket", "DatagramSocket", "Lập trình mạng"]
summary: "Bài tập và hướng dẫn cụ thể về UDP (DatagramSocket) trong Java, so sánh với TCP và các ví dụ thực tế về lập trình UDP."
related:
  - title: "Lập trình Socket trong Java"
    url: "/blog/java-socket/"
  - title: "Xây dựng ứng dụng Client-Server với Socket trong Java"
    url: "/blog/java-client-server/"
---

# Lập trình UDP Socket Java - DatagramSocket và DatagramPacket

UDP (User Datagram Protocol) là giao thức mạng không kết nối, nhanh và hiệu quả cho các ứng dụng không cần độ tin cậy cao. Bài viết này sẽ hướng dẫn chi tiết về lập trình UDP trong Java.

## Tổng quan về UDP

UDP có những đặc điểm:
- **Không kết nối**: Không cần thiết lập kết nối trước khi gửi dữ liệu
- **Nhanh**: Ít overhead hơn TCP
- **Không đảm bảo**: Không đảm bảo thứ tự và độ tin cậy
- **Phù hợp**: Video streaming, games, DNS, VoIP

## DatagramSocket và DatagramPacket

Trong Java, UDP được thực hiện qua:
- **DatagramSocket**: Socket để gửi/nhận gói tin UDP
- **DatagramPacket**: Gói tin chứa dữ liệu và thông tin địa chỉ

## UDP Server cơ bản

```java
import java.net.*;

public class UDPServer {
    private static final int PORT = 8888;
    private static final int BUFFER_SIZE = 1024;
    
    public void start() {
        try {
            DatagramSocket socket = new DatagramSocket(PORT);
            System.out.println("UDP Server đang lắng nghe trên port " + PORT);
            
            byte[] buffer = new byte[BUFFER_SIZE];
            
            while (true) {
                // Nhận gói tin
                DatagramPacket packet = new DatagramPacket(
                    buffer, 
                    buffer.length
                );
                socket.receive(packet);
                
                // Xử lý dữ liệu nhận được
                String received = new String(
                    packet.getData(), 
                    0, 
                    packet.getLength()
                );
                System.out.println("Nhận từ " + packet.getAddress() + 
                    ": " + received);
                
                // Gửi phản hồi
                String response = "Echo: " + received;
                byte[] responseData = response.getBytes();
                DatagramPacket responsePacket = new DatagramPacket(
                    responseData,
                    responseData.length,
                    packet.getAddress(),
                    packet.getPort()
                );
                socket.send(responsePacket);
            }
        } catch (Exception e) {
            System.err.println("Lỗi server: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    public static void main(String[] args) {
        UDPServer server = new UDPServer();
        server.start();
    }
}
```

## UDP Client cơ bản

```java
import java.net.*;
import java.util.Scanner;

public class UDPClient {
    private static final String SERVER_HOST = "localhost";
    private static final int SERVER_PORT = 8888;
    
    public void start() {
        try {
            DatagramSocket socket = new DatagramSocket();
            InetAddress serverAddress = InetAddress.getByName(SERVER_HOST);
            Scanner scanner = new Scanner(System.in);
            
            System.out.println("Kết nối đến server " + SERVER_HOST + 
                ":" + SERVER_PORT);
            System.out.println("Gõ 'quit' để thoát");
            
            while (true) {
                System.out.print("Bạn: ");
                String message = scanner.nextLine();
                
                if ("quit".equalsIgnoreCase(message)) {
                    break;
                }
                
                // Gửi gói tin
                byte[] data = message.getBytes();
                DatagramPacket packet = new DatagramPacket(
                    data,
                    data.length,
                    serverAddress,
                    SERVER_PORT
                );
                socket.send(packet);
                
                // Nhận phản hồi
                byte[] buffer = new byte[1024];
                DatagramPacket responsePacket = new DatagramPacket(
                    buffer, 
                    buffer.length
                );
                socket.receive(responsePacket);
                
                String response = new String(
                    responsePacket.getData(),
                    0,
                    responsePacket.getLength()
                );
                System.out.println("Server: " + response);
            }
            
            socket.close();
            scanner.close();
        } catch (Exception e) {
            System.err.println("Lỗi client: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    public static void main(String[] args) {
        UDPClient client = new UDPClient();
        client.start();
    }
}
```

## Ứng dụng: Broadcast Server

UDP phù hợp cho broadcast (gửi đến nhiều client cùng lúc):

```java
import java.net.*;

public class BroadcastServer {
    private static final int PORT = 8888;
    private static final String BROADCAST_IP = "255.255.255.255";
    
    public void start() {
        try {
            DatagramSocket socket = new DatagramSocket();
            socket.setBroadcast(true);
            
            String message = "Thông báo từ server!";
            byte[] data = message.getBytes();
            
            InetAddress broadcastAddress = InetAddress.getByName(BROADCAST_IP);
            DatagramPacket packet = new DatagramPacket(
                data,
                data.length,
                broadcastAddress,
                PORT
            );
            
            System.out.println("Gửi broadcast: " + message);
            socket.send(packet);
            
            socket.close();
        } catch (Exception e) {
            System.err.println("Lỗi: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    public static void main(String[] args) {
        BroadcastServer server = new BroadcastServer();
        server.start();
    }
}
```

## Ứng dụng: Multicast (Nhóm)

Multicast cho phép gửi đến một nhóm client cụ thể:

```java
import java.net.*;

public class MulticastServer {
    private static final String MULTICAST_GROUP = "230.0.0.1";
    private static final int PORT = 8888;
    
    public void start() {
        try {
            MulticastSocket socket = new MulticastSocket();
            InetAddress group = InetAddress.getByName(MULTICAST_GROUP);
            
            String message = "Tin nhắn multicast";
            byte[] data = message.getBytes();
            
            DatagramPacket packet = new DatagramPacket(
                data,
                data.length,
                group,
                PORT
            );
            
            System.out.println("Gửi multicast: " + message);
            socket.send(packet);
            
            socket.close();
        } catch (Exception e) {
            System.err.println("Lỗi: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    public static void main(String[] args) {
        MulticastServer server = new MulticastServer();
        server.start();
    }
}

// Multicast Client
class MulticastClient {
    private static final String MULTICAST_GROUP = "230.0.0.1";
    private static final int PORT = 8888;
    
    public void start() {
        try {
            MulticastSocket socket = new MulticastSocket(PORT);
            InetAddress group = InetAddress.getByName(MULTICAST_GROUP);
            socket.joinGroup(group);
            
            System.out.println("Đã tham gia multicast group");
            
            byte[] buffer = new byte[1024];
            DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
            
            socket.receive(packet);
            String message = new String(
                packet.getData(), 
                0, 
                packet.getLength()
            );
            System.out.println("Nhận: " + message);
            
            socket.leaveGroup(group);
            socket.close();
        } catch (Exception e) {
            System.err.println("Lỗi: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    public static void main(String[] args) {
        MulticastClient client = new MulticastClient();
        client.start();
    }
}
```

## So sánh TCP vs UDP

### Khi nào dùng TCP?
- Ứng dụng cần độ tin cậy cao (HTTP, FTP, Email)
- Cần đảm bảo thứ tự dữ liệu
- Có thể chấp nhận độ trễ

### Khi nào dùng UDP?
- Ứng dụng real-time (games, video streaming)
- Có thể chấp nhận mất mát dữ liệu
- Cần tốc độ cao
- Broadcast/Multicast

## Xử lý lỗi trong UDP

```java
import java.net.*;

public class RobustUDPServer {
    public void start() {
        try {
            DatagramSocket socket = new DatagramSocket(8888);
            socket.setSoTimeout(5000); // Timeout 5 giây
            
            byte[] buffer = new byte[1024];
            DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
            
            while (true) {
                try {
                    socket.receive(packet);
                    // Xử lý gói tin
                } catch (SocketTimeoutException e) {
                    System.out.println("Timeout - không có dữ liệu");
                    // Tiếp tục lắng nghe
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## Kết luận

UDP là giao thức mạnh mẽ cho các ứng dụng cần tốc độ và hiệu suất cao. Mặc dù không đảm bảo độ tin cậy như TCP, nhưng UDP phù hợp cho nhiều ứng dụng thực tế như games, streaming, và các dịch vụ real-time.

Hiểu rõ sự khác biệt giữa TCP và UDP sẽ giúp bạn chọn đúng giao thức cho từng ứng dụng cụ thể.

