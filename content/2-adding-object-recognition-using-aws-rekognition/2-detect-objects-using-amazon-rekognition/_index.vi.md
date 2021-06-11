+++
title = "Phát hiện đối tượng bằng Amazon Rekognition"
weight = 1
chapter = false
pre = "<b>2.2. </b>"
+++

Trong bài tập này, bạn sẽ tạo một ứng dụng dựa trên trình duyệt sử dụng webcam trên máy tính của bạn để 'xem' hình ảnh và hiển thị nhãn cho các thuộc tính được phát hiện.
1. Tải mã nguồn tập tin **www.zip** và giải nén.
{{%attachments /%}}
1. Mở tập tin *config/config.js*, tìm và thay thế **REPLACE_WITH_COGNITO_IDENTITY_POOL_ID**, **REPLACE_WITH_DETECTOR_UPLOAD_BUCKET**, **ddbTableName** và **region** trong tập tin
![Rekonition](/images/2/15.png?width=90pc)
2. Lưu tập tin 
3. Sao chép nội dung của thư mục đã giải nén vào S3 bucket 
```bash
aws s3 cp . s3://m7www --recursive --region ap-southeast-2 --profile aws-lab-env
```
4. Để có thể truy cập website, ta cần Make public các object có trong bucket.
5. Truy cập bucket m7www, chọn tất cả các object trong bucket. Tại mục **Actions**, chọn **Make public**
![Make public](/images/2/16.png?width=90pc)
6. Chọn tiếp **Make public**
![Make public](/images/2/17.png?width=90pc)
7. Truy cập trang web với đường dẫn như sau:
`
https://m7www.s3-<region>.amazonaws.com/index.html
`
8. Bạn sẽ thấy một trang mới xuất hiện với 4 tùy chọn. Chọn vào tùy chọn đầu tiên **Object Scanner** 
![Object scanner](/images/2/18.png?width=90pc)
9.  Khi trang tải xong, bạn sẽ thấy thông báo yêu cầu quyền sử dụng webcam của máy tính của bạn. Nếu bạn thấy lỗi xuất hiện, kiểm tra lại xem bạn có đang duyệt trang web một cách an toàn bằng HTTPS hay không.
10. Chọn **Start Rekognition** để bắt đầu gửi hình ảnh tới Rekognition service.
11. Trang sẽ kết nối bằng Amazon Cognito, sau đó đẩy hình ảnh từ webcam lên Rekognition. Trong trả về, trang sẽ hiển thị danh sách các đối tượng mà nó 'thấy' trong hình ảnh.
![Object scanner](/images/2/19.png?width=90pc)
12. Thử đưa các hình ảnh khác nhau lên trước camera để xem sự thay đổi của danh sách đối tượng.
13. Hãy xem lại mã nguồn triển khai trong demo này để đảm bảo rằng bạn hiểu được cách thức hoạt động của nó.