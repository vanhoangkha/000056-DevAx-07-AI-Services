+++
title = "Tạo lamda handler cho bot lex"
weight = 4
chapter = false
pre = "<b>3.4. </b>"
+++

Hiện tại, chat bot sẽ trả lại các vị trí được lấy ra từ người dùng, trở lại cho caller dưới dạng JSON payload. Thay vào đó, chúng ta muốn bot của mình thực hiện tìm kiếm thực tế trong cơ sở dữ liệu các chuyến đi và hiển thị các tùy chọn trở lại cho người dùng, nếu không, khách hàng của chúng ta (trình duyệt) sẽ cần thực hiện thêm một cuộc gọi đến back-end để tìm kiếm các chuyến đi. Mặc dù đó có thể là những gì bạn muốn làm trong một số tình huống, nhưng trong trường hợp này, chúng ta sẽ triển khai một hàm Lambda để thực hiện tất cả công việc đáp ứng yêu cầu và trả lại kết quả trong một lần truy cập.

Trong bài tập này, chúng ta sẽ tạo một hàm Lambda được viết bằng NodeJS để thực hiện đầy đủ chức năng cho bot của chúng ta.
1. Trong AWS Console, truy cập Lambda
2. Chọn **Create function**
3. Chọn **Author from scratch**
4. Với **Name** nhập **TripSearchLexBot**
5. Với **Runtime** chọn **Node.js 12.x**
6. Mở rộng **Change default execution role**
7. Và chọn **Existing role** sau đó chọn **LambdaRole**
8. Chọn **Create function**
![Lambda](/images/3/26.png?width=90pc)
9.  Tải tập tin **lambda-lexbothandler.js** và sao chép nội dung của tập tin.
10. Trong Lambda console, dán nội dung đã sao chép từ tập tin **lambda-lexbothandler.js** vào trường code entry, thay thế các nội dung đã có sẵn
![Lambda](/images/3/27.png?width=90pc)
11. Chọn **Deploy** và **Test**
12. Hộp thoại **Configure test event** sẽ xuất hiện. Thay thế nội dung của test event bằng đoạn JSON sau đây:
```JSON
{
  "currentIntent": {
    "slots": {
      "originCity": "Melbourne",
      "destinationCity": "Sydney",
      "Date": "2017-12-31"
    },
    "name": "TravelBuddyCheckFlightsIntent",
    "confirmationStatus": "None"
  },
  "bot": {
    "alias": "$LATEST",
    "version": "$LATEST",
    "name": "TravelBuddyChatBot"
  },
  "userId": "Adam",
  "invocationSource": "Fulfillment",
  "outputDialogMode": "Text",
  "messageVersion": "1.0",
  "sessionAttributes": {}
}
```
13. Với **Event name** nhập **TripSearchLexTest**
14. Chọn **Create**
![Lambda](/images/3/28.png?width=90pc)
15. Chọn **Test** để kiểm tra hàm Lambda vừa tạo. Sau một khoảng thời gian, bạn sẽ nhận được kết quả như sau:
![Lambda](/images/3/29.png?width=90pc)
Điều này cho thấy rằng hàm Lambda có thể đọc chính xác dữ liệu đầu vào và truy vấn bảng DynamoDB cho các chuyến bay từ Melbourne đến Sydney và trả về các kết quả phù hợp.
16.  Hãy dành một vài phút để xem lại mã hàm Lambda này, để bạn hiểu nó hoạt động như thế nào.