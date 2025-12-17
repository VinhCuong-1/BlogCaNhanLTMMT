---
title: "Lập trình Socket trong Java - TCP và UDP"
date: 2024-01-20
tags: ["Java", "Socket", "TCP", "UDP", "Lập trình mạng"]
summary: "Tìm hiểu về Socket trong Java, cách tạo Socket TCP/UDP và ví dụ minh họa thực tế. Bài viết giải thích khái niệm Socket và cách sử dụng trong lập trình mạng."
related:
  - title: "Xây dựng ứng dụng Client-Server với Socket trong Java"
    url: "/blog/java-client-server/"
  - title: "Lập trình UDP Socket Java"
    url: "/blog/java-udp/"
  - title: "Java Cơ Bản"
    url: "/blog/java-co-ban/"
---

# Lập trình Socket trong Java - TCP và UDP

Socket là một trong những khái niệm cơ bản nhất trong lập trình mạng. Bài viết này sẽ giới thiệu về Socket trong Java và cách sử dụng chúng để xây dựng các ứng dụng mạng.

## Khái niệm Socket

Socket là điểm cuối (endpoint) của kết nối mạng, cho phép hai chương trình giao tiếp với nhau qua mạng. Trong Java, Socket được hỗ trợ thông qua các class trong package `java.net`.

Có hai loại Socket chính:
- **TCP Socket**: Kết nối có hướng, đáng tin cậy (reliable)
- **UDP Socket**: Kết nối không hướng, nhanh nhưng không đảm bảo thứ tự

## TCP Socket trong Java

TCP (Transmission Control Protocol) đảm bảo dữ liệu được truyền một cách đáng tin cậy và đúng thứ tự.

### Server Socket (TCP)

```java
import java.io.*;
import java.net.*;

public class TCPServer {
    public static void main(String[] args) {
        try {
            // Tạo ServerSocket lắng nghe trên port 8888
            ServerSocket serverSocket = new ServerSocket(8888);
            System.out.println("Server đang lắng nghe trên port 8888...");
            
            // Chấp nhận kết nối từ client
            Socket clientSocket = serverSocket.accept();
            System.out.println("Đã kết nối với client: " + 
                clientSocket.getInetAddress());
            
            // Nhận dữ liệu từ client
            BufferedReader in = new BufferedReader(
                new InputStreamReader(clientSocket.getInputStream())
            );
            String message = in.readLine();
            System.out.println("Nhận từ client: " + message);
            
            // Gửi phản hồi về client
            PrintWriter out = new PrintWriter(
                clientSocket.getOutputStream(), true
            );
            out.println("Server đã nhận: " + message);
            
            // Đóng kết nối
            clientSocket.close();
            serverSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### Client Socket (TCP)

```java
import java.io.*;
import java.net.*;

public class TCPClient {
    public static void main(String[] args) {
        try {
            // Kết nối đến server tại localhost, port 8888
            Socket socket = new Socket("localhost", 8888);
            
            // Gửi dữ liệu đến server
            PrintWriter out = new PrintWriter(
                socket.getOutputStream(), true
            );
            out.println("Xin chào từ client!");
            
            // Nhận phản hồi từ server
            BufferedReader in = new BufferedReader(
                new InputStreamReader(socket.getInputStream())
            );
            String response = in.readLine();
            System.out.println("Nhận từ server: " + response);
            
            // Đóng kết nối
            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## UDP Socket trong Java

UDP (User Datagram Protocol) nhanh hơn TCP nhưng không đảm bảo thứ tự và độ tin cậy.

### UDP Server

```java
import java.net.*;

public class UDPServer {
    public static void main(String[] args) {
        try {
            // Tạo DatagramSocket lắng nghe trên port 8888
            DatagramSocket socket = new DatagramSocket(8888);
            System.out.println("UDP Server đang lắng nghe...");
            
            byte[] buffer = new byte[1024];
            
            // Nhận gói tin từ client
            DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
            socket.receive(packet);
            
            String message = new String(packet.getData(), 0, packet.getLength());
            System.out.println("Nhận từ client: " + message);
            
            // Gửi phản hồi
            String response = "Server đã nhận: " + message;
            byte[] responseData = response.getBytes();
            DatagramPacket responsePacket = new DatagramPacket(
                responseData,
                responseData.length,
                packet.getAddress(),
                packet.getPort()
            );
            socket.send(responsePacket);
            
            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### UDP Client

```java
import java.net.*;

public class UDPClient {
    public static void main(String[] args) {
        try {
            DatagramSocket socket = new DatagramSocket();
            
            String message = "Xin chào từ UDP client!";
            byte[] data = message.getBytes();
            
            // Gửi gói tin đến server
            InetAddress serverAddress = InetAddress.getByName("localhost");
            DatagramPacket packet = new DatagramPacket(
                data,
                data.length,
                serverAddress,
                8888
            );
            socket.send(packet);
            
            // Nhận phản hồi
            byte[] buffer = new byte[1024];
            DatagramPacket responsePacket = new DatagramPacket(buffer, buffer.length);
            socket.receive(responsePacket);
            
            String response = new String(
                responsePacket.getData(), 
                0, 
                responsePacket.getLength()
            );
            System.out.println("Nhận từ server: " + response);
            
            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## So sánh TCP và UDP

| Đặc điểm | TCP | UDP |
|----------|-----|-----|
| Độ tin cậy | Đảm bảo | Không đảm bảo |
| Thứ tự | Đảm bảo | Không đảm bảo |
| Tốc độ | Chậm hơn | Nhanh hơn |
| Kết nối | Có hướng | Không hướng |
| Sử dụng | HTTP, FTP, Email | DNS, Video streaming, Games |

## Kết luận

Socket là công cụ mạnh mẽ để xây dựng các ứng dụng mạng trong Java. TCP phù hợp cho các ứng dụng cần độ tin cậy cao, trong khi UDP phù hợp cho các ứng dụng cần tốc độ và có thể chấp nhận mất mát dữ liệu.

Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu cách xây dựng một ứng dụng Client-Server hoàn chỉnh với Socket trong Java.

