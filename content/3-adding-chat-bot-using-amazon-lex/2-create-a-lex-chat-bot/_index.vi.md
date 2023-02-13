+++
title = "Tạo một chat box lex cho travelbuddy"
weight = 2
chapter = false
pre = "<b>3.2. </b>"
+++

Bây giờ chúng ta đã thiết lập và chạy TravelBuddy, đã đến lúc thêm một chat bot vào trang web để cho phép người dùng tìm các chuyến bay bằng cách sử dụng tương tác tự nhiên với bot. Trong phần này, chúng ta sẽ tạo một bot đơn giản với mục đích tìm các chuyến bay đến một điểm đến. Chúng ta sẽ cải tiến chat bot này ở các phần sau.

1. Trên Bảng điều khiển AWS trong trình duyệt, nhấp vào **Services** và nhập **lex** rồi nhấn enter.
2. Nhấp vào **Get Started**

![Lex](/images/3/10.png?width=90pc)

3. Nhấp vào **Custom bot**
4. Đối với **Bot name** nhập `TravelBuddyChatBot`
5. Trong phần **IAM Permissions**, chọn **Create a role with basic Amazon Lex permissions.**

![Lex](/images/3/11.png?width=90pc)

6. Đối với **COPPA*** chọn *No*
7. Đối với **Session timeout** nhập `5` và chọn *minutes*
8. Ấn **Next**

![Lex](/images/3/12.png?width=90pc)

9. Đối với **Language** chọn *English (US)*
10. Đối với **Output Voice** chọn *Joanna*. Với **Confidence score threshold** đặt như mặc định
11. Chọn **Done** để tạo Lex bot mới

![Lex](/images/3/13.png?width=90pc)

12. Nhập tên **TravelBuddyCheckFlightsIntent**
13. Chọn **Save Intent**

![Lex](/images/3/14.png?width=90pc)

14. Với **Sample utterances** nhập ```I would like to fly to {destinationCity}```
15. Ấn **Add utterances**

![Lex](/images/3/15.png?width=90pc)

Theo cách này, chúng ta đã nhúng một tham số vị trí có tên là **destinationCity**. Bây giờ chúng ta cần khai báo tên tên này trong phần **Slots**.

16. Trong **Slots**, ấn **Add slot**.
17. Với **Name** nhập `destinationCity`.
18. Với **Slot type** chọn **AMAZON.City**.
19. Với **Prompt** nhập **What city would you like to fly to?**. Sau đó ấn **Add**.

![Lex](/images/3/16.png?width=90pc)


Bây giờ chúng ta cần xác định **Confirmation** được sử dụng để xác nhận thông tin mà người dùng muốn.

21. Mở rộng trường **Confirmation** và nhấp chuột vào **Active**.
22. Trong mục **Confirm prompt** nhập `Are you sure you want to find flights to {destinationCity}?`
23. Trong mục **Cancel** nhập `No problem, you can try again later`
24. Chọn **Save intent**

![Lex](/images/3/17.png?width=90pc)

#### Kiểm tra bot

25. Trong phần đầu trang, chọn **Build**

![Lex](/images/3/18.png?width=90pc)

26. Bot của bạn sẽ được build và sẵn sàng để kiểm tra
27. Ấn **Test** để thực hiện kiểm tra, nhập `I would like to fly` trong trường **Type a message**
28. Bot sẽ trả lời *What city would you like to fly to?* , nhập `Sydney`
29. Bot sẽ trả lời *Are you sure you want to find flights to Sydney?*, nhập `Yes`
30. Bot sẽ phản hồi bằng cách trả lại các chi tiết về mục đích và các giá trị vị trí

![Lex](/images/3/19.png?width=90pc)

31. Hãy thử với vài biến thể, ví dụ `I want to go to Sydney`. Nếu bạn thử `I want to make a flight booking` bạn sẽ nhận được thông báo rằng bot không hiểu.

![Lex](/images/3/20.png?width=90pc)

32. Yêu cầu mà bạn vừa gửi tới khác biệt so với câu nói mà bạn đã xác định. Bạn có thể khắc phục điều đó bằng cách thêm các câu nói mẫu bổ sung. Thêm một vài biến thể bổ sung cho bot của bạn trong phần **Sample utterances**, ví dụ như:
    - `I want to make a flight booking`
    - `I want to make a booking`
    - `I want to go to {destinationCity}`
    - `What flights are available to {destinationCity}`
    - `Is there a flight to {destinationCity}`

... và biến thể khác mà bạn có thể nghĩ ra.

Notice: không thêm dấu câu vào các sample utterances.

32. Build lại bot bằng cách chọn **Build** và thử lại bằng các mẫu câu mà bạn đã thêm vào.

![Lex](/images/3/21.png?width=90pc)