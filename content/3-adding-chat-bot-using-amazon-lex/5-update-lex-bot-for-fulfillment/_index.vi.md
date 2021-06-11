+++
title = "Cập nhật Lex bot để sử dụng Lambda"
weight = 5
chapter = false
pre = "<b>3.5. </b>"
+++

Bây giờ chúng ta có một hàm Lambda đang hoạt động, chúng ta có thể cập nhật bot Lex của mình để nó sử dụng hàm Lambda để thực hiện, thay vì trả lại chi tiết vị trí được gợi ý cho người gọi.
1. Trong AWS Console, truy cập Lex
2. Chọn **TravelBuddyChatBot** 
3. Chọn **TravelBuddyCheckFlightsIntent** intent nếu nó không được chọn tự động
4. Chọn **Edit** bên cạnh tên **TravelBuddyCheckFlightsIntent**
5. Cuộn xuống **Fulfillment** section và chọn **AWS Lambda function**
6. Từ danh sách, chọn **TripSearchLexBot** vừa tạo
![Lambda](/images/3/30.png?width=90pc)
7. Trong hộp thoại vừa xuất hiện, chọn **Ok** để cấp quyền cho Lex gọi tới hàm Lambda
![Lambda](/images/3/31.png?width=90pc)
8. Chọn **Save Intent**
9.  Chọn **Build**. Trong hộp thoại xuất hiện, chọn **Build**
10. Trong panel **Test Bot** ở góc phải, nhập **I want to fly from Melbourne to Sydney** vào trường **Chat to your bot**
11. Bot sẽ trả lời lại **When do you want to fly?** Nhập **Tomorrow**.
12. Bot sẽ trả lời **I have 1 flight from Melbourne to Sydney - 1 January 2018** hoặc tương tự - có thể là nhiều hơn 1 chuyến bay hoặc có thể khác thời gian.
![Lex](/images/3/32.png?width=90pc)