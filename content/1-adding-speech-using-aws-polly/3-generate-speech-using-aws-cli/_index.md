+++
title = "Generate Speech Using the AWS CLI"
weight = 3
chapter = false
pre = "<b>1.3. </b>"
+++

1. Right click and download the **pollySpeech.sh** file.

{{%attachments /%}}

2. In a terminal window, **cd** nto the folder where you downloaded the **pollySpeech.sh** file to, and issue the following commands:
```bash
chmod +x pollySpeech.sh
./pollySpeech.sh
```

![Polly](/images/1/8.png?width=90pc)

The script will call Amazon Polly to generate speech and replay it using **mpg123**. If you do not have **mpg123**  installed on your machine, you can install it using **Homebrew**, or use another MP3 audio player of your choice.

Download mpg123 from [link](https://www.mpg123.de/download/win64/1.26.3/)  and explode zip file. Or you can open **PowerShall** and run the command: `choco install mpg123`.

Open Git Bash and run this command:

```export PATH="<filepath>\mpg123-1.26.3-x86-64:$PATH"```
