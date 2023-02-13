+++
title = "Phát hiện đối tượng bằng Amazon Rekognition"
weight = 2
chapter = false
pre = "<b>2.2. </b>"
+++

Trong bài tập này, bạn sẽ tạo một ứng dụng dựa trên trình duyệt sử dụng webcam trên máy tính của bạn để 'xem' hình ảnh và hiển thị nhãn cho các thuộc tính được phát hiện.
1. Tải mã nguồn tập tin **www.zip** và giải nén.

{{%attachments /%}}

2. Mở tập tin *config/config.js*, tìm và thay thế các giá trị dưới đây bằng giá trị từ tab **CloudFormation Outputs**:

| Text                                   | CloudFormation output value |
|----------------------------------------|-----------------------------|
| REPLACE_WITH_COGNITO_IDENTITY_POOL_ID  | CognitoIdentityPoolId       |
| REPLACE_WITH_DETECTOR_UPLOAD_BUCKET    | S3BucketDetectorUploads     |
| REPLACE_WITH_YOUR_DYNAMO_DB_TABLE_NAME | DynamoDBFaces               |
| REPLACE_WITH_YOUR_AWS_REGION           | Your current region         |

![Rekonition](/images/2/17.png?width=90pc)

3. Lưu tập tin 
4. Sao chép nội dung của thư mục đã giải nén vào S3 bucket 
```bash
aws s3 cp . s3://m7www --recursive --region <YOUR-REGION> --profile aws-lab-env
```
5. Để có thể truy cập website, ta cần **Make public with ACL** các object có trong bucket.
6. Truy cập bucket m7www, chọn tab **Permissions**. Kéo xuống mục **Access control list (ACL)**, ấn **bucket owner enforced**.

![Make public](/images/2/18.png?width=90pc)

7. Chọn **ACLs enabled**, chọn tiếp **Save changes**

![Make public](/images/2/19.png?width=90pc)

8. Quay lại tab **Objects**, chọn tất cả các object. Sau đó ấn **Actions | Make public with ACL**

![Make public](/images/2/20.png?width=90pc)

9. Truy cập trang web với đường dẫn như sau:
`
https://m7www.s3-<region>.amazonaws.com/index.html
`
10. Bạn sẽ thấy một trang mới xuất hiện với 4 tùy chọn. Chọn vào tùy chọn đầu tiên **Object Scanner** 

![Object scanner](/images/2/21.png?width=90pc)

11.  Khi trang tải xong, bạn sẽ thấy thông báo yêu cầu quyền sử dụng webcam của máy tính của bạn. Nếu bạn thấy lỗi xuất hiện, kiểm tra lại xem bạn có đang duyệt trang web một cách an toàn bằng HTTPS hay không.
12. Chọn **Start Rekognition** để bắt đầu gửi hình ảnh tới Rekognition service.

![Object scanner](/images/2/22.png?width=90pc)

13. Trang sẽ kết nối bằng Amazon Cognito, sau đó đẩy hình ảnh từ webcam lên Rekognition. Trong trả về, trang sẽ hiển thị danh sách các đối tượng mà nó 'thấy' trong hình ảnh.

![Object scanner](/images/2/23.png?width=90pc)

14. Thử đưa các hình ảnh khác nhau lên trước camera để xem sự thay đổi của danh sách đối tượng.
15. Hãy xem lại mã nguồn triển khai trong demo này để đảm bảo rằng bạn hiểu được cách thức hoạt động của nó.