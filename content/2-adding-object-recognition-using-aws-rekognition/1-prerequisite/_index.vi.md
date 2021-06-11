+++
title = "Chuẩn bị môi trường"
weight = 1
chapter = false
pre = "<b>2.1. </b>"
+++

#### Tạo Cognito Identity Pool
1. Truy cập Amazon Cognito, chọn **Manage Identity Pools**
![Cognito](/images/2/1.png?width=90pc)
2. Chọn **Create new identity pool**
![Cognito](/images/2/2.png?width=90pc)
3. Tại trường **Identity pool name** nhập **FaceRecognition**. Đánh dấu chọn tại 2 checkbox Unauthenticated identities và Authentication flow setting.
![Cognito](/images/2/3.png?width=90pc)
4. Chọn **Create Pool**
5. Tại trường **Identity the IAM roles to use with your new identity pool**, chọn **Allow**
![Cognito](/images/2/4.png?width=90pc)
6. Sao chép Identity pool ID, chúng ta sẽ sử dụng thông số này ở các bước sau
![Cognito](/images/2/5.png?width=90pc)
#### Tạo DynamoDB table
7. Truy cập AWS DynamoDB, chọn **Create table**.
8. Tại mục **Table name** nhập **facerecognition**
9. Tại mục **Primary key** nhập **faceId**
![Cognito](/images/2/6.png?width=90pc)
#### Tạo S3 bucket
10. Chúng ta sẽ tạo 2 S3 bucket, một bucket **m7www** chứa mã nguồn trang web và một bucket **facerecognitions3bucket** chứa dữ liệu hình ảnh để nhận diện
![Cognito](/images/2/7.png?width=90pc)
#### Tạo Rekognition Collection
11. Sử dụng câu lệnh CLI sau để tạo collection **iDevelopKnownFaces**
`bash
aws rekognition create-collection --collection-id iDevelopKnownFaces
`
![Cognito](/images/2/8.png?width=90pc)
#### Cấp quyền cho Cognito
12. Truy cập Amazon IAM, chọn Role, tìm theo từ khóa Cognito ta sẽ thấy 2 Role Cognito_FaceRecognitionAuth_Role và Cognito_FaceRecognitionUnauth_Role của Cognito Identity Pool mà ta đã tạo ở bước trên, ta sẽ chỉnh sửa policy của 2 Role này.
![Cognito](/images/2/9.png?width=90pc)
13. Chọn Cognito_FaceRecognitionUnauth_Role, tại mục Permision, chọn oneClick_Cognito_Cognito_FaceRecognitionAuth_Role_xxxxxxxx, chọn **Edit policy**
![Edit policy](/images/2/10.png?width=90pc)
14. Sao chép và dán đoạn sau vào tab JSON
`
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "rekognition:DetectLabels",
                "mobileanalytics:PutEvents",
                "cognito-sync:*",
		"cognito-identity:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "rekognition:CreateCollection",
                "rekognition:DeleteCollection",
                "rekognition:IndexFaces",
                "dynamodb:Scan",
                "dynamodb:Query",
                "dynamodb:UpdateItem",
                "rekognition:SearchFacesByImage"
            ],
            "Resource": [
                "arn:aws:s3:::facerecognitions3bucket/*",
                "arn:aws:dynamodb:ap-northeast-1:340879421878:table/facerecognition",
                "arn:aws:rekognition:ap-northeast-1:340879421878:collection/iDevelopKnownFaces"
            ]
        }
    ]
}  
`
![Edit policy](/images/2/11.png?width=90pc)
15. Chọn **Review Policy** và chọn **Save changes**
![Edit policy](/images/2/8\12.png?width=90pc)
16. Thực hiện tương tự với **Cognito_FaceRecognitionAuth_Role**
`
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "rekognition:DetectLabels",
                "mobileanalytics:PutEvents",
                "cognito-sync:*",
                "cognito-identity:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "rekognition:CreateCollection",
                "rekognition:DeleteCollection",
                "rekognition:IndexFaces",
                "dynamodb:Scan",
                "dynamodb:Query",
                "dynamodb:UpdateItem",
                "rekognition:SearchFacesByImage"
            ],
            "Resource": [
                "arn:aws:s3:::facerecognitions3bucket/*",
                "arn:aws:dynamodb:ap-northeast-1:340879421878:table/facerecognition",
                "arn:aws:rekognition:ap-northeast-1:340879421878:collection/iDevelopKnownFaces"
            ]
        }
    ]
}
`
![Edit policy](/images/2/13.png?width=90pc)
![Edit policy](/images/2/14.png?width=90pc)