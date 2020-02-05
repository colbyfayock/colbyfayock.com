---
template: post
title: How to Become a Full Stack Web Developer in 2020
date: 2020-02-05T02:00:03.373Z
category: coding
---
Full stack web developers are the Swiss Army knife of the code world. Having that designation means you can produce end to end solutions, which is a highly marketable and agile skillset. But what does it actually take to achieve that status?

## First off, what really makes a developer full stack?

It’s fun and buzzy to say any [front end developer is a full stack developer](https://full-stack.netlify.com/), but being able to deploy a website to [Netlify](https://www.netlify.com/) doesn’t make you full stack. This isn’t to be discouraging, just realistically, only having that experience won’t hold up well to that job title in your next interview. While you’re technically creating and deploying your work from start to finish, Netlify, [Zeit](https://zeit.co/), and other providers give you the power to do this with their magical tools that take the majority of the stack operations work out of the equation.

That’s not to take away from what we’re all able to accomplish now as front end devs. The growing movement to compile and deploy static websites has just made this process simpler on the later half of the stack with benefits across the board. Additionally, with the flexibility of tooling options like being able to run JS on a server, our skillsets are able to transfer to more use cases than ever before.

### Where we came from

The web development landscape has been changing rapidly. [Wordpress](https://wordpress.org/) has been king CMS for a little while now, representing over a third of websites who use a CMS, which helped in PHP popularity, while others worked off of homegrown solutions.

These represented a more traditional web stack like [LAMP](https://en.wikipedia.org/wiki/LAMP_(software_bundle)), where you had web servers usually running some kind of content management system and a server side language (like PHP) that would interface with the databases and produce the code that would ultimately be delivered to the browser.

On top of that, you might have Javascript making some interactive features with CSS managing the display of the page. Now in some instances, having a managed Wordpress server is all you need for certain web hosts, but other larger sites would require another team to manage those services and the deploy pipeline for getting the code out to production.

### Where we’re at and where we’re going

While [Wordpress isn’t going anywhere](https://trends.builtwith.com/cms/WordPress), the [serverless](https://aws.amazon.com/serverless/) and [JAMstack](https://jamstack.org/) architectures are building momentum. For those unfamiliar, the idea isn’t that there are literally no servers, but it’s more about using servers that are managed for you in the cloud.

Services like [AWS Lambda](https://aws.amazon.com/lambda/) let you build a “function” that processes simple input and output. Attach that to [API Gateway](https://aws.amazon.com/api-gateway/) and you immediately have an endpoint you can interface with without ever having to actually manage a server. Others like [S3](https://aws.amazon.com/s3/) let you dump HTML, CSS, JS, images, and whatever other static assets into storage and serve the site directly from it. Nothing gets processed on the server, you’re simply serving the static files to the client.

The brilliant part about this is there’s a lot less overhead and it's typically a whole heck of a lot cheaper. Many cases, you’ll also get a huge performance boost, where serving a site from s3 will require less processing to get that [first response to the browser](https://developers.google.com/web/tools/lighthouse/audits/ttfb), which can directly equate to improved user experience.

This isn’t to push you to the JAMstack, but to show that the full stack paradigm is shifting and it’s something worth looking at. There still is a traditional sense of the difference in work, but it’s becoming a bit different.

DevOps teams now manage cloud resources and deploys, backend developers now build APIs and code that interfaces with services using tools like lambda functions, and front end developers primarily work in Javascript building [React](https://reactjs.org/) or [Vue](https://vuejs.org/) apps that reach out to the services your backend developers created. Arguably, this might or might not include things like CSS, but that’s another can of worms about what title that work “officially” falls under (spoiler: depends on the team).

While there is still a split sense of duties, the line is blurring and makes it more manageable to spread your focus.

## Before we dive in, let’s talk about that focus

It can be pretty tempting to want to dive right in and cover the full spectrum of a full stack developer, but there’s something to be said about focus. This is the basis of the expression "[jack of all trades, master of none](https://en.wikipedia.org/wiki/Jack_of_all_trades,_master_of_none)," where you try to learn a little bit of each part of the full stack and never really master anything.

This can be dangerous when starting off trying to build your strengths as a new developer, so try to evaluate what type of learner you are and lend your focus where it matters. If you’re struggling with a spread out curriculum, that might not necessarily help get you the experience you need to land that first job or that dream job you’re reaching for. A novel approach, for example, could be having an individual focus, but building the full stack skills around that strength, such as a front end developer who can deploy their own web apps and continuing to build on that fundamental knowledge.

On top of that, part of being a full stack developer isn't necessarily being able to say that you know x, y, and z languages. Understanding code and software design concepts as well as being able to tackle any challenge at hand, stack aside, is what makes a great developer.

The bottom line, try to figure out what's best for you and don't let your high ambition get in the way of mastering your journey.

## So where do we start?

For the purposes of this article, we’re going to keep with the traditional breakpoints of what break up the stack (front end, back end, etc.). Though [some people say it's not really a thing anymore](https://medium.com/better-programming/2020-001-full-stack-pronounced-dead-355d7f78e733), realistically, there are tons of jobs for full stack developers and day to day, they refer to the traditional breakpoints. "Full stack developer" definitely isn't going anywhere.

As far as the stack goes, we’re going to lean on the serverless / JAMstack architectures, as that’s just going to keep growing, which will only make you more marketable with the number of jobs popping up around it.

As you'll notice below, this isn't meant to be all encompassing with every type of database and every type of rendering solution. A strong developer should be able to be flexible with their tooling, reaching to understand the concepts of their work rather than being singled minded and only being able to be productive in one framework. While you may be working in React and comfortable with it in your current job (that's okay!), your next job could be heavy on Vue or "surprise!" your team lead wants to rewrite the app in [Svelte](https://svelte.dev/). Try to understand why you're using a UI framework in the first place and how it's helping you solve the problem at hand.

Now let's get into it...

## Front End

The front end of a website or application is typically the UI that the person using your service interacts with. The biggest language player in the game is Javascript, where you’ll typically lean on UI libraries such as React or Vue to manage the components of your project.

Using these UI frameworks will allow you to create “components”, essentially blocks of code, that will end up producing HTML with the ability to create interactions and dynamic states right along with your code. This becomes really powerful and while there might be a little curve to start, it becomes pretty delightful to work with once you get a hang of it.

Whether new to the field or well experienced, you might eventually run into jQuery. While it has it’s merits and served the community well, Javascript’s native features have really grown and created less demand for the functionality jQuery was able to provide, instead leaning on the UI frameworks and native Javascript. It’s good to understand what jQuery is, but I don’t recommend taking the time learning it at this point. The good thing is, if you land a job that uses it, you can write native Javascript right along with jQuery, so learning vanilla Javascript itself is the right answer.

### So what should I learn?

If you’re truly a beginner, take the time to learn basic HTML and CSS. It might not be as fun and attractive as digging right into Javascript, but [building upon the fundamentals](https://www.freecodecamp.org/news/put-down-the-javascript-learn-html-css/) of what makes the web will be key to starting off on the right foot.

Next, learn Javascript. It will remain king for the foreseeable future. Javascript will provide the basis of any framework or library that you build upon, so getting to understand how the bits and pieces of the language itself works will help propel you through your journey of learning the front end side of things. It will also make your life easier when you’re trying to understand some of the complexities of different patterns and the [concepts behind the frameworks](https://reactjs.org/docs/getting-started.html#javascript-resources) you’ll use.

Speaking of frameworks, React and Vue are probably the best candidates given their popularity. React is the most popular out of the bunch and is just going to keep growing as they’re constantly working to mature the framework and produce APIs that will help build modern, fast web apps.

Getting started with [Create React App](https://github.com/facebook/create-react-app) or [Gatsby](https://www.gatsbyjs.org/) will even help you easily spin up a React app and immediately get into a position where you can tinker around in the code.

While there would be benefits to call out CSS preprocessors and tools like Sass, there are a ton of solutions now for CSS including [CSS-in-JS](https://cssinjs.org/). While putting CSS inside of JS has some [pros and cons](https://www.freecodecamp.org/news/you-dont-need-css-in-js-why-i-use-stylesheets/), it isn't necessarily worth pointing out what to use as a particular direction, as it's really going to be team dependent. Understanding the basics and power of CSS and how to use it in it's vanilla form will help prepare you for utilizing it no matter the framework.

### Resources

* freecodecamp.org Responsive Web Design Certification <https://www.freecodecamp.org/learn>
* "Put Down the Javascript: Learn HTML & CSS first" <https://www.freecodecamp.org/news/put-down-the-javascript-learn-html-css/>
* MDN Intro to Javascript <https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript>
* Just Javascript email course <https://justjavascript.com/>
* JSRobot Learning Game <https://lab.reaal.me/jsrobot/>
* reactjs.org Intro to React <https://reactjs.org/tutorial/tutorial.html>
* gatsbyjs.org Tutorials <https://www.gatsbyjs.org/tutorial/>

## Back End

In the JAMstack world, the back end will generally refer to the APIs that our front ends use to create dynamic experiences by interacting with endpoints from the client like those in [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) APIs. Being able to make those requests from the client will remove the need to have to do any of that processing before the page is served to the browser.

Though you shouldn’t feel like you can only ever code in one language, being able to write in Javascript gives a nice advantage here, as you can grow into the fundamentals of working with the back end side of things with a familiar language (or vice versa with the front end). [NodeJS](https://nodejs.org/en/) is a common runtime that you’ll find in most cloud environments as an option and will give you a similar experience to what you’d expect in a browser, except you won’t have access to certain browser APIs nor will there be a `window `object and the APIs associated with it.

That said, Python is also [another popular language](https://pypl.github.io/PYPL.html) and is growing, especially given it’s popularity in the data science and engineering community. PHP and Ruby, while both are valid and will give you options in the job market, don’t seem to be as popular and not as much on an overall [upward trend](https://madnight.github.io/githut/) as Javascript and Python.

With the language of your choice, your best bet will be learning how to create cloud services that your applications can interface with. Creating a simple lambda that you can play around with, whether in AWS, Netlify, or any other cloud provider, will give you a good experience as to what you might expect when working in the field. And even if you may not develop directly in a lambda in the job you find, you’ll be able to start getting familiar with concepts that are fundamental to working with the back end, ultimately utilizing those functions to connect with other services and databases to create your own dynamic services.

### So what should I learn?

If you’re already working on learning Javascript from the front end side of things, keep going by using Javascript for your backend. Spin up a lambda using [Netlify functions](https://docs.netlify.com/functions/overview/), where you just need to focus on the code and Netlify takes care of the rest, such as actually getting your function built and deployed.

With your language of choice and first function, try to start working with other services within your code to get experience working with 3rd party APIs. Maybe build an endpoint that can [send out a tweet](https://github.com/colbyfayock/tweet) using the [Twitter API](https://developer.twitter.com/en/docs) (but don’t abuse it). Learn how to create a database and set up your function to interface with it in a CRUD pattern, which will give you a more realistic use case for how a typical app might interact with a backend.

Your goal here should be creating services that your front end will interact with via an endpoint to perform operations for the person using your app. The good news is given the momentum of the cloud, you’ll have a ton of options, and[free options](https://aws.amazon.com/free/)or tiers, to start playing around with.

### Resources

* "Super simple start to serverless" <https://kentcdodds.com/blog/super-simple-start-to-serverless>
* "Building Serverless CRUD apps with Netlify Functions & FaunaDB" <https://www.netlify.com/blog/2018/07/09/building-serverless-crud-apps-with-netlify-functions-faunadb/>

## DevOps and the cloud

DevOps stems from the need to be able to create solutions that smooth out and speed up the process of getting code from the people writing it to a deployed state. This work can range from a lot of responsibilities to a few, whether it’s writing bash scripts for a custom solution or writing a [CloudFormation](https://aws.amazon.com/cloudformation/) template that creates all of the resources needed for an app to run. You’ll typically find this included as part of a larger orchestration of [CI/CD](https://en.wikipedia.org/wiki/CI/CD) workflows which automate the build and deploy process.

And this is constantly changing! Given the serverless boom, the [serverless framework](https://serverless.com/) popped up which manages a lot of this for you in an easier way, which even lead AWS to create their own solution [SAM](https://aws.amazon.com/serverless/sam/). Tools like [Jenkins](https://jenkins.io/) have been around for a bit for the CI/CD part of things, but now you’re seeing [Github](https://github.com/features/actions), [Gitlab](https://about.gitlab.com/product/continuous-integration/), and other source control providers provide their own solutions and tools like [CircleCI](https://circleci.com/) that hook right into your project.

It’s also not perfect yet, writing CloudFormation templates is daunting. Writing automation scripts also isn’t the most fun, though it’s super rewarding when it works! But this is getting better, which is where products like Netlify and Zeit fit in. While they root more from the static hosting side of things, where you compile your app and dump it into storage, their offerings are growing, like [Netlify’s Functions](https://www.netlify.com/products/functions/) that are really just AWS Lambdas that are easier to set up and deploy to a fully functioning endpoint (it’s seriously super easy).

### So what should I learn?

If this is your first time setting this kind of thing up, start with Netlify. Set up a React app or even just a simple HTML file in a Github repository, connect it to a new Netlify account, and watch it deploy.

From there, or if you have a little experience already, start getting curious about what’s going on behind the scenes. Netlify is likely taking your code, running the commands you set up (like `yarn build`) in a virtual environment, dumping the files built into storage like S3, and putting a CDN in front of it like CloudFront to serve from an endpoint. First try doing that manually from your computer using the AWS console and their CLI, then write a script to automate the whole process integrating with Circle CI into your Github project instead of Netlify to get it actually deployed to AWS.

Taking that up a notch will include spinning up services that your back end might interface with. Do you have a database that your services use? You can automate spinning up that database using CloudFormation or bash scripts. Treating your infrastructure as code with disposable, easily recreatable resources will help you and your projects become more flexible and have a better ability to spin back up in the event of failure.

And this all goes for any cloud or CI / CD provider, not just AWS and Circle CI. Pick your favorite cloud and workflow tool and run with it. The point is, start looking at your project’s needs and dig into what’s actually happening in the automated parts of the stack, which will help you learn more and become more resourceful for your project’s needs.

### Resources

* "A Step-by-Step Guide: Deploying on Netlify" <https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/>
* "Setting up a Static Website" <https://docs.aws.amazon.com/AmazonS3/latest/dev/HostingWebsiteOnS3Setup.html>
* "AWS Certified Cloud Practitioner Training 2019 - A Free 4-hour Video Course" <https://www.freecodecamp.org/news/aws-certified-cloud-practitioner-training-2019-free-video-course/>
* See Javascript resources in Front End above

## What about design?

Yes, you should understand design basics. No, you don’t need to be a designer.

There are many aspects about design that will accelerate your abilities as a developer. While we all know the visual and UX designers produce magic, having a basic understanding can prevent your application from becoming a huge disappointment.

Everyone in the development process is working towards a goal that impacts an end user in one way or another. Being able to understand what needs your work is trying to solve and how that impacts those that are using what you create will help the team as a whole develop a more comprehensive end solution.

Consider a back end developer creating an API to allow someone to manage users in an app, where the requirements of the API are pretty lean only including the user’s name. Providing that as a single “name” field instead of “first” and “last” while might not be the most intuitive solution for most, could be an oversight that complicates how the front end developer exposes that in the UI, making it a pain for the developer to display or possibly confusing for the end user to consume.

On top of all of that, design can directly impact conversion. If you're building in the ecommerce space, having a button that doesn’t look like a button can prevent people from adding a product to their cart, which will prevent a purchase, which is lost revenue. Understanding how to humanize the UI even in a basic sense can literally make your project more money or simply help someone use it more easily.

And more importantly, you want your site to be accessible. Many people have different needs, whether they can't see colors the same or can't hear the sounds your app produces, you want to recognize other's needs and try to design in a way that will make your app usable by everyone.

### So what should I learn?

While I don’t expect you to take a whole course for it, try to be cognizant and curious, maybe next time don’t skip that [design article](https://www.freecodecamp.org/news/tag/design/) you saw pop up on the [freeCodeCamp twitter](https://twitter.com/freecodecamp).

When creating solutions, try to imagine how your work will be used. What will the other developers on your team need from your API and what will the people using your app need from your interface?

You can also try to get inspiration from what others are doing in your space. How would you expect an app to look when providing similar functionality? This isn’t license to copy or steal, but understand the needs their solution is solving such as why their Add to Cart button is so huge, why they’re giving users the ability to zoom in on a product photo, or how you can make a table design slightly more usable.

As for accessibility, try to learn the basics. There's a growing amount of resources available to help you understand the needs of others. Try to understand what disabilities there are and how they might struggle in your app. Maybe look at a few common patterns about how to address those concerns. More often than not, it's not too hard to incorporate, and if you get in the habit of doing it from the start, you won't even think about it the next time you build an app.

### Resources

* Design for Developers <https://thoughtbot.com/upcase/design-for-developers>
* Hack Design [https://hackdesign.org](https://hackdesign.org/)
* Design for Hackers <https://designforhackers.com/>
* Intro to Web Accessibility <https://webaim.org/intro/>

## Other things if you're just getting started

A lot of this article assumes you have some of the basics down such as understanding what [git](https://en.wikipedia.org/wiki/Git) and source control is or simply having your code editor set up. If you're truly just getting started, you're going to want to at least have a simple understanding of these concepts, as it'll quickly grow more challenging without them.

There's also something to be said about learning how to use your terminal. It can be overwhelming not to use a GUI if you're new, but once you get moving, you'll quickly find out you'll be more productive by using a terminal and a lot of projects require terminal use anyways.

### So what should I learn?

First things first, get your code editor set up. [Visual Studio Code](https://code.visualstudio.com/) is all the rage right now, but there are others that will serve you well depending on your preferences like [Atom](https://atom.io/) or [Sublime Text](https://www.sublimetext.com/). You'll even find cloud based IDEs like [Repl.it](https://repl.it/) or you can just get started with a lower barrier of entry by playing around in [CodePen](https://codepen.io/) or [JSFiddle](https://jsfiddle.net/).

Either way, once you're ready to get coding, you want to understand what source control is, where git is the biggest player right now. Git is a powerful tool that let's you track changes to code and become more productive collaborating with other developers.

You'll want to get familiar with some of the basic commands of git like adding new changes as well as what branches are and how to use them. Git is a huge world, you don't need to master it right away, you'll quickly learn there's an endless amount of new things to learn on your journey to mastering your git fu.

For a lot of tools you'll use, there are GUIs available like [GitKraken](https://www.gitkraken.com/), but you'll still be a bit limited with what you can do. Learning your way around the default terminals on your machine or downloading other options like [iterm2](https://iterm2.com/) (my preference) or [Xterm.js](https://xtermjs.org/) will be your best bet. Bonus: you'll feel like a movie hacker every time you use it (or is that just me?).

### Resources

* Getting Started with Visual Studio Code <https://www.codecademy.com/articles/visual-studio-code>
* Git resources from Github <https://try.github.io/>
* Learn git by branching game <https://learngitbranching.js.org/>
* Intro to the Mac Command Line <https://blog.teamtreehouse.com/introduction-to-the-mac-os-x-command-line>

## Other things if you're looking for more

There's so much more you can quickly go down a rabbit hole with. Remember not to spread your focus and try not to overwhelm yourself, but if you're feeling pretty good at where you're at, there are some other concepts that will only help as you tackle challenges in the real world.

### [Testing](https://en.wikipedia.org/wiki/Software_testing) and the different methodologies

Writing code is one thing, but being able to set up effective tests will help harden your code and prevent bugs from getting out, which could waste your future time or even cost your product money when the site goes down. Learning how to write tests and the different approaches is important to solidifying your code.

### Browser tools like [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)

One of the most powerful tools you can have when debugging, in my opinion, is being able to debug your application in the browser. Whether it's looking at how the DOM is being rendered, [playing with the CSS](https://developers.google.com/web/tools/chrome-devtools/inspect-styles/edit-styles), or debugging your network requests, you'll learn quickly how to save time and more easily identify where the bug is coming from.

### [HTTP](https://developers.google.com/web/fundamentals/performance/http2) and how to debug requests in the [network panel](https://developers.google.com/web/tools/chrome-devtools/network)

Given the web is based on the internet, your application will ultimately be making requests to other servers. When this happens, understanding the request chokepoints or simply how a request is being made can help you understand why your application seems laggy or why your save button isn't working. Having a basic understanding of how requests works and how to visualize them for debugging will go a long way in your journey.

### Open Source Software and package managers

This one's not as much of a skill or tool to learn as much as it is a way that software is distributed. As you start building code solutions, you'll find out that a lot of us lean on open source packages, most of the time through [npm](https://www.npmjs.com/) if you're writing javascript, which helps us become more productive not having to reinvent the wheel each time.

Spend some time getting to understand the open source concept and even consider giving back by contributing to your favorite project. Lending a hand is usually super appreciated, will help you gain experience, and you might even be able to score some [free swag on your first approved pull request](https://www.gatsbyjs.org/contributing/contributor-swag/)! Just be respectful out there, there's also a real person on the other side of the request.

## What else?

This list can go on forever as there's so much to the world of coding. What else do you think is important in one's journey to become a development master? Send me a [tweet or DM](https://twitter.com/colbyfayock) if you think I'm missing something important!

## You're on fire! Pulling it all together

Given all of the experience you’ll have accumulated with the above, you should be in a position to be able to create an entire app from start to finish by yourself. Do you understand the power that you have?

This is where the fun starts. Try to create a new app, doesn’t matter what it is, just build something. The best thing you can do for learning is to gain experience by doing, whether it’s one of the million todo tutorials you’ll find or by teaching yourself to code by building one of the largest social networks like the [creator of Instagram](https://thenextweb.com/2012/04/10/instagrams-ceo-had-no-formal-programming-training-hes-a-marketer-who-learned-to-code-by-night/).

From here, you should be able to create:

* A web app front end that runs in the browser
* Backend services that your web app can make requests to via endpoints
* Write a script to plug into a CI / CD tool to automate your build and deploy process
* Bonus: making good decisions about how your interface looks so people can actually use it!

Go forth and build! Share your development journey on Twitter. Would love to hear more about where you've been and what you've built or where you're going and what you want to build.
