+++
title = "Detect Objects Using Amazon Rekognition"
weight = 2
chapter = false
pre = "<b>2.2. </b>"
+++

In this exercise, you will create a browser-based application that uses your computer’s webcam to ‘see’ images, and then displays the labels for the features that have been detected.
1. Download the source code bundle from **www.zip** file and explode the zip file onto your filesystem. Or run the following code:

{{%attachments /%}}

2. Open the *config/config.js*file in a text editor such as Eclipse. Replace the following values with the value from **CloudFormation Outputs** tab:

| Text                                   | CloudFormation output value |
|----------------------------------------|-----------------------------|
| REPLACE_WITH_COGNITO_IDENTITY_POOL_ID  | CognitoIdentityPoolId       |
| REPLACE_WITH_DETECTOR_UPLOAD_BUCKET    | S3BucketDetectorUploads     |
| REPLACE_WITH_YOUR_DYNAMO_DB_TABLE_NAME | DynamoDBFaces               |
| REPLACE_WITH_YOUR_AWS_REGION           | Your current region         |

![Rekonition](/images/2/17.png?width=90pc)

3. Save the file. 
4. Copy the contents of the folder you exploded the zip file into, to the S3 bucket that lab has created for you to host your website, using the following command:
```bash
aws s3 cp . s3://m7www --recursive --region <YOUR-REGION> --profile aws-lab-env
```
5. To be able to access the website, we need to **Make public using ACL** the objects in the bucket.
6. Access **m7www** bucket, select **Permissions** tab. Scroll down to **Access control list (ACL)**, click **bucket owner enforced**.

![Make public](/images/2/18.png?width=90pc)

7. Select **ACLs enabled**, then click **Save changes**

![Make public](/images/2/19.png?width=90pc)

8. Select **Objects** tab, then select all objects. Then click **Actions | Make public using ACL**

![Make public](/images/2/20.png?width=90pc)

9. Visit the website with the following link:
`
https://m7www.s3-<region>.amazonaws.com/index.html
`
10. You will see a landing page with four options. Click the first option, **Object Scanner** 

![Object scanner](/images/2/21.png?width=90pc)

11.  When the page loads, it will ask for permission to use the webcam on your computer. If you see an error instead, check that you are browsing to the site securely, using HTTPS.
12. Select **Start Rekognition** button to start sending images to the Rekognition service.

![Object scanner](/images/2/22.png?width=90pc)

13. The page will connect using Amazon Cognito, and then push the webcam image to Rekognition. In response, the page will show a list of all the objects it can ‘see’ in the image.

![Object scanner](/images/2/23.png?width=90pc)

14. Try holding up different objects in front of the camera to see the list of objects detected change.
15. Take a few minutes to look at the source code implementation of this demo to ensure you understand how it works.