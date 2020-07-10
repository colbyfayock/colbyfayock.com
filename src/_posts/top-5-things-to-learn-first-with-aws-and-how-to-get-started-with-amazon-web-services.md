---
template: post
title: Top 5 Things to Learn First with AWS and How to Get Started with Amazon
  Web Services
date: 2020-07-08T03:39:07.674Z
category: coding
---
AWS has taken the tech community by storm. It’s easily sold as one of the most reliable providers with an exhaustive list of services from object storage to machine learning. But it can easily be overwhelming for someone new to the cloud. Where should you start when trying to learn AWS?

## Object storage with AWS S3

S3 is AWS' solution for object storage. From a really simple point of view, S3 buckets are kind of like a hard drive in the cloud for static files. This means while you can upload pretty much anything to S3, once it’s there, you can’t really do anything with it except download it or write over it.

But S3 is cheap and storage is a service that pretty much every website needs. This makes S3 a really valuable service that is a de facto part of any modern architecture.

Have some simple images you want to store? Dump them in an S3 bucket. Have some PDFs that you generate for reports? Store and access them from an S3 bucket.

While you can’t execute the code, browsers work by downloading files like JavaScript and then executing those files on its own, so it’s a perfect combo for static web assets or photos.

### Resources for learning

* [Amazon S3](https://aws.amazon.com/s3/) (aws.amazon.com)
* [How do I upload files and folders to an S3 bucket?](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/upload-objects.html) (docs.aws.amazon.com)

## Host and deploy a static website with AWS S3 and CloudFront

Let's take what we just learned about AWS S3 a little bit further. Since browsers ultimately download files to use them, we can use S3 as a way to host static websites with a simple check of a box!

S3 offers a [configuration option](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/static-website-hosting.html) that allows us to serve a website from a simple bucket. It sets up the bucket to allow HTTP requests that the browser can recognize, which makes that[Gatsby](https://www.gatsbyjs.org/)app you just compiled or even a single HTML file a perfect candidate for S3.

CloudFront comes in at the tail end and provides the CDN (or content delivery network) for our website. Where S3 allows us to host the website in a bucket, CloudFront sits in front of the bucket as a cached distributed network layer that allows our website to get to our visitor’s browsers quicker than straight from S3.

### Resources for learning

* [Amazon S3](https://aws.amazon.com/s3/) (aws.amazon.com)
* [Amazon CloudFront](https://aws.amazon.com/cloudfront/) (aws.amazon.com)
* [How to host and deploy a static website or JAMstack app to AWS S3 and CloudFront](https://www.freecodecamp.org/news/how-to-host-and-deploy-a-static-website-or-jamstack-app-to-s3-and-cloudfront/) (freecodecamp.org)
* [How to host and deploy a static website or JAMstack app on AWS S3 & CloudFront](https://www.youtube.com/watch?v=1lDGDzmbQWg) (youtube.com)
* [Hosting a static website on Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html) (docs.aws.amazon.com)

## Create a serverless function with AWS Lambda

If you’re new to the serverless world, the idea isn’t that there are literally no servers. It's just that as a customer, you don't have to manage those servers.

Most cloud providers have some kind of solution for serverless services, but one of the most popular is using Lambda functions from AWS.

Lambdas functions are what they sound like, a function, but they run in the cloud. You don’t have to worry about any of the resources that make that function run, just the environment you want to write in such as node or python.

This is powerful and cheap! It helps abstract logic into a single function in a cloud that can be scaled as much as you want (given any 3rd party services it reaches out to can scale that much).

What can you do with Lambda? Here are just a few examples:

* Read and write data to S3 or a database
* Process data with complex logic
* Create a web application using [Express](https://expressjs.com/)

There’s a lot of potential that getting familiar with AWS Lambda can unlock!

### Resources for learning

* [AWS Lambda](https://aws.amazon.com/lambda/) (aws.amazon.com)
* [Learn AWS Lambda from Scratch](https://egghead.io/playlists/learn-aws-lambda-from-scratch-d29d?af=atzgap) (egghead.io)
* [Cron Job AWS Lambda Functions Tutorial – How to Schedule Tasks](https://www.freecodecamp.org/news/using-lambda-functions-as-cronjobs/) (freecodecamp.org)

## Spin up a managed server with AWS EC2

One of the big selling points of AWS is that we can do all of our computing in our cloud. And that goes for anything!

At the core of AWS is Amazon [EC2](https://aws.amazon.com/ec2/) (Elastic Compute Cloud) which is at its simplest a server in the cloud.

Using EC2, you can spin up a server with a variety of available configurations where you can pretty much do whatever you want. You can start small if you only want to do simple operations or you can scale both vertically and horizontally to give you a lot of processing power for your data heavy operations.

Some of the things that you can do with EC2 include:

* Spinning up a new instance of Wordpress or your favorite CMS
* Managing a custom webserver
* Compute heavy processing of science data

### Resources for learning

* [Amazon EC2](https://aws.amazon.com/ec2/) (aws.amazon.com)
* [How to Spin Up a Remote Server on AWS](https://www.freecodecamp.org/news/getting-started-with-server-administration-on-aws/) (freecodecamp.org)
* [Running a Virtual Ubuntu Desktop](https://ubuntu.com/tutorials/ubuntu-desktop-aws) (ubuntu.com)
* [From Zero to AWS EC2 for Data Science](https://medium.com/@junseopark/from-zero-to-aws-ec2-for-data-science-62e7a22d4579) (medium.com)

## Learn the AWS acronyms

Seriously. As a front end engineer who’s been building websites for a long time, one of the most valuable things for me to be productive with the rest of my team was to learn the acronyms of the various AWS services.

S3? EC2? CF? I can come up with a lot of wrong answers from that, but being able to simply know what those things mean makes me capable of keeping up with the conversation.

Even though I primarily work on the front end, I should have an understanding of the concepts of where we store and host our static applications. That means, I should know that S3 is Simple Storage Service and it pretty much acts like a hard drive in the cloud for static files.

But learning the acronyms doesn’t necessarily mean you have to know how the services work.

While the things to learn I’ve listed above are great to know practically, if you’re solely focused on the front end of an application, you shouldn’t be expected to understand how the ELB (Elastic Load Balancer) or EMR (Elastic MapReduce) services work. But being able to know WHAT they are is extremely helpful as you work with the rest of your team.

### Resources for learning AWS acronyms

There are many ways to learn the acronyms. You can simply go to the [AWS website](https://aws.amazon.com/products/?nc2=h_ql_prod) and read through the list of all of the services, but that’s probably not the most efficient way.

There are a ton of resources available for learning the fundamentals of AWS including a [free 4-hour course for the AWS Certified Cloud Practitioner Course](https://www.freecodecamp.org/news/aws-certified-cloud-practitioner-training-2019-free-video-course/) from freecodecamp.org.

While you don’t have to take the exam to learn the material, it’s definitely a bonus if you want to make the investment as that’s another thing you can add to your resume making you ultimately more valuable.

But start by focusing on the services you hear most often or the ones your team uses. It will go a long way in helping you become more effective as part of your team.

## Other tools to help you manage AWS

While you certainly can be productive by working with each AWS service individually, there are a ton of tools that can help make working with those services even easier.

### AWS SDK

Straight from AWS is the [AWS SDK](https://aws.amazon.com/tools/). It comes in a few different languages such [AWS SDK for Javascript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/) which you can use [via npm](https://www.npmjs.com/package/aws-sdk).

With the SDK, you can interface with AWS services right in your app.

### Serverless Framework

Tooling around the serverless world is still young, but the [Serverless Framework](https://www.serverless.com/) is one of the tools that have stuck around the longest to help build serverless applications.

Serverless, not to be confused with the concept, will help you spin up web applications by handling managing the deployment of the AWS services you want.

### AWS Lightsail

While you can spin up an EC2 instance to do whatever you like, [AWS Lightsail](https://aws.amazon.com/lightsail/) can take care of some of the heavy lifting for you.

Lightsail provides some click-and-launch services like spinning up a new Wordpress server or LAMP environment.

### AWS Amplify

If you want a tool to manage your services for you and just get productive, [AWS Amplify](https://aws.amazon.com/amplify/) can help you rapidly build web and mobile applications with a variety of services.

This includes authentication, data storage, analytics, machine learning, and a lot more.

## Have you already worked in AWS?

What's your favorite service? [Let me know on Twitter!](https://twitter.com/colbyfayock)