'use strict';

var AWS = require('aws-sdk');

// --------------- Helpers to build responses which match the structure of the necessary dialog actions -----------------------

function elicitSlot(sessionAttributes, intentName, slots, slotToElicit, message, responseCard) {
    const intent = sessionAttributes.intent
    intent.state = "Fulfilled"
    const sessionState = {
        dialogAction: {
            slotElicitationStyle: "Default",
            slotToElicit: slots.destinationCity.value.originalValue,
            type: "ElicitSlot"
        },
        intent
    }
    return {
        sessionState,
        messages: [
            message
        ]
    };
}

function confirmIntent(sessionAttributes, intentName, slots, message, responseCard) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'ConfirmIntent',
            intentName,
            slots,
            message,
            responseCard,
        },
    };
}

function close(sessionAttributes, fulfillmentState, message, responseCard) {
    // console.log('outputSessionAttributes ',JSON.stringify(sessionState))
    const intent = sessionAttributes.intent
    intent.state = "Fulfilled"
    const sessionState = {
            dialogAction: {
                slotElicitationStyle: "Default",
                type: "Close"
            },
            intent
        }
    return {
        sessionState,
        messages: [
            message
        ]
    };
}

function delegate(sessionAttributes, slots) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Delegate',
            slots,
        },
    };
}

// Build a responseCard with a title, subtitle, and an optional set of options which should be displayed as buttons.
function buildResponseCard(title, subTitle, options) {
    let buttons = null;
    if (options != null) {
        buttons = [];
        for (let i = 0; i < Math.min(5, options.length); i++) {
            buttons.push(options[i]);
        }
    }
    return {
        contentType: 'application/vnd.amazonaws.card.generic',
        version: 1,
        genericAttachments: [{
            title,
            subTitle,
            buttons,
        }],
    };
}

// ---------------- Helper Functions --------------------------------------------------

function prettyDate(date)
{
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function parseLocalDate(date) {
    /**
     * Construct a date object in the local timezone by parsing the input date string, assuming a YYYY-MM-DD format.
     * Note that the Date(dateString) constructor is explicitly avoided as it may implicitly assume a UTC timezone.
     */
    const dateComponents = date.split(/\-/);
    return new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2]);
}

function isValidDate(date) {
    try {
        return !(isNaN(parseLocalDate(date).getTime()));
    } catch (err) {
        return false;
    }
}

function buildValidationResult(isValid, violatedSlot, messageContent) {
    return {
        isValid,
        violatedSlot,
        message: { contentType: 'PlainText', content: messageContent },
    };
}

function buildTimeOutputString(time) {
    const hour = parseInt(time.substring(0, 2), 10);
    const minute = time.substring(3);
    if (hour > 12) {
        return `${hour - 12}:${minute} p.m.`;
    } else if (hour === 12) {
        return `12:${minute} p.m.`;
    } else if (hour === 0) {
        return `12:${minute} a.m.`;
    }
    return `${hour}:${minute} a.m.`;
}

///////////////////////////////////////////////////////////////
 //
 // getTripsFromOriginToDestination()
 //
 // Returns the trips from DynamoDB that have the 
 // requested origin/destination
 //
 ///////////////////////////////////////////////////////////////
 function getTripsFromOriginToDestination(originCity, destinationCity, callback)
 {
   var result = 
   {
       succeeded : false,
       message : "",
       trips : []
   }

   var params =
   {
       TableName : "TravelBuddyTripSectors",
       IndexName : "originCity-index",

       FilterExpression : "(#dest = :dest)",

       KeyConditions :
       {
           "originCity" :
           {
             "AttributeValueList" :
             [{
                 "S" : originCity
             }],
             "ComparisonOperator" : "EQ"
           }
       },

       ExpressionAttributeNames: {
               "#dest" : "destinationCity"
           },

       ExpressionAttributeValues: {
         ":dest" : {"S":destinationCity}
       }
   }

   console.log("Calling DDB to retrieve trips from " + originCity + " to " + destinationCity + "...");

   new AWS.DynamoDB().query(params, function(err, data)
   {
       if (err)
       {
           result.message    = err.message;
       }
       else
       {
           if ( data.Items.length > 0 )
           {
             console.log("Found " + data.Items.length + " trips...");

             var tripsIndex = 0;
             for ( var item in data.Items )
             {
               var thisItem   = data.Items[item];
                
               result.trips[tripsIndex++] = {
                date                   : parseInt(thisItem.date.N),
                airline                : thisItem.airline.S,
                originCity             : thisItem.originCity.S,
                destinationCity        : thisItem.destinationCity.S
               };
             }

             result.succeeded = true;
           }
           else
           {
             console.log('Done, but no trips were found');
             result.message    = "No trips from " + originCity + " to " + destinationCity + "...";
             result.succeeded  = true;
           }
       }

       callback(result);        
   });
 }


