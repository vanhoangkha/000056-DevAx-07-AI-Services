+++
title = "Facial Recognition Using Amazon Rekognition"
weight = 3
chapter = false
pre = "<b>2.3. </b>"
+++

In this exercise, you will use the provided web page demo kit to experiment with Amazon Rekogniton’s ability to recognise faces that have been added into the collection.

This demo works by allowing faces to be added into the Rekognition collection, and having additional metadata about the face added into a DynamoDB table. Since every unique face has a unique faceId, we use the faceId as the partition key in the table.
1. From the home page of the website, select **Face Scanner**
2. Click **Clear Rekognition Collection** to set the collection up initially
After a moment, you should see a response similar to this:

![Clear Collection](/images/2/24.png?width=90pc)

3. Enter your name, home town and choose your favourite animal from the list
4. Click **Start Webcam**

![Add face](/images/2/25.png?width=90pc)

5. Position your face in front of the camera so your face is clearly visible, and click **Add face to Rekognition Collection**
6. The script on the page will show the result from the call to IndexFaces() and subsequently the result of the call to add additional metadata to the DynamoDB table.
7. In a terminal window, issue the following command:
```bash
aws rekognition list-faces --collection-id iDevelopKnownFaces --profile aws-lab-env --region us-east-1
```
This is the information about the one (and only) face that has been added into the Rekognition collection.

#### Recognising your face

Now that you have added your face to the collection, you can now have Rekognition recognise your face.

8. Scroll down to the **Recognise face** section and click **Start webcam**
9. The webcam will turn on and start periodically sending images to the Rekognition engine and attempt to recognise your face by comparing with the data stored in the collection. Position your face so that it is clearly visible, and after a moment, metadata about you should be shown in the text fields.

![Recognise face](/images/2/26.png?width=90pc)

10.  Ask some of the other students to add their faces into the collection as well, and then experiment with detecting their faces.
11.  This demo stores additional metadata in a DynamoDB table. Go to the DynamoDB console and review the data that is stored in the **iDevelopKnownFaces** table.
12.  With multiple faces in the collection, run the CLI command from above again, and review the output.