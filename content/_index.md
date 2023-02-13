+++
title = "Experience Amazon AI services"
date = 2023
weight = 1
chapter = false
+++
# Experience Amazon AI services

In this lab, we will explore the Amazon AI services - Lex, Polly and Rekognition - and interact with the real-world using natural language, speech and visual recognition. In a previous lab, we liberated our monolithic *TravelBuddy* website and re-architected it as a single-page web application hosted in an Amazon S3 bucket, and separated out various data elements as microservices, to allow the user to query flights in the system based on simple text entry for origin or destination city. In this lab, we will take this one step further, and provide a chat bot implementation, that will allow our users to use natural language queries in a chat window, and interact with the search engine as if they were having a conversation with a person.

We’ll explore how to use the Java SDK to synthesise speech using Amazon Polly, and also use the AWS CLI to generate speech and speech markers that can be used to drive animations or captions.

We’ll also take a look at how we can use Amazon Rekognition to perform feature extraction and classification of objects in images, and use Rekognition’s facial recognition features to create a mock-up of a people-tracking system.

#### Topics Covered

By the end of this lab, you will be able to:
- Use the Java SDK to interact with the Amazon AI Services
- Implement web applications that interact with Amazon Lex and Amazon Rekognition
- Generate life-like speech using Amazon Polly
- Use various AWS services and features together to create systems - such as using S3 triggers to run Lambda functions that make use of Rekognition, DynamoDB and S3 together

#### Technical Knowledge Prerequisites

To successfully complete this lab, you should be familiar with basic navigation of the AWS Management Console and be comfortable editing scripts using a text editor.

#### Practice environment

This exercise will use the resources created and configured from Module 6.