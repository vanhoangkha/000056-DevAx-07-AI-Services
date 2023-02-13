+++
title = "Preparing the environment"
weight = 1
chapter = false
pre = "<b>1.1. </b>"
+++

#### Cài đặt DynamoDB
We need to populate a DynamoDB table with information that will be used during the lab. This information will be used to calculate trips between different cities.

Only complete this step after your Windows eclipse environment has been set up.

1. Download the following file to your Windows Eclipse environment

{{%attachments /%}}

2. Execute the following in your Windows Eclipse Environment. You will need to use git bash that has been included in your installation.
```bash
populate_tripsector.sh <AWS_REGION>
```
3. Open the DynamoDB service in the console and check the table TravelBuddyTripSectors table and confirm there are 50 rows in the table.
