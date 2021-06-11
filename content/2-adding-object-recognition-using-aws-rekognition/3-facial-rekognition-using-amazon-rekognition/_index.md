+++
title = "Nhận diện khuôn mặt bằng Amazon Rekognition"
weight = 3
chapter = false
pre = "<b>2.3. </b>"
+++

Trong bài tập này, bạn sẽ được cung cấp một trang web demo kit để thử nghiệm khả năng nhận dạng khuôn mặt của Amazon Rekogniton đã được thêm vào bộ sưu tập.
Demo này hoạt động bằng cách cho phép thêm khuôn mặt vào bộ sưu tập Rekognition  và có thêm các metadata về khuôn mặt dược thêm vào DynamoDB table. Vì mỗi khuôn mặt duy nhất có một faceId duy nhất, chúng ta có thể sử dụng faceId như là khóa của table.
1. Trong trang chủ của website, chọn **Face Scanner**
2. Chọn **Clear Rekognition Collection** để thiết lập bộ sưu tập ban đầu.
Bạn sẽ nhận được phản hồi như sau:
![Clear Collection](/images/2/20.png?width=90pc)
1. Nhập tên, quê quán và chọn động vật yêu thích của bạn từ danh sách.
2. Chọn **Start Webcam**
3. Định vị khuôn mặt của bạn trước máy ảnh để khuôn mặt của bạn được nhìn thấy rõ ràng và nhấp vào **Add face to Rekognition Collection**
![Add face](/images/2/21.png?width=90pc)
4. Đoạn script trong trang sẽ hiển thị kết quả từ lời gọi tới lời gọi IndexFaces() và sau đó là kết quả của lời gọi thêm metadata tới DynamoDB table.
5. Trong terminal, thực thi lệnh sau:
```bash
aws rekognition list-faces --collection-id iDevelopKnownFaces --profile aws-lab-env --region us-east-1
```
Thông tin này về một khuôn mặt được thêm vào bộ sưu tập Rekognition.

#### Nhận diện khuôn mặt.

Bạn đã thêm khuôn mặt của bạn vào bộ sưu tập, bây giờ bạn có thể sử dụng Rekognition để nhận diện khuôn mặt bạn.

8. Cuộn xuống **Recognise face** và chọn **Start webcam**
9. Webcam sẽ bật và bắt đầu gửi hình ảnh định kỳ đến công cụ Rekognition và cố gắng nhận dạng khuôn mặt của bạn bằng cách so sánh với dữ liệu được lưu trữ trong bộ sưu tập. Định vị khuôn mặt của bạn để nó có thể nhìn thấy rõ ràng và sau một lúc, siêu dữ liệu về bạn sẽ được hiển thị trong các trường văn bản.
![Recognise face](/images/2/22.png?width=90pc)
1.  Thêm các khuôn mặt khác vào bộ sưu tập và thử phát hiện khuôn mặt họ.
2.  Bản demo này lưu trữ metadata bổ sung trong DynamoDB table. Bạn có thể truy cập DynamoDB và xem lại dữ liệu được lưu trữ trong table **iDevelopKnownFaces**
3.  Khi đã có nhiều khuôn mặt trong bộ sưu tập, chạy lại các lệnh CLI ở phía trên và xem kết quả nhận được.