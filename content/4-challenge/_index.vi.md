+++
title = "Thử thách"
date = 2023
weight = 4
chapter = false
pre = "<b>4. </b>"
+++

Chúc mừng, bây giờ bạn đã kết thúc triển khai trang web TravelBuddy. Bạn một trang SPA hoạt động đầy đủ được lưu trữ trên Amazon S3 với CloudFront. Trang web gọi microservices thông qua API Gateway và được lưu trữ trên AWS Lambda. Bạn có một bot chat cho phép khách hàng thực hiện các truy vấn bằng tiếng Anh đơn giản và thực hiện các chức năng như tìm kiếm chuyến bay. Hãy thử những thử thách bổ sung này!\
- Tạo những mẫu câu mới trong bot Lex để khách hàng có thể hỏi các câu hỏi khác nhau trong cửa sổ trò chuyện, chẳng hạn như **I want to book a hotel** hoặc **What is the cheapest fare today?**.

- Hiện tại, mặc dù bot Lex yêu cầu một tương tác với **date**, nhưng ngày thực sự không được sử dụng trong hàm Lambda. Hãy cập nhật mã nguồn của Lmabda cho trình xử lý thực hiện bot Lex để nó chỉ trả về các chuyến bay trong khoảng 24 giờ kể từ ngày người dùng chỉ định.

- Bot chat hiện đang mong đợi một thành phố xuất phát và một điểm đến, nhưng đôi khi người dùng có thể chỉ muốn biết **When is the next flight out of Melbourne?**. Hãy triển khai tính năng này.

- Không có hiệu ứng lề (side-effect) của chat bot đang chạy. Dữ liệu được trả về từ cửa sổ và tương tác kết thúc. Triển khai một tính năng cho phép thay đổi đối với hệ thống do tương tác của bot chat. Ví dụ như tạo một bảng DynamoDB mới và cho phép người dùng thêm chuyến bay vào bảng bằng cách sử dụng bot chat.
