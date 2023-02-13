+++
title = "Explore the Amazon Polly Console"
weight = 2
chapter = false
pre = "<b>1.2. </b>"
+++

In this exercise, you will take a quick tour of the Amazon Polly console to generate speech.

1. Access AWS Polly and click **Try Polly**

![Polly](/images/1/1.png?width=90pc)

2. Click **Listen** to replay the default text for the default voice ‘Joanna’.

![Polly](/images/1/2.png?width=90pc)

3. Spend a few moments experimenting with the different languages and voices that are available.
4. Download an MP3 file of the synthesised speech by clicking **Download**. Replay this file on your laptop.

#### Define and use a Lexicon

5. Select English, US and the Joanna voice and enter this text in to the **Input text** field:
```
Synthesising speech is easy with AWS
```
![Polly](/images/1/3.png?width=90pc)

6. Press **Listen** to hear the text converted to speech.
7. We will now define an **alias** for **AWS** so that the full name - *Amazon Web Services* is rendered when **AWS** is provided. Download this file to your development machine: **lexicon.pls**

{{%attachments /%}}

8. In a terminal window, **cd** into the folder where you downloaded the **lexicon.pls**, and issue this command:
```
aws polly put-lexicon --name awsExpansion --content file://lexicon.pls
```
{{% notice note %}} 
If you are running on Windows or on your own machine, don’t forget to add the profile with `--profile aws-lab-env`
{{% /notice %}}

This will create a new lexicon. The definition of the lexicon is this:
Notice how we can define an **alias** for a given **grapheme**. When this is rendered, the engine will replace **AWS** with **Amazon Web Services**.

9. Refresh the browser window containing the Polly console so that the new lexicon is available.

![Polly](/images/1/4.png?width=90pc)

10. Enter this text in the **Text input**field:
```
Synthezising speech is easy with AWS
```
11. Scroll down to and expand the **Additional settings** section. Click on **Customise pronunciation**.
12. In the **Apply lexicon** drop-down list, select **awsExpansion**
13. Scroll back up and click **Listen** to hear the text converted to speech.

![Polly](/images/1/5.png?width=90pc)

#### Sử dụng SSML để biểu diễn giọng nói

14. Click the **SSML** toggle on the right and paste in the following SSML:
```
<speak>
	My name is YOUR_NAME. It is spelled
	<prosody rate='x-slow'>
		<say-as interpret-as="characters">YOUR_NAME</say-as>
	</prosody>
</speak>
```
Note: Replace **YOUR_NAME** with your name.

![Polly](/images/1/6.png?width=90pc)

15. Click **Listen** to hear your name spelled out.
16. Replace the SSML text with:
```
<speak>
	This is normal voice,
	<amazon:effect name="whispered">
		and this is me whispering AWS!
	</amazon:effect>
</speak>
```

![Polly](/images/1/7.png?width=90pc)

17. Click **Listen** to hear the text read in normal voice, and also whispered.
18. Spend a few moments experimenting with the various voices and text samples to get a feel for what Polly can do