+++
title = "Create A Lambda Handler For The Lex Bot"
weight = 4
chapter = false
pre = "<b>3.4. </b>"
+++

At the moment, the chat bot will return the slots elicited from the user, back to the caller in the form of a JSON payload. Instead, we want our bot to perform the actual search of the trips database, and present the options back to the user, otherwise, our client (the browser) would need to make an additional call to the back-end to search for trips. While that may be what you want to do in some situations, in this case, we will implement a Lambda function to do all the work of fulfilling the request, and returning the results in one hit.

In this exercise, we will create a Lambda function written in NodeJS to perform the ‘fulfillment’ for our bot.

1. On the AWS Console in the browser, click **Service**s and type **lambda** and then press enter.
2. Click **Create function***
3. For **Name** type **TripSearchLexBot**
4. For **Runtime** select **Node.js 12.x**
5. Expand **Change default execution role**
6. Select **Existing role**, then select **LambdaRole**
7. Click **Create function**

![Lambda](/images/3/25.png?width=90pc)

8. Download the source code from **lambda-lexbothandler.js** onto your filesystem, and open it in a text editor. Copy the entire contents of the file into your clipboard.

{{%attachments /%}}

9. In the Lambda console, paste in the contents of the **lambda-lexbothandler.js** into the code entry field, replacing the existing contents.
10. Click **Deploy** and **Test**

![Lambda](/images/3/26.png?width=90pc)

11. The **Configure test event** dialog will appear, enter **testcase** for event name
12. Replace the contents of the test event with the following JSON:
```JSON
{
  "sessionId": "885078239936701",
  "inputTranscript": "Yes",
  "interpretations": [
    {
      "intent": {
        "slots": {
          "date": {
            "shape": "Scalar",
            "value": {
              "originalValue": "Tomorrow",
              "resolvedValues": [
                "2023-02-10"
              ],
              "interpretedValue": "2023-02-10"
            }
          },
          "destinationCity": {
            "shape": "Scalar",
            "value": {
              "originalValue": "Sydney",
              "resolvedValues": [
                "melbourne"
              ],
              "interpretedValue": "Sydney"
            }
          },
          "originCity": {
            "shape": "Scalar",
            "value": {
              "originalValue": "Melbourne",
              "resolvedValues": [
                "sydney"
              ],
              "interpretedValue": "Melbourne"
            }
          }
        },
        "confirmationState": "Confirmed",
        "name": "TravelBuddyCheckFlightsIntent",
        "state": "ReadyForFulfillment"
      },
      "nluConfidence": 1
    },
    {
      "intent": {
        "slots": {},
        "confirmationState": "None",
        "name": "FallbackIntent",
        "state": "ReadyForFulfillment"
      }
    }
  ],
  "sessionState": {
    "sessionAttributes": {},
    "intent": {
      "slots": {
        "date": {
          "shape": "Scalar",
          "value": {
            "originalValue": "Tomorrow",
            "resolvedValues": [
              "2023-02-10"
            ],
            "interpretedValue": "2023-02-10"
          }
        },
        "destinationCity": {
          "shape": "Scalar",
          "value": {
            "originalValue": "Sydney",
            "resolvedValues": [
              "melbourne"
            ],
            "interpretedValue": "Sydney"
          }
        },
        "originCity": {
          "shape": "Scalar",
          "value": {
            "originalValue": "Melbourne",
            "resolvedValues": [
              "sydney"
            ],
            "interpretedValue": "Melbourne"
          }
        }
      },
      "confirmationState": "Confirmed",
      "name": "TravelBuddyCheckFlightsIntent",
      "state": "ReadyForFulfillment"
    },
    "originatingRequestId": "033310c3-eb7e-44e7-8e44-db2b62acc310"
  },
  "responseContentType": "text/plain; charset=utf-8",
  "invocationSource": "FulfillmentCodeHook",
  "messageVersion": "1.0",
  "transcriptions": [
    {
      "resolvedContext": {
        "intent": "TravelBuddyCheckFlightsIntent"
      },
      "transcription": "Yes",
      "resolvedSlots": {},
      "transcriptionConfidence": 1
    }
  ],
  "inputMode": "Text",
  "bot": {
    "aliasId": "TSTALIASID",
    "aliasName": "TestBotAlias",
    "name": "TravelBuddyChatBot",
    "version": "DRAFT",
    "localeId": "en_US",
    "id": "0BTWXR7UVD"
  }
}
```

![Lambda](/images/3/27.png?width=90pc)

13. Click **Create**
14. Click **Test** to test the Lambda function with the test event. After a moment, you should see an output similar to this:

![Lambda](/images/3/28.png?width=90pc)

This indicates that the Lambda function can correctly read the input data, and queried the DynamoDB table for flights from Melbourne to Sydney, and returned the matches.

16.  Spend a few minutes reviewing this Lambda function code, so you understand how it works.