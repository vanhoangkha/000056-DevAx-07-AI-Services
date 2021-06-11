+++
title = "Tạo một chat box lex cho travelbuddy"
weight = 2
chapter = false
pre = "<b>3.2. </b>"
+++

Bây giờ chúng ta đã thiết lập và chạy TravelBuddy, đã đến lúc thêm một chat bot vào trang web để cho phép người dùng tìm các chuyến bay bằng cách sử dụng tương tác tự nhiên với bot. Trong phần này, chúng ta sẽ tạo một bot đơn giản với mục đích tìm các chuyến bay đến một điểm đến. Chúng ta sẽ cải tiến chat bot này ở các phần sau.

1. Trên Bảng điều khiển AWS trong trình duyệt, nhấp vào **Services** và nhập **lex** rồi nhấn enter.
2. Nhấp vào **Get Started**
![Lex](/images/3/9.png?width=90pc)
3. Nhấp vào **Custom bot**
![Lex](/images/3/10.png?width=90pc)
4. Đối với **Bot name** nhập *TravelBuddyChatBot*
5. Đối với **Language** chọn *English (US)*
6. Đối với **Output Voice** chọn *Joanna*
7. Đối với **Session timeout** nhập *5* và chọn *minutes*
8. Đối với **Sentiment analysis** chọn *No*
9.  Đối với **COPPA*** chọn *No*
10. Với **Confidence score threshold** đặt như mặc định
11. Chọn **Create** để tạo Lex bot mới
![Lex](/images/3/11.png?width=90pc)
12. Chọn **Create Intent**. 
![Lex](/images/3/12.png?width=90pc)
14. Trong hộp thoại vừa xuất hiện, chọn **Create intent**
![Lex](/images/3/13.png?width=90pc)
15. Nhập tên **TravelBuddyCheckFlightsIntent**
16. Chọn **Add**
![Lex](/images/3/14.png?width=90pc)
17. Với **Sample utterances** nhập ```I would like to fly to {destinationCity}```
18. Chọn icon **+**
Theo cách này, chúng ta đã nhúng một tham số vị trí có tên là **DestinationCity**. Bây giờ chúng ta cần khai báo tên tên này trong phần **Slots**.
17. Trong **Slots**, với **Name** nhập **destinationCity**
18. Với **Slot type** chọn **AMAZON.US_CITY**
![Lex](/images/3/15.png?width=90pc)
19. Với **Prompt** nhập **What city would you like to fly to?**. Chọn biểu tượng **+** để thêm slot
Bây giờ chúng ta cần xác định **Confirmation prompt** được sử dụng để xác nhận thông tin mà người dùng muốn.
21. Mở rộng trường **Confirmation prompt** và đánh dấu chọn **Confirmation prompt**.
22. Trong mục **Confirm** nhập **Are you sure you want to find flights to {destinationCity}?**
23. Trong mục **Cancel** nhập **No problem, you can try again later**
24. Chọn **Save intent**
![Lex](/images/3/16.png?width=90pc)
#### Kiểm tra bot
25. Trong phần đầu trang, chọn **Build**
![Lex](/images/3/17.png?width=90pc)
26. Trong hộp thoại vừa xuất hiện, chọn **Build**
Bot của bạn sẽ được build và sẵn sàng để kiểm tra
![Lex](/images/3/18.png?width=90pc)
27. Trong **Test Bot** ở panel bên phải, nhập **I would like to fly** trong trường **Chat to your bot**
28. Bot sẽ trả lời *What city would you like to fly to?* Nhập **Sydney**
29. Bot sẽ trả lời *Are you sure you want to find flights to Sydney?* Nhập **Yes**
30. Bot sẽ phản hồi bằng cách trả lại các chi tiết về mục đích và các giá trị vị trí
![Lex](/images/3/19.png?width=90pc)
31. Hãy thử với vài biến thể, ví dụ **I want to go to Sydney**. Nếu bạn thử **I want to make a flight booking** bạn sẽ nhận được thông báo rằng bot không hiểu. 
![Lex](/images/3/20.png?width=90pc)
32. Yêu cầu mà bạn vừa gửi tới khác biệt so với câu nói mà bạn đã xác định. Bạn có thể khắc phục điều đó bằng cách thêm các câu nói mẫu bổ sung. Thêm một vài biến thể bổ sung cho bot của bạn trong phần **Sample utterances**, ví dụ như:
    - I want to make a flight booking
    - I want to make a booking
    - I want to go to {destinationCity}
    - What flights are available to {destinationCity}
    - Is there a flight to {destinationCity}
... và biến thể khác mà bạn có thể nghĩ ra.
Notice: không thêm dấu câu vào các sample utterances
32. Build lại bot bằng cách chọn **Build** và thử lại bằng các mẫu câu mà bạn đã thêm vào.
![Lex](/images/3/21.png?width=90pc)