+++
title = "Experimant With the People Finder Application"
weight = 4
chapter = false
pre = "<b>2.4. </b>"
+++

The People Finder is made up of two parts: first, the Master page, where you can clear the collection of known faces, add new faces and also view the list of known faces and the last time they were seen; the second page is the detector page, which simulates a remote camera that can be set in a particular location around the house. In this exercise, you will experiment with the app, running the master and detector pages on your computer, and also asking the other students to participate in your experiment, but using their computers as remote detectors in your system.

1. From the home page of the website, select **People Finder - Master**

![Recognise Master](/images/2/27.png?width=90pc)

2. If you have already added faces to the collection, and you want to keep them, do not press the **Clear Rekognition Collection** button. If you want to erase all the known faces, click the button.
3. You can add new faces to the collection using the **Add face to Rekognition Collection** panel. If you already have faces in the collection and don’t need to add more, you can skip that section.
4. In the **Faces detected** section, click **Start polling DynamoDB table** to commence a timer that will query DynamoDB for results, and display them in a list.
5. After a few seconds, the list will start to dynamically refresh. You will see the name, age, location and sentiment of each face, and when they were last detected. The location, sentiment and time detected will be invalid at this point, because you have not run the detector app yet.

![Recognise Master](/images/2/28.png?width=90pc)

#### Implement the detector processor Lambda function

6. Download the source code bundle from **DetectorImageProcessor-Skeleton.zip** and explode the zip file onto your filesystem.

{{%attachments title="Source code" pattern="DetectorImageProcessor-Skeleton.zip"/%}}

7. Open the Eclipse IDE and open the project from the filesystem by using the **File | Open projects from filesystem…** menu option.
8. The implementation is incomplete. You are given a list of TODOs to complete:
```
//************************************************************************************
// TODO:
//
// 1. Detect faces in the image. Assume only 1 is provided, so just take the first.
//    You can use the provided getImageUtil() function to create a suitable Image object
//    for Rekognition
//
// 2. For the first face in the result set, get the emotions collection. Iterate through
//    the collection and generate a string containing all the emotions that are present.
//    If there are no emotions, set an emotion string of 'Indeterminate'
//    Only take emotions that have a confidence factor > 30
//
// 3. Search the Rekognition collection for matches for the face, using searchFacesByImage().
//    Use the FACE_MATCH_THRESHOLD provided
//
// 4. If you find a match, use the faceId of the match to update the DynamoDB table. Since
//    the order of processing the images in S3 is indeterminate, you should not update
//    the DynamoDB table if the image is older than the last update to DynamoDB. You can use
//    the detectionDate variable extracted from the object metadata above for that purpose
//
//************************************************************************************
```
Bạn có thể sử dụng giải pháp đã được cập nhật đầy đủ tại tập tin sau:

{{%attachments title="Source code" pattern="DetectorImageProcessor-Full.zip"/%}}

#### Deploy the Lambda function and trigger it on uploads to S3
9. Access to Lambda console, click **Create Function**

![Lambda Function](/images/2/29.png?width=90pc)

10. Select **Author from scratch**, enter the **DetectorImageProcessor** for function name, select Runtime **Java 8**
11. Click **Create function**

![Lambda Function](/images/2/30.png?width=90pc)

12. In Code tab, click **Upload from|.zip file**

![Lambda Function](/images/2/31.png?width=90pc)

13. Select the **DetectorImageProcessor-Full.zip** file and click **Save**

![Lambda Function](/images/2/32.png?width=90pc)

14. In **Function overview** section, click **Add trigger**

![Lambda Function](/images/2/33.png?width=90pc)

15. Select **S3** and select **facerecognitionS3bucket** bucket

![Lambda Function](/images/2/34.png?width=90pc)

#### Run the detector page to detect faces

16. Go to the web page created in the previous steps, select **People Finder - Detector**
17. Select a location from the list - the location is arbitrary, but allows you to run multiple detectors assigned to different locations so you can track the whereabouts of people in the demo.
18. Add the following CORS policy to the **facerecognitions3bucket** bucket.
```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "https://m7www.s3.<YOUR-REGION>.amazonaws.com"
        ],
        "ExposeHeaders": [
            "x-amz-server-side-encryption",
            "x-amz-request-id",
            "x-amz-id-2"
        ],
        "MaxAgeSeconds": 3000
    }
]
```

![CORS policy](/images/2/37.png?width=90pc)

19. Click **Start webcam**. The page will start to send images to the S3 bucket, which will trigger the Lambda function to process the images using Rekognition, and update the DynamoDB table.

![Lambda Function](/images/2/35.png?width=90pc)

![S3 bucket](/images/2/36.png?width=90pc)