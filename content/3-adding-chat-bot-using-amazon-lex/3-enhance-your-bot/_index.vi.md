+++
title = "Nâng cấp bot"
weight = 3
chapter = false
pre = "<b>3.3. </b>"
+++

Bot của chúng ta hiện tại rất đơn giản, nó chỉ yêu cầu *destination city* . Nhưng để tìm được chuyến bay, chúng tôi thực sự cần cả điểm xuất phát. Trong phần này, chúng ta sẽ thêm điểm xuất phát vào bot.
1. Trong mục **Slot** thêm một slot với **Name** là `originCity`
2. Với **Slot type** chọn **AMAZON.City**
3. Với **Prompt** nhập `What city are you starting from?`
4. Ấn **Add**

![Lex](/images/3/22.png?width=90pc)

5. Tương tự thêm một slot mới cho thông tin ngày:

![Lex](/images/3/23.png?width=90pc)

6. Thêm các mẫu câu cho phép người dùng định nghĩa **origin city** và **date**
   - `I want to go from {originCity} to {destinationCity}`
   - `I want to make a booking for a flight from {originCity} to {destinationCity}`
   - `I am in {originCity} I want to go to {destinationCity}`
   - `What flights are there from {originCity}`
   - `I want to go from {originCity} to {destinationCity} on {date}`
   - `What flights are available from {originCity} to {destinationCity} on {date}`

![Lex](/images/3/24.png?width=90pc)

- Sau đó ấn **Save intent**

7. Xây dựng lại bot bằng cách chọn **Build** và thử kiểm tra lại bot với các câu lệnh đã được thêm vào

#### Trải nghiệm tùy chọn tương tác giọng nói

Bảng điều khiển AWS cho phép bạn kiểm tra bot bằng giọng nói của mình. Thay vì nhập yêu cầu vào bot kiểm tra, hãy thử sử dụng biểu tượng micro để nói. Khi bạn sử dụng giọng nói, bạn có thể thấy rằng bạn nói khác với cách bạn nhập và do đó, bạn có thể cần thêm các mẫu bổ sung để tạo ra một cuộc trò chuyện nghe có vẻ tự nhiên hơn.