#!/bin/bash
arr[0]="Melbourne"
arr[1]="Perth"
arr[2]="Sydney"
arr[3]="Brisbane"
arr[4]="Darwin"
arr[5]="Hobart"
arr[6]="Canberra"
arr[7]="Newcastle"
arr[8]="London"
arr[9]="Dallas"
arr[10]="Cairo"
arr[11]="LA"
arr[12]="Singapore"
arr[13]="Broome"
arr[14]="Dubbo"
arr[15]="Geelong"

echo Adding 50 trips to DDB table...

for ((n=1;n<=50;))
do    
    randomOrigin=$[$RANDOM % 16]
    randomDestination=$[$RANDOM % 16]
    if [ $randomOrigin != $randomDestination ]; then    
        echo $n Adding ${arr[$randomOrigin]} to ${arr[$randomDestination]}
        randomDate=$(($(($(date "+%s") + $((($RANDOM)*1000)))) * 1000))
        randomFlightNumber=$[$RANDOM % 100]
        randomCost=$[$RANDOM % 500]
        aws dynamodb put-item --region $1 --profile aws-lab-env --table-name TravelBuddyTripSectors --item "{\"date\": {\"N\": \"$randomDate\"},\"flightNumber\": {\"S\": \"TB $randomFlightNumber\"},\"cost\": {\"N\": \"$randomCost\"},\"originCity\": {\"S\": \"${arr[$randomOrigin]}\"},\"destinationCity\": {\"S\": \"${arr[$randomDestination]}\"},\"airline\": {\"S\": \"TravelBuddy Airlines\"}}";
        ((++n))
    fi
done

