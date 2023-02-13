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
4. Ấn **Test**
5. Ấn vào biểu tượng cài đặt.
6. Trong phần **Lambda function - optional**, chọn function **TripSearchLexBot** làm **Source**.
7. Chọn phiên bản **$LATEST**
8. Ấn **Save**

![Lambda](/images/3/29.png?width=90pc)

9. Trong mục **Fulfullment**, mở rộng **On successful fulfillment**
10. Sau đó ấn **Advanced options**
11. Tích chọn **Use a Lambda function for fulfillment**
12. Ấn **Update options**

![Lambda](/images/3/30.png?width=90pc)

13. Ấn **Actice** cho phần **Fulfillment**
14. Ấn **Save intent**, sau đó ấn **Build** để build lại intent của bạn.

![Lex](/images/3/31.png?width=90pc)

15. Ấn **Test**, enter `I want to fly from Melbourne to Sydney` to `Type a message`.
16. Bot sẽ trả lời lại *When do you want to fly?* Nhập `Tomorrow`.
17. Bot sẽ trả lời *Are you sure you want to find flights to Sydney?* Nhập `Yes`.
18. Bot sẽ trả lời *I have 1 flight from Melbourne to Sydney - 1 January 2018* hoặc tương tự - có thể là nhiều hơn 1 chuyến bay hoặc có thể khác thời gian.

![Lex](/images/3/32.png?width=90pc)