// --------------- Functions that control the skill's behavior -----------------------

/**
 * Performs dialog management and fulfillment for the TravelBuddy trip search feature.
 */
function TravelBuddyCheckFlightsIntent(intentRequest, callback) 
{
    const date = intentRequest.sessionState.intent.slots.date.value.resolvedValues[0];
    const source = intentRequest.invocationSource;
    const outputSessionState = intentRequest.sessionState || {};
    const slots = intentRequest.sessionState.intent.slots;

    if (source === 'DialogCodeHook') 
    {
        // Perform basic validation on the supplied input slots.        
        const validationResult = validateBookAppointment(appointmentType, date, time);
        if (!validationResult.isValid) {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(outputSessionState, intentRequest.sessionState.intent.name,
            slots, validationResult.violatedSlot, validationResult.message,
            buildResponseCard(`Specify ${validationResult.violatedSlot}`, validationResult.message.content,
                buildOptions(validationResult.violatedSlot, appointmentType, date, bookingMap))));
            return;
        }
    }
    else
    {
        // Find trips from origin to destination
        var trips = getTripsFromOriginToDestination(
            slots.originCity.value.originalValue,
            slots.destinationCity.value.originalValue,
            (result) => {
                if ( result.succeeded )
                {
                    if ( result.trips.length > 0 )
                    {
                        var flightsPlural = "flight" + ((result.trips.length > 1) ? "s" : "");
                        var listOfFlights = "";

                        for ( var flight in result.trips )
                        {
                            var thisFlight = result.trips[flight];
                            
                            if ( listOfFlights.length > 0 )
                            {
                                listOfFlights += ", ";
                            }

                            listOfFlights += prettyDate(new Date(parseInt(thisFlight.date)));
                        }
                        callback(
                            close(
                                outputSessionState, 
                                'Fulfilled', 
                                { 
                                    contentType: 'PlainText',
                                    content: `I have ` + result.trips.length + ` ${flightsPlural} from ${slots.originCity.value.originalValue} to ${slots.destinationCity.value.originalValue} - ${listOfFlights}`
                                }
                            )
                        );
                    }
                    else
                    {
                        callback(
                            elicitSlot(
                                outputSessionState, 
                                intentRequest.sessionState.intent.name, 
                                slots, 'destinationCity',
                                { 
                                    contentType: 'PlainText', 
                                    content: `I didn't find any trips from ${slots.originCity.value.originalValue} to ${slots.destinationCity.value.originalValue}. Try a different destination - what city do you want to fly to from ${slots.originCity.value.originalValue}?` 
                                }));                        
                    }
                }
                else
                {
                    callback(
                        elicitSlot(
                            outputSessionState, 
                            intentRequest.sessionState.intent.name, 
                            slots, 'originCity',
                            { 
                                contentType: 'PlainText', 
                                content: `There was some problem looking for flights from ${slots.originCity.value.originalValue} to ${slots.destinationCity.value.originalValue}. Try a different origin city?` },
                                buildResponseCard(
                                    'Specify Origin City', 
                                    'What city do you want to fly from?',
                                    ""
                                    )
                                )
                            );
                }
            });

    }intentRequest.sessionState.intent.name
}

 // --------------- Intents -----------------------

/**
 * Called when the user specifies an intent for this skill.
 */
function dispatch(intentRequest, callback) {
    // console.log(JSON.stringify(intentRequest, null, 2));
    
    console.log(`dispatch userId=${intentRequest.userId}, intent=${intentRequest.sessionState.intent.name}`);

    const name = intentRequest.sessionState.intent.name;

    // Dispatch to your skill's intent handlers
    if (name === 'TravelBuddyCheckFlightsIntent') 
    {
        return TravelBuddyCheckFlightsIntent(intentRequest, callback);
    }

    throw new Error(`Intent with name ${name} not supported`);
}

// --------------- Main handler -----------------------

function loggingCallback(response, originalCallback) {
    // console.log(JSON.stringify(response, null, 2));
    originalCallback(null, response);
}

// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    
    try 
    {        
        process.env.TZ = 'Australia/Sydney';
        console.log(`event.bot.name=${event.bot.name}`);
        console.log(`event=`, JSON.stringify(event));
        dispatch(event, (response) => loggingCallback(response, callback));

    } 
    catch (err) 
    {        
        callback(err);
    }
};