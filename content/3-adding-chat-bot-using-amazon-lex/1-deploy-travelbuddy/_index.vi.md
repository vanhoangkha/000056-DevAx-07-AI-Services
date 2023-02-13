+++
title = "Triển khai ứng dụng Travellbuddy"
weight = 1
chapter = false
pre = "<b>3.1. </b>"
+++

Trong bài tập này, bạn sẽ triển khai trang web TravelBuddy dưới dạng Ứng dụng web một trang (SPA) trên S3. Sau đó, bạn sẽ triển khai một chatbot mà người dùng đã đăng ký có thể sử dụng để đối thoại bằng ngôn ngữ tự nhiên với các microservices của bạn nhằm tìm kiếm thông tin về các chuyến bay.
1. Tải tập tin **TravelBuddy.zip** và giải nén tập tin. Chúng ta sẽ sử dụng tập tin này ở những bước sau, sau khi đã tạo và tải các SDK của từng microservices.

{{%attachments title="Travel Buddy" pattern="TravelBuddy.zip"/%}}

Việc triển khai SPA mà bạn đã được cung cấp đã triển khai sơ bộ ba API mà chúng tôi muốn giới thiệu cho người dùng của mình. Chúng triển khai vừa đủ để không gây ra lỗi trên trang khi được thực thi, nhưng không cung cấp bất kỳ dữ liệu nào. Để 'kết nối' các API này với SPA, chúng ta sẽ cần triển khai các microservice, triển khai chúng tới AWS Lambda, tạo một API endpoint và tạo các SDK ứng dụng khách Javascript có liên quan đến các API này. Bạn đã hoàn thành nhiệm vụ này trong module trước và bạn không cần thiết phải kết nối tất cả các microservices cho phòng thí nghiệm này, nhưng bạn có thể làm như vậy nếu muốn thực hành. Nếu bạn kết nối tất cả các microservices, thì bạn sẽ có một trang web TravelBuddy hoạt động hoàn chỉnh, với đầy đủ các chức năng tìm kiểm Flight Services, Hotel Services và Trip Services và cũng bao gồm một chat bot sử dụng ngôn ngữ tự nhiên.
Nếu bạn muốn bỏ qua quá trình tạo các microservices, bạn có thể tới bước Cập nhật cấu hình TravelBuddy SPA

#### Xây dựng và triển khai microservices
Trong bước này, bạn sẽ sử dụng AWS CLI và CloudFormation / SAM để triển khai các dịch vụ nhỏ. Bằng cách sử dụng CloudFormation / SAM, nhiều bước thủ công sẽ được thực hiện cho bạn, giúp hợp lý hóa quy trình triển khai. Bạn vẫn sẽ phải kích hoạt quy trình theo cách thủ công, nhưng việc triển khai thực tế sẽ được tự động hóa.

Các microservices của *HotelSpecials* và *FlightSpecials* cần truy cập vào cơ sở dữ liệu MySQL để truy xuất dữ liệu về các sản phẩm đặc biệt của khách sạn. Môi trường phòng thí nghiệm đã tự động triển khai và tạo cơ sở dữ liệu cho bạn. MySQL instance đã được triển khai bằng Amazon RDS và không thể truy cập công khai vì nó được khởi chạy trong một private subnet. Do đó, để các hàm Lambda có thể kết nối với cơ sở dữ liệu, các hàm Lambda cũng sẽ cần được triển khai thành một private subnet bằng cách kích hoạt VPC Integration. Tập tin **template.yml** được cung cấp cho cả hai dịch vụ này có tất cả các thiết lập cần thiết để thực hiện việc này, bạn chỉ cần cập nhật theo hướng dẫn bên dưới.

#### Với hai microserivce HotelSpecials và FlightSpecials, làm theo các bước dưới đây:
2. Tải mã nguồn từ hai tập tin **HotelSpecials.zip** và **FlightSpecials.zip** và giải nén.

{{%attachments title="Source API" pattern="HotelSpecials.zip|FlightSpecials.zip"/%}}

3. Mở terminal và *cd* tới thư mục đã giải nén, sử dụng câu lệnh sau để build:
```
mvn package shade:shade
```
4. Tìm tập tin **template.yml** trong mã nguồn, tìm và cập nhật các thông tin sau:
- DatabaseSecurityGroup
- DatabaseSubnet1
- DatabaseSubnet2
- RDSEndpoint

![Update template](/images/3/1.png?width=90pc)

