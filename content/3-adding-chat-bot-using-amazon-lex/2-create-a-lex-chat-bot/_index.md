+++
title = "Create a Lex Chat Bot For TravelBuddy"
weight = 2
chapter = false
pre = "<b>3.2. </b>"
+++

Now we have TravelBuddy up and running, it is time to add a chat bot to the site to allow users to find flights using a natural interaction with a bot. In this section, we will create a simple bot with an intent to find flights to a destination. We will enhance this as we move ahead.

1. On the AWS Console in the browser, click Services and type lex and then press enter.
2. Click **Get Started**

![Lex](/images/3/10.png?width=90pc)

3. Click **Custom bot**
4. For **Bot name** type `TravelBuddyChatBot`
5. In **IAM Permissions** section, select **Create a role with basic Amazon Lex permissions.**

![Lex](/images/3/11.png?width=90pc)

6. For **COPPA*** select *No*
7. For **Session timeout** type `5` and select *minutes*
8. Click **Next**

![Lex](/images/3/12.png?width=90pc)

9. For **Language** select *English (US)*
10. For **Output Voice** select *Joanna*. For **Confidence score threshold** leave the default value
11. Click **Done** to create your new Lex bot

![Lex](/images/3/13.png?width=90pc)

12. Give the new intent the name **TravelBuddyCheckFlightsIntent**
13. Click **Save Intent**

![Lex](/images/3/14.png?width=90pc)

14. For **Sample utterances** type `I would like to fly to {destinationCity}`
15. Click **Add utterances**

![Lex](/images/3/15.png?width=90pc)

In this utterance, we have embedded a slot parameter called **destinationCity**. We now need to declare this slot name in the **Slots** section.

16. In the **Slots** section, click **Add slot**.
17. For **Name** type `destinationCity`.
18. For **Slot type** select **AMAZON.City**.
19. For **Prompt** type **What city would you like to fly to?**. Then click **Add**.

![Lex](/images/3/16.png?width=90pc)

We now need to define a **Confirmation** which will be used to confirm with the user that they want to proceed with the fulfillment of the bot, once all the slots are filled.

21. Expand the **Confirmation** field and click to the **Active**.
22. In **Confirm prompt** section, enter `Are you sure you want to find flights to {destinationCity}?`
23. In **Cancel**, enter `No problem, you can try again later`
24. Click **Save intent**

![Lex](/images/3/17.png?width=90pc)

#### Test the bot in the browser

25. At the top of the page, click **Build**

![Lex](/images/3/18.png?width=90pc)

26. Your bot will now be built and in a few moments, it will be ready to test.
27. Click **Test** to test, enter `I would like to fly` into the **Type a message** field.
28. The bot will respond *What city would you like to fly to?* , type `Sydney`
29. The bot will respond *Are you sure you want to find flights to Sydney?*, type `Yes`
30. The bot will respond by returning the details of the intent and the slot values:

![Lex](/images/3/19.png?width=90pc)

31. HTry a few other variations, for example `I want to go to Sydney`. If you try `I want to make a flight booking` you will notice that the bot doesn’t understand.

![Lex](/images/3/20.png?width=90pc)

32. The request is too different from the single utterance you have defined. You can fix that by adding additional sample utterances. Add a few additional variations to your bot in the **Sample utterances** section, such as:
    - `I want to make a flight booking`
    - `I want to make a booking`
    - `I want to go to {destinationCity}`
    - `What flights are available to {destinationCity}`
    - `Is there a flight to {destinationCity}`

… and any others you think should be added

Notice: Do not add punctuation to the sample utterances.

32. Re-build your bot by clicking **Build** and once built, try testing the bot with the variations you have added as sample utterances.

![Lex](/images/3/21.png?width=90pc)