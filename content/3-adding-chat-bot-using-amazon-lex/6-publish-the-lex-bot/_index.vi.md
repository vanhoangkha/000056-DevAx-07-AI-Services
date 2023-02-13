+++
title = "Phát hành Lex chat bot"
weight = 6
chapter = false
pre = "<b>3.6. </b>"
+++

Bây giờ chúng ta đã có một bot đang hoạt động, chúng ta có thể xuất bản nó để nó có thể được gọi bằng trang web TravelBuddy.
1. Trong Lex console, chọn **Bot verion** ở menu phía bên trái.
2. Chọn **Create version**.

![Lex](/images/3/33.png?width=90pc)

3. Ấn **Create**

![Lex](/images/3/34.png?width=90pc)

4. Bây giờ bạn thấy một phiên bản mới được tạo.
5. Tiếp theo chúng ta sẽ tạo **prod** alias. Ấn chọn **Aliases** ở menu phía bên trái.
6. Ấn **Create alias**.

![Lex](/images/3/35.png?width=90pc)

7. Nhập **prod** cho tên của alias
8. Trong phần **Associate with a version**, chọn phiên bản mà bạn vừa tạo.

![Lex](/images/3/36.png?width=90pc)

9. Kéo xuống cuối trang và ấn **Create**
10. Ấn vào **English (US)**.

![Bot In Web](/images/3/37.png?width=90pc)

11. Chọn **TripSearchLexBot** cho **Source**, chọn phiên bản **$LATEST**.
12. Ấn **Save**

![Bot In Web](/images/3/38.png?width=90pc)

Trang web TravelBuddy quen thuộc sẽ hiển thị trong trình duyệt của bạn. Như trước đây, bạn sẽ thấy danh sách Đặc biệt của Hotel Specials and Flight Specials được hiển thị trên trang và tùy chọn **Find trips to…** cũng có sẵn. Ngoài ra còn có tùy chọn **Chat with us!**. Nhấp vào và cửa sổ bot trò chuyện sẽ xuất hiện:

13. Nhập truy vấn của bạn - ví dụ: `I want to fly from Sydney to Melbourne`
14. Bot sẽ trả lời **When do you want to fly?** nhập `Tomorrow`
15. Bot sẽ trả lời **Are you sure you want to find flights to Melbourne?** Nhập `Yes`.
16. Bot sẽ trả lời **I have 1 flight from Melbourne to Sydney - 1 January 2018** hoặc tương tự - có thể là nhiều hơn 1 chuyến bay hoặc có thể khác thời gian.

![Bot In Web](/images/3/39.png?width=90pc)

{{% notice note %}} 
Đăng nhập tài khoản của bạn trước khi thực hiện chat.
{{% /notice %}}