5. Lưu tập tin.
6. Sử dụng AWS CLI để đóng gói hàm Lambda
```bash
aws cloudformation package --template template.yml --s3-bucket <S3BucketLambdaCode> --output-template template-export.yml --profile aws-lab-env --region us-east-1
```
Thay thế <S3BucketLambdaCode> bằng tên S3 bucket đã có ở module 6.

7. Sử dụng AWS CLI để tạo và triển khai CloudFormation Change Set:
```
aws cloudformation deploy --template-file template-export.yml --stack-name <MICROSERVICE_NAME> --capabilities CAPABILITY_IAM --profile aws-lab-env
```
Thay thế <MICROSERVICE_NAME> bằng một tên phù hợp.

![API Gateway](/images/3/2.png?width=90pc)

8. Khi Change Set thực thi xong, các API HotelSpecials và FlightSpecials đã được triển khai.
9. Xác nhận các API đã được triển khai bằng cách kiểm tra việc gọi API bằng các URL được cung cấp trong **prod** stage
   - Chọn **Stages** ở panel bên trái của từng API
   - Chọn **prod**
   - Chọn phương thức **GET**
   - Chọn giá trị **Invoke URL**  trong *prod - GET* panel. Sau một lúc trong khi hàm Lambda được khởi tạo, bạn sẽ thấy kết quả JSON của việc truy vấn cơ sở dữ liệu MySQL từ hàm Lambda.
   - Nếu bạn thấy JSON payload không có lỗi là bạn đã triển khai thành công microservice phía sau API Gateway endpoint.

![API Gateway](/images/3/3.png?width=90pc)

![API Gateway](/images/3/4.png?width=90pc)

Hãy đảm bảo rằng cả 2 microservice đều không có lỗi và hoạt động tốt.

#### Với microservice TripSearch thực hiện những bước sau:

10. Tải mã nguồn từ tập tin **TripSearch** và giải nén.

{{%attachments title="Trip Search" pattern="TripSearch.zip"/%}}

11. Trong terminal, *cd* tới thư mục đã giải nén và sử dụng câu lệnh sau để build:
```
mvn package shade:shade
```
12. Sử dụng AWS CLI để đóng gói hàm Lambda:
```
aws cloudformation package --template template.yml --s3-bucket <S3BucketLambdaCode> --output-template template-export.yml --profile aws-lab-env  --region us-east-1
```
Thay thế giá trị của <S3BucketLambdaCode>  và lưu tập tin.
13. Sử dụng AWS CLI để tạo và triển khai CloudFormation Change Set:
```
aws cloudformation deploy --template-file template-export.yml --stack-name TripSearchAPI --capabilities CAPABILITY_IAM --profile aws-lab-env --region us-east-1
```
14. Khi ChangeSet được thực thi xong, TripSearch API dã được triển khai. Xác nhận API đã hoạt động chính xác bằng cách mở API Gateway, kiểm tra các lệnh gọi API bằng cách truy cập URL được cung cấp **prod** stage, tương tự như phần trước.

![API Gateway](/images/3/5.png?width=90pc)

#### Tạo SDK cho microservice và cập nhật mã nguồn SPA

Đối với từng API trong 3 API đã tạo, tiến hành các bước theo hướng dẫn bên dưới đây, sử dụng các tên TripSearch, HotelSpecials hoặc FlightSpecials tương ứng. Hướng dẫn bên dưới đang sử dụng tên *FlightSpecials* - bạn cần sử dụng đúng tên của từng API trong lúc cấu hình.

15. Mở **API Gateway** console và chọn **iDevelop - Flight Specials API**, sau đó chọn **Stages**
16. Chọn **prod**
17. Chọn **SDK Generation**
18. Tại mục **Platform** chọn **Javascipt**
19. Chọn **Generate SDK**. Javascipt SDK của API sẽ được tải xuống.

![API Gateway](/images/3/6.png?width=90pc)

20. Giải nén thư mục vừa tải xuống và tìm tập tin **apigClient.js**
21. Đổi tên các tập tin thành `apigClient_FlightSpecials.js` (hoặc `apigClient_HotelSpecials.js` / `apigClient_TripSearch.js`)
22. Mở tập tin lên để chỉnh sửa
23. Tìm và thay thế `apigClientFactory` thành `apigClientFactory_FlightSpecials` (hoặc `apigClientFactory_HotelSpecials` / `apigClientFactory_TripSearch`). Cụm từ này xuất hiện 2 lần trong tập tin, và cả 2 đều phải được thay thế.

![API Gateway](/images/3/7.png?width=90pc)

