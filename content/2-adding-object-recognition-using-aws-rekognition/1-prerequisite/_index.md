+++
title = "Preparation"
weight = 1
chapter = false
pre = "<b>2.1. </b>"
+++

#### Create Cognito Identity Pool
1. Open Amazon Cognito console, select **Federated identities**

![Cognito](/images/2/1.png?width=90pc)

2. Click **Create new identity pool**

![Cognito](/images/2/2.png?width=90pc)

3. In **Identity pool name**, select **FaceRecognition**. Check to 2 checkboxs *Unauthenticated identities* and *Authentication flow setting*.
4. Click **Create Pool**

![Cognito](/images/2/3.png?width=90pc)

5. In **Identity the IAM roles to use with your new identity pool** page, click **Allow**

![Cognito](/images/2/4.png?width=90pc)

6. Copy Identity pool ID, we will use it in the following steps

![Cognito](/images/2/5.png?width=90pc)

#### Create DynamoDB table

7. Access AWS DynamoDB, click **Create table**.
8. In **Table name** section, enter **facerecognition**
9. In **Primary key** section, enter **faceId**.

![Cognito](/images/2/6.png?width=90pc)

- Then scroll to the bottom of the page and press **Create table**.

![Cognito](/images/2/7.png?width=90pc)

#### Create S3 bucket

10. We will create 2 S3 buckets, a **m7www** bucket containing the website source code and a **facerecognitions3bucket** bucket containing image data for identification.

![Cognito](/images/2/8.png?width=90pc)

![Cognito](/images/2/9.png?width=90pc)

{{% notice note %}} 
Uncheck **Block Public Access settings for this bucket** checkbox.
{{% /notice %}}

#### Create Rekognition Collection
11. Use the following CLI command to create the **iDevelopKnownFaces** collection:
```bash
aws rekognition create-collection --collection-id iDevelopKnownFaces
```

![Cognito](/images/2/10.png?width=90pc)

#### Authorize Cognito

12. Go to Amazon IAM console, select **Role**, search by keyword `Cognito`. We will see 2 Roles Cognito_FaceRecognitionAuth_Role and Cognito_FaceRecognitionUnauth_Role of Cognito Identity Pool that we created in the previous step, we will edit the policy of these 2 Roles.

![Cognito](/images/2/11.png?width=90pc)

13. Select *Cognito_FaceRecognitionUnauth_Role*, in Permision section, select *oneClick_Cognito_Cognito_FaceRecognitionAuth_Role_xxxxxxxx*, click **Edit policy**

![Edit policy](/images/2/12.png?width=90pc)

14. Copy and paste the following into the JSON tab
```json
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
                "arn:aws:dynamodb:<YOUR_REGION>:<ACCOUNT_ID>:table/facerecognition",
                "arn:aws:rekognition:<YOUR_REGION>:<ACCOUNT_ID>:collection/iDevelopKnownFaces"
            ]
        }
    ]
}  
```
15. Click **Review Policy**.

![Edit policy](/images/2/13.png?width=90pc)

- Then click **Save changes**.

![Edit policy](/images/2/14.png?width=90pc)

16. Do the same with **Cognito_FaceRecognitionAuth_Role**
```json
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
                "arn:aws:dynamodb:<YOUR_REGION>:<ACCOUNT_ID>:table/facerecognition",
                "arn:aws:rekognition:<YOUR_REGION>:<ACCOUNT_ID>:collection/iDevelopKnownFaces"
            ]
        }
    ]
}
```
![Edit policy](/images/2/15.png?width=90pc)

![Edit policy](/images/2/16.png?width=90pc)