+++
title = "Thử nghiệm ứng dụng tìm người"
weight = 4
chapter = false
pre = "<b>2.4. </b>"
+++

People Finder được chia thành 2 phần: trang Master - nơi bạn có thể xóa bộ sưu tập các khuôn mặt được biết, thêm các khuôn mặt mưới và cũng có thể xem danh sách các khuôn mặt đã biết và lần cuối cùng khuôn mặt đó được nhận diện; trang thứ 2 là trang Detector  mô phỏng một camera từ xa có thể được đặt ở một vị trí cụ thể xung quanh ngôi nhà. 
1. Từ trang chủ website, chọn **People Finder - Master**

![Recognise Master](/images/2/27.png?width=90pc)

2. Nếu bạn đã thêm các khuôn mặt vào bộ sưu tập và bạn muốn giữ chúng, đừng chọn **Clear Rekognition Collection**. Nếu bạn muốn xóa tất cả các khuôn mặt đã biết, hãy nhấp vào **Clear Rekognition Collection**
3. Bạn có thể thêm các khuôn mặt mới vào bộ sưu tập bằng cách sử dụng bảng điều khiển **Add face to Rekognition Collection**. Nếu bạn đã có các khuôn mặt trong bộ sưu tập và không cần thêm các khuôn mặt khác, bạn có thể bỏ qua phần đó.
4. Trong phần **Faces detected**, nhấp vào **Start polling DynamoDB table** để bắt đầu bộ đếm thời gian sẽ truy vấn DynamoDB để biết kết quả và hiển thị chúng trong danh sách.
5. Sau một vài giây, danh sách sẽ bắt đầu tự động làm mới. Bạn sẽ thấy tên, tuổi, vị trí và cảm xúc của từng khuôn mặt và thời điểm chúng được phát hiện lần cuối. Vị trí, tình cảm và thời gian được phát hiện sẽ không hợp lệ tại thời điểm này, vì bạn chưa chạy ứng dụng dò tìm.

![Recognise Master](/images/2/28.png?width=90pc)

#### Triển khai hàm Lambda cho bộ xử lý dò tìm

6. Tải mã nguồn tập tin **DetectorImageProcessor-Skeleton.zip** và giải nén.

{{%attachments title="Source code" pattern="DetectorImageProcessor-Skeleton.zip"/%}}

7. Mở project trong Eclipse IDE bằng cách sử dụng **File | Open projects from filesystem...**
8. Việc triển khai vẫn chưa hoàn tất. Bạn có một danh sách những việc cần làm như sau:
```
//************************************************************************************
// TODO:
//
// 1. Phát hiện khuôn mặt trong hình ảnh. Giả sử chỉ có một khuôn mặt được cung cấp
//    Bạn có thể sử dụng hàm getImageUtil() đã được cung cấp để tạo một Image object phù hợp cho Rekognition
//
// 2. Với khuôn mặt đầu tiên trong danh sách kết quả, lấy bộ sưu tập cảm xúc.  Lặp lại bộ sưu tập và tạo một chuỗi chứa tất cả 
//    các cảm xúc hiện có.
//    Nếu không có cảm xúc, hãy đặt một chuỗi cảm xúc là 'Indeterminate'
//    Chỉ lấy cảm xúc có confidence factor > 30
//
// 3. Tìm Rekognition collection để tìm các kết quả phù hợp với khuôn mặt, sử dụng searchFacesByImage().
//    Sử dụng FACE_MATCH_THRESHOLD đã được cung cấp
//
// 4. Nếu bạn tìm thấy một kết quả phù hợp, hãy sử dụng faceId đó để cập nhật DynamoDB table. If you find a match, use 
//    the faceId of the match to update the DynamoDB table.
//    Vì thứ tự xử lý hình ảnh trong S3 là không xác định, bạn không nên cập nhật DynamoDB table nếu hình ảnh cũ hơn bản cập // 
//    nhật cuối cùng lên DynamoDB. 
//    Bạn có thể sử dụng biến DiscoveryDate được trích xuất từ object metadata ở trên cho mục đích đó
//
//************************************************************************************
```
Bạn có thể sử dụng giải pháp đã được cập nhật đầy đủ tại tập tin sau:

{{%attachments title="Source code" pattern="DetectorImageProcessor-Full.zip"/%}}

#### Triển khai hàm Lambda và kích hoạt nó khi tải lên S3
9. Truy cập AWS Lambda, chọn **Create Function**

![Lambda Function](/images/2/29.png?width=90pc)

10. Chọn **Author from scratch**, nhập tên Function là **DetectorImageProcessor**, chọn Runtime **Java 8**
11. Chọn **Create function**

![Lambda Function](/images/2/30.png?width=90pc)

12. Truy cập lambda function vừa tạo, tại mục Code, chọn **Upload from|.zip file**

![Lambda Function](/images/2/31.png?width=90pc)

13. Chọn tập tin **DetectorImageProcessor-Full.zip** và chọn **Save**

![Lambda Function](/images/2/32.png?width=90pc)

14. Tại mục **Function overview**, chọn **Add trigger**

![Lambda Function](/images/2/33.png?width=90pc)

15. Chọn **S3** và chọn bucket **facerecognitionS3bucket**

![Lambda Function](/images/2/34.png?width=90pc)

#### Chạy trang detetor để phát hiện khuôn mặt
16. Truy cập trang web đã tạo ở các bước trước, chọn **People Finder - Detector**
17. Chọn một vị trí từ danh sách - vị trí này là tùy ý, nhưng cho phép bạn chạy nhiều detector được chỉ định cho các vị trí khác nhau để bạn có thể theo dõi nơi ở của nhữung người trong bản demo.
18. Hãy thêm CORS policy sau vào bucket facerecognitions3bucket.
```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "https://m7www.s3.<YOUR-REGION>.amazonaws.com"
        ],
        "ExposeHeaders": [
            "x-amz-server-side-encryption",
            "x-amz-request-id",
            "x-amz-id-2"
        ],
        "MaxAgeSeconds": 3000
    }
]
```

![CORS policy](/images/2/37.png?width=90pc)

19. Nhấp vào **Start webcam**. Trang sẽ bắt đầu gửi hình ảnh đến S3 bucket, điều này sẽ kích hoạt chức năng Lambda để xử lý hình ảnh bằng cách sử dụng Rekognition và cập nhật bảng DynamoDB.

![Lambda Function](/images/2/35.png?width=90pc)

![S3 bucket](/images/2/36.png?width=90pc)