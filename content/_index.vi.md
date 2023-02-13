+++
title = "Trải nghiệm các dịch vụ Amazon AI"
date = 2023
weight = 1
chapter = false
+++
# Trải nghiệm các dịch vụ Amazon AI

Trong bài thực hành này, chúng ta sẽ khám phá các dịch vụ của Amazon AI - Lex, Polly và Rekognition - và tương tác với thế giới thực bằng cách sử dụng ngôn ngữ tự nhiên, nhận diện giọng nói và hình ảnh. Trong các bài thực hành trước, chúng ta đã tạo một ứng dụng web monolithic *TravelBuddy* và tái cấu trúc nó thành một ứng dụng single-page web được quản lý trên Amazon S3 bucket và chia tách các phần tử dữ liệu khác nhau thành các microsevice, cho phép người dùng truy vấn các chuyến bay trong hệ thống dựa vào thành phố đi và thành phố đến thông qua văn bản. Trong bài thực hành này, chúng ta sẽ tiến một bước xa hơn, cung cấp một chat bot, cho phép người dùng sử dụng ngôn ngữ tự nhiên để truy vấn trong cửa sổ chat, và tương tác với công cụ tìm kiếm như thể họ đang trò chuyện với con người.

Chúng ta sẽ tìm hiểu cách sử dụng Java SDK để tổng hợp giọng nói bằng Amazon Polly và sử dụng AWS CLI để tạo giọng nói và các điểm đánh dấu giọng nói để thúc đẩy hình ảnh hoặc phụ đề.

Chúng ta cũng sẽ xem xét cách sử dụng Amazon Rekognition để thực hiện trích xuất các chứng năng và phân loại các đối tượng trong hình ảnh và sử dụng tính năng nhận diện khuôn mặt của  Rekognition để tạo mô hình hệ thống theo dõi người.

#### Nội dung
Sau khi hoàn thành bài thực hành, bạn sẽ có thể:
- Sử dụng Java SDK để tương tác với Amazon AI Services
- Triển khai ứng dụng web tương tác với Amazon Lex và Amazon Rekognition
- Tạo bài phát biểu sống động bằng Amazon Polly
- Sử dụng các dịch vụ và tính năng AWS khác nhau cùng nhau để tạo hệ thống - chẳng hạn như sử dụng S3 trigger để chạy các hàm Lambda sử dụng Rekognition, DynamoDB và S3 cùng nhau

#### Yêu cầu về kiến thức kỹ thuật
Để thực hiện thành công bài thực hành, bạn phải quen thuộc với AWS Management Console và sử dụng được trình soạn thảo để chỉnh sửa script.
#### Môi trường thực hành
Bài thực hành này sẽ sử dụng các tài nguyên đã được tạo và cấu hình từ Module 6.