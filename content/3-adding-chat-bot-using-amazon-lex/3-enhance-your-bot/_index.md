+++
title = "Enhance your bot"
weight = 3
chapter = false
pre = "<b>3.3. </b>"
+++

Our bot is simple at the moment, it only asks for *destination city*. But in order to find flights, we really need origin city as well. Let’s add that.
1. In the **Slot** section, add a new slot with the **Name** `originCity`
2. For **Slot type** select **AMAZON.City**
3. For **Prompt** type `What city are you starting from?`
4. Click **Add**

![Lex](/images/3/22.png?width=90pc)

5. Similarly, add a new slot for *date* information:

![Lex](/images/3/23.png?width=90pc)

6. Now add more sample utterances that allow the user to specify the **origin city** and **date**:
   - `I want to go from {originCity} to {destinationCity}`
   - `I want to make a booking for a flight from {originCity} to {destinationCity}`
   - `I am in {originCity} I want to go to {destinationCity}`
   - `What flights are there from {originCity}`
   - `I want to go from {originCity} to {destinationCity} on {date}`
   - `What flights are available from {originCity} to {destinationCity} on {date}`

![Lex](/images/3/24.png?width=90pc)

- Then, click **Save intent**

7. Re-build your bot by clicking **Build** and once built, try testing the bot with the variations you have added as sample utterances.

#### Experiment with the voice interaction option

The AWS console allows you to test your bot using your voice. Instead of typing the request into the test bot, try using the microphone icon to speak instead. When you use speech, you may find that you speak differently to how you would type, and so you may need to add additional sample utterances to make a more naturally-sounding conversation.