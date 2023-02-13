+++
title = "Update The Lex Bot To Use Lambda For Fulfillment"
weight = 5
chapter = false
pre = "<b>3.5. </b>"
+++

Now that we have a working Lambda function, we can update our Lex bot so that it uses the Lambda function for fulfillment, rather than returning the elicited slot details to the caller.

1. On the AWS Console in the browser, click Services and type lex and then press enter.
2. Select **TravelBuddyChatBot** 
3. Select **TravelBuddyCheckFlightsIntent** intent if it doesn’t automatically select.
4. Click **Test**
5. Click the settings icon.
6. In **Lambda function - optional** section, select **TripSearchLexBot** function for **Source**.
7. Select **$LATEST** version.
8. Click **Save**

![Lambda](/images/3/29.png?width=90pc)

9. In **Fulfullment** section, expand the **On successful fulfillment**
10. Then click **Advanced options**
11. Check to **Use a Lambda function for fulfillment** check box.
12. Click **Update options**

![Lambda](/images/3/30.png?width=90pc)

13. Click **Actice** of **Fulfillment** section
14. Click **Save intent**, then click **Build** to re-build the your intent

![Lex](/images/3/31.png?width=90pc)

15. Click **Test**, enter `I want to fly from Melbourne to Sydney` to `Type a message`.
16. The bot will respond *When do you want to fly?* Type `Tomorrow`.
17. The bot will respond *Are you sure you want to find flights to Sydney?* Type `Yes`.
18. The bot will respond *I have 1 flight from Melbourne to Sydney - 1 January 2018* or a similar message - perhaps there is more than one flight available, and perhaps the date is different - populating the DynamoDB table is randomised.

![Lex](/images/3/32.png?width=90pc)