+++
title = "Challenge Exercises"
date = 2023
weight = 4
chapter = false
pre = "<b>4. </b>"
+++

You are now at the end of the implementation of the TravelBuddy website - congratulations! You have a fully functioning SPA site hosted on Amazon S3, with a CloudFront distribution as a cache. The page calls into microservices via API Gateway and hosted on AWS Lambda. You have a chat bot that allows your customers to make plain-English queries and execute functions such as searching for flights. Try these additional challenges!

- Create new intents in the Lex bot, so that you can ask different questions in the chat window, such as **I want to book a hotel** or **What is the cheapest fare today?**.

- Currently, even though the Lex bot requests a  **date**, in the interaction, the date is not actually used in the fulfillment Lambda function. Update the Lambda function code for the Lex bot fulfillment handler, so that it only returns flights that fall within 24 hours of the date the user specifies.

- The chat bot currently expects an origin and destination city, but sometimes, the user may just want to know **When is the next flight out of Melbourne?**. Implement this feature.

- There are no side-effects of running the chat bot. The data is returned to the chat window and the interaction ends. Implement a feature whereby a change is made to the system as a result of the chat bot interaction. For example, create a new DynamoDB table, and allow the user to add a flight into the table using the chat bot.
