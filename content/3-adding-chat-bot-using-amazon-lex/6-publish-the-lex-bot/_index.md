+++
title = "Publish The Lex Chat Bot"
weight = 6
chapter = false
pre = "<b>3.6. </b>"
+++

Now that we have a working bot, we can publish it so it can be called by our TravelBuddy web page.

1. In the Lex console, click **Bot verion** on the left menu
2. Click **Create version**.

![Lex](/images/3/33.png?width=90pc)

3. Click **Create**

![Lex](/images/3/34.png?width=90pc)

4. Now you see a new version created
5. Next, we will create **prod** alias. Click **Aliases** on the left menu
6. Click **Create alias**.

![Lex](/images/3/35.png?width=90pc)

7. Enter **prod** for alias name
8. In **Associate with a version** section, select the instance you just created.

![Lex](/images/3/36.png?width=90pc)

9. Scroll down to bottom and click **Create**
10. Click to the **English (US)**.

![Bot In Web](/images/3/37.png?width=90pc)

11. Select **TripSearchLexBot** for **Source**, select **$LATEST** version.
12. Click **Save**

![Bot In Web](/images/3/38.png?width=90pc)

The familiar TravelBuddy website should render in your browser. As before, you should see the Hotel Specials and Flight Specials listings rendered on the page, and the  **Find trips to…** search option is also available. There is also the new **Chat with us!** option. Click the button and the chat bot window will appear:

13. Type in your query - for example: `I want to fly from Sydney to Melbourne`
14. The bot will respond **When do you want to fly?** Type `Tomorrow`
15. The bot will respond **Are you sure you want to find flights to Melbourne?** Type `Yes`.
16. The bot will respond **I have 1 flight from Melbourne to Sydney - 1 January 2018** a similar message - perhaps there is more than one flight available, and perhaps the date is different - populating the DynamoDB table is randomised.

![Bot In Web](/images/3/39.png?width=90pc)

{{% notice note %}} 
Log into your account before making a chat.
{{% /notice %}}