24. Lưu tập tin lại.
25. Ở đầu bài, bạn đã tải và giải nén tập tin **TravelBuddy.zip**. Sao chép và thay thế tập tin *apigClient_xxxxx.js* trong thư mục */TravelBuddy/api/*

#### Cập nhật cấu hình TravelBuddy SPA để hỗ trợ authentication.
Trong phần này, bạn sẽ cập nhật tập tin cấu hình cho TravelBuddy SPA để nó có thể sử dụng cơ sở hạ tầng Cognito đã được thiết lập ở Module 6.

26. Tìm tập tin *webapp-configuration.js* trong thư mục *scripts* của project TravelBuddy mà bạn đã tải xuống. Nội dung tập tin như sau:
``` javascript
(function () {
  "use strict";

  angular
    .module("app")

    .constant(
      "COGNITO_IDENTITY_POOL_ID",
      "REPLACE_WITH_COGNITO_IDENTITY_POOL_ID"
    )
    .constant("COGNITO_USER_POOL", "REPLACE_WITH_COGNITO_USER_POOL")
    .constant(
      "COGNITO_USER_POOL_CLIENT_ID",
      "REPLACE_WITH_COGNITO_USER_POOL_CLIENT_ID"
    )
    .constant("COGNITO_APP_WEB_DOMAIN", "REPLACE_WITH_S3_BUCKET_WWW")

    .constant("LEX_BOT_NAME", "TravelBuddyChatBot")
    .constant("AWS_REGION", "us-east-1")
    .constant("APP_BANNER", "TravelBuddy");
})();
```
SPA được triển khai bằng cách sử dụng Angular framework, cho phép bạn xác định các hằng số toàn cục được sử dụng làm biến cấu hình trong toàn bộ ứng dụng của bạn. Tập tin này xác định các giá trị của các biến cấu hình mà bạn cần đặt dựa trên ARN và Id của Tài khoản AWS của bạn cho các tài nguyên Cognito khác nhau. Mở tập tin *webapp-configuration.js* trong trình soạn thảo và thay đổi các giá trị bên dưới.
| Placeholder name                        | Value to replace with from lab setup |
|-----------------------------------------|--------------------------------------|
| REPLACE_WITH_COGNITO_IDENTITY_POOL_ID   | CognitoIdentityPoolId                |
| REPLACE_WITH_COGNITO_USER_POOL          | CognitoUserPool                      |
| REPLACE_WITH_COGNITO_USER_POOL_CLIENT_ID| CognitoUserPoolClientId              |
| REPLACE_WITH_S3_BUCKET_WWW              | S3BucketWWW                          |
| us-east-1                               | YOUR REGION                          |

![API Gateway](/images/3/8.png?width=90pc)

#### Triển khai tập tin TravelBuddy SPA lên Amazon S3

Với các SDK API có sẵn và ứng dụng được định cấu hình để sử dụng cơ sở hạ tầng Amazon Cognito, hiện tại bạn đã sẵn sàng triển khai SPA cho Amazon S3 Bucket cho trang web. Quá trình thiết lập phòng thí nghiệm đã cung cấp một S3 Bucket phù hợp, với WebSite Hosting được kích hoạt. Vì vậy, bạn sẽ chỉ cần đẩy tất cả các tệp từ máy cục bộ của mình sang thùng S3 để có thể kiểm tra ứng dụng.

27. Trong terminal, *cd* tới thư mục chứa TravelBuddy SPA website.
28. Thực thi lệnh sau để đồng bộ thư mục lên S3 bucket:
``` bash
aws s3 sync . s3://<S3BucketWWW>/TravelBuddy --profile aws-lab-env
```
Thay thế <S3BucketWWW> bằng tên S3Bucket đã được cung cấp ở CloudFormation Output của Moudule 6.
29. Khi quá trình đồng bộ hoàn tất, bạn có thể sử dụng CloudFront để truy cập website.
Trang web TravelBuddy quen thuộc sẽ hiển thị trong trình duyệt của bạn. Bạn sẽ thấy danh sách Hotel Specials và Flight Specials được hiển thị trên trang và tùy chọn **Find trips to…** cũng có sẵn. Nếu bạn không thấy dữ liệu là kết quả của các lệnh gọi API, hãy xem developer console trong trình duyệt để xem liệu có bất kỳ lỗi nào giúp tìm ra sự cố hay không.

Ngoài ra còn có một tùy chọn mới - Chat with us! Đây là phần giao diện người dùng của chat bot mà chúng ta sẽ thực hiện trong các bài tập sau.

![Web](/images/3/9.png?width=90pc)