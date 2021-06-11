+++
title = "Chuẩn bị môi trường"
weight = 1
chapter = false
pre = "<b>1.1. </b>"
+++

#### Cài đặt DynamoDB
Chúng ta cần điền thông tin vào DynamoDB table sẽ sử dụng trong suốt bài thực hành. Thông tin này sẽ được sử dụng để tính số lượng chuyến đi giữa các thành phố khác nhau.
1. Tải tập tin **populate_tripsector.sh** sau xuống máy ảo Windows
{{%attachments /%}}
2. Thực thi dòng lệnh sau trong command line
```bash
populate_tripsector.sh <AWS_REGION>
```
3. Mở DynamoDB trong bảng điều khiển và kiểm tra TravelBuddyTripSectors và xác nhận nó có 50 dòng được thêm vào table.
