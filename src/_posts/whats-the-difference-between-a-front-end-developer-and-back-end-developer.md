---
template: post
title: What's the difference between a front end developer and back end developer?
date: 2020-06-19T02:17:05.737Z
category: coding
---
Websites and applications are complex! Buttons and images are just the tip of the iceberg. With this kind of complexity, you need people to manage it, but which parts are the front end developers and back end developers responsible for?

[Originally written for freecodecamp.org.](https://www.freecodecamp.org/news/front-end-developer-vs-back-end-developer-definition-and-meaning-in-practice/)

## The many layers of development

Whether you're working on a website or a native iOS app, all development environments share a common theme --- there's a front end to an application and a back end.

This line can get blurry, especially given the rise of javascript and the [serverless](https://en.wikipedia.org/wiki/Serverless_computing) world. With the tooling somewhat merging together, we might sometimes wonder if we're a [full stack developer](https://www.colbyfayock.com/2020/02/how-to-become-a-full-stack-web-developer-in-2020/).

## But we're not all full stack

As much as we might all [want to be](https://full-stack.netlify.app/), we're not all full stack developers. Personally, I find myself able to be productive in the back end of an application, but it's not my strength and I much prefer to be heads down building UIs.

And some people are the opposite, where they are strongest dealing with building APIs in the back end of an application and while they can build out a UI, it might be more of a prototype-like experience than a fleshed out application.

## So what is the difference between Front End Development and Back End Development?

Even if you are a full stack developer, that doesn't mean there's not a division of responsibilities.

<figure><img src="/assets/front-end-vs-back-end-engineer.jpg" alt="" /><figcaption>Front End Engineer vs Back End Engineer</figcaption></figure>

So what do those look like?

## What is Front End Development?

The front end of an application typically refers to the layer that represents the UI (user interface). This can include anything from a static site with HTML and CSS to a full [React](https://reactjs.org/) app that powers the UI.

### What did Front End Development traditionally look like?

Javascript currently rules the front end web, but that wasn't always the case. While it could have been used to add little bits of interaction to a site, typically front ends were rendered using server-side templating languages like framework-driven [PHP](https://www.php.net/) and [Template Toolkit](http://www.template-toolkit.org/) ([Perl](https://www.perl.org/)).

This grew to be super popular in practice with home grown frameworks or tools like [Wordpress](https://wordpress.org/) that used PHP to drive a massive community of developers who built their websites with those tools.

The way it worked was the templating language was able to get its data straight from the server as it was rendered. When a browser requested the page directly from the origin (the server itself), whatever data the template would need, the application logic would provide at that time.

Some of the more traditional front end tools include:

* Libraries like [jQuery](https://jquery.com/) or [MooTools](https://mootools.net/)
* Website frameworks like [Wordpress](https://wordpress.com/)
* Plain [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* Abundant use of [Table](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) elements

But as time went on, javascript kept getting more mature as a language and browsers kept getting more powerful, which led to the idea that we could move more of that work to the browser to build faster and more interactive experiences.

### What does Front End Development look like now?

Now it's common to see javascript-heavy websites and apps built using UI frameworks like [React](https://reactjs.org/), [Vue](https://vuejs.org/), and [Angular](https://angular.io/). These tools provide abstractions that allow developers to build complex UIs with reusable patterns like components.

When the browser loads the page, the page receives an initial HTML document that also includes the script tag to the javascript (same as always). But once that javascript loads, it reaches out to APIs using browser requests that when completed, update the page to fill in any kind of dynamic data that you'd typically get along with that first HTML document.

<figure><img src="/assets/building-website-with-more-steps.jpg" alt="" /><figcaption>It's like building a website... with more steps</figcaption></figure>

While it sounds like more steps, it commonly provides a faster initial page load and render, not to mention it has a great developer experience. By delivering less on that first request and prioritizing what loads after that, it usually ends up as a better user experience.

Some of the front end tools that are more common and growing in popularity  include:

* UI frameworks like [React](https://reactjs.org/) or [Vue](https://vuejs.org/)
* Web frameworks like [Gatsby](https://www.gatsbyjs.org/)
* Compilers like [Babel](https://babeljs.io/)
* Bundlers like [Webpack](https://webpack.js.org/)
* CSS tools like [Sass](https://sass-lang.com/)

But those APIs, whether ones we pay for or create ourselves, need to be built *somewhere*. That's where the back end comes in.

## What is Back End Development?

The back end layer is usually where the business logic occurs. This can be super complex like the rules that determine revenue for an e-commerce company or something more common like a user profile.

### What did Back End Development traditionally look like?

The back ends of applications were historically built using server-side languages like [PHP](https://www.php.net/) or [Ruby](https://www.ruby-lang.org/en/). The idea is that you have a server that you need to perform complex operations on, so the way to do that is with a language that server would understand.

On each request to the server, the backend would perform the full stack of the operations, including rendering out the front end. By using frameworks or DIY architectures, the back end would accept the request, figure out what it should do with that request, run any business logic needed with the request, and provide the front end any data that it would need to display a response to that request.

<figure><img src="/assets/front-end-back-end-500-error.jpg" alt="" /><figcaption>Back end giving the front end a 500 Internal Server Error</figcaption></figure>

Some of the more traditional back end tools include:

* On-premise or remotely managed servers like [Rackspace](https://www.rackspace.com/)
* HTTP servers using [Apache](https://httpd.apache.org/)
* Databases like [MySQL](https://www.mysql.com/)
* Server side languages like [PHP](https://www.php.net/) or [Perl](https://www.perl.org/)
* Application frameworks like [Ruby on Rails](https://rubyonrails.org/)

### What does Back End Development look like now?

Back end stacks look somewhat similar to the way they did before, aside from newer code patterns, except more often you'll see the back ends provide data through APIs via HTTP requests instead of directly to the templates the front end team are working on.

While the foundation isn't super different, it actually be comes increasingly complex as you have to deal with different security implications that could compromise your system if not properly configured such as leaving an API open to the public that returns sensitive user data.

But also how the server operates can be completely different. While previously, we might run our python on our own managed server (we still can), we can now make use of serverless functions with tools like [AWS Lambda](https://aws.amazon.com/lambda/) that simplify how we manage code.

While "[serverless](https://en.wikipedia.org/wiki/Serverless_computing)" doesn't necessarily mean there are literally no servers, it means that as a service, the developer doesn't have to worry about maintaining that server and can instead just focus on the code they need to run.

Some of the back end tools that are more common and growing in popularity include:

* Cloud servers like [AWS EC2](https://aws.amazon.com/ec2/)
* Serverless services like [AWS Lambda](https://aws.amazon.com/lambda/)
* NoSQL databases like [MongoDB](https://www.mongodb.com/)
* Languages like [Python](https://www.python.org/) or javascript via [NodeJS](https://nodejs.org/)
* Web application frameworks like [Serverless Framework](https://www.serverless.com/)

## Where things get fuzzy

Part of the twist with back ends is now you can write your back end with javascript. With the inception of [Node.js](https://nodejs.org/en/), developers were given the ability to use their favorite browser language to do most of the same things they were used to and familiar with but now on a server.

![](https://www.freecodecamp.org/news/content/images/2020/06/nodejs-never-stopped-to-think-if-should.jpg)

Never stopped to think if we should write JS on a server

While not everyone is fond of running javascript as a server side language, it became a little easier to use the same language to write the full stack of an application. This changed the game a bit as far as front ends and back ends were concerned.

But it's also started to come full circle where you now see systems that build APIs right [next to the front end](https://redwoodjs.com/tutorial/redwood-file-structure) similar to what you might see in a traditional stack.

## Front End vs Back End

Regardless of the stack, there will always be the separation of concerns. The UI and all of the interaction, whether rendered on the server or in the browser, is what makes the front end the front end and the data and business logic, whether coming from the server in your company's closet or a managed function, is what makes the back end the back end.

Whether you prefer to work on the user facing features or build the logic that lets them do things, there are plenty of resources to get started.

## Resources to learn

### Front End

* [freecodecamp.org Responsive Web Design Certification](https://www.freecodecamp.org/learn/) (freecodecamp.org)
* [Beginner Javascript](https://beginnerjavascript.com/) (beginnerjavascript.com - Wes Bos)
* [React Tutorial for Beginners](https://www.youtube.com/watch?v=Ke90Tje7VS0) (youtube.com - Programming with Mosh)
* [Front End Masters](https://frontendmasters.com/) (frontendmasters.com)

### Back End

* [freecodecamp.org APIs and Microservices Certification](https://www.freecodecamp.org/learn) (freecodecamp.org)
* [Super simple start to serverless](https://kentcdodds.com/blog/super-simple-start-to-serverless/) (kentcdodds.com)
* [AWS Certified Cloud Practitioner Training 2019 - A Free 4-hour Video Course](https://www.freecodecamp.org/news/aws-certified-cloud-practitioner-training-2019-free-video-course/) (freecodecamp.org)
* [CS50's Introduction to Computer Science](https://www.edx.org/course/cs50s-introduction-to-computer-science) (edx.org)

### All the above

* [How to Become a Full Stack Web Developer in 2020](https://www.colbyfayock.com/2020/02/how-to-become-a-full-stack-web-developer-in-2020/) (colbyfayock.com)
* [Egghead.io](https://egghead.io/?af=atzgap) (egghead.io)
* [100 Days of Code](https://www.100daysofcode.com/) (100daysofcode.com)
* [The Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/) (udemy.com - Colt Steele)