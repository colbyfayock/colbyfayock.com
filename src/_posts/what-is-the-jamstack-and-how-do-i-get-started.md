---
template: post
title: What is the JAMstack and how do I get started?
date: 2020-02-20T03:26:24.166Z
category: coding
---
JAMstack sites are all the rage right now in the web dev world. And rightfully so! But what exactly is it and how can we all take advantage of its benefits?

## What is this JAMstack?

To start, [JAMstack](https://jamstack.org/) is a software architecture and philosophy that adheres to the following components: Javascript, APIs, and Markup.

If this sounds familiar, it's because it is! That React app that you compile down with [Webpack](https://webpack.js.org/) and ultimately serve from [S3](https://aws.amazon.com/s3/)? Yup, that's a JAMstack app. That simple HTML file that has no JavaScript and literally doesn't do anything dynamic? Yup, that's also a JAMstack app.

![Bill and Ted play air guitars](/assets/bill-ted-air-guitar.gif)

## That's not to be confused with serverless

If you're coming more from the cloud side of things (think [AWS](https://aws.amazon.com/), [GCP](https://cloud.google.com/), [Azure](https://azure.microsoft.com/)), you might be inclined to think of [serverless](https://serverless-stack.com/chapters/what-is-serverless.html) and JAMstack as the name thing. Granted they have similarities in the philosophy of how resources are managed, such as hosting a site on S3. But a JAMstack app is not always going to be a serverless app.

Consider an app hosted in static storage on the cloud provider of your choice. Yes, you might be serving the app in a serverless way, but you might be dealing with an API that utilizes Wordpress or Rails, both of which are certainly not serverless.

Combining these philosophies can go a long way, but they shouldn't be confused as the same.

## What makes up the JAMstack?

Back to the JAMstack: it's typically comprised of 3 components: Javascript, APIs, and Markup. Its [history stems](https://snipcart.com/blog/jamstack) from growing the term "static site" into something more meaningful (and marketable). So while ultimately a static site is the end result, it's blown up to include first class tooling for every step of the way.

![JAMstack breakdown](/assets/jamstack-breakdown.jpg)

While there aren't any specific set of tools that you need to use, or any tools at all beyond simple HTML, there are great examples of what can make up each part of the stack. Let's dive in a little bit to each component.

### Javascript

The component that's probably done the most work to popularize the JAMstack is Javascript. Our favorite browser language allows us to provide all of the dynamic and interactive bits that we might not have if we're serving plain HTML without it.

This is where a lot of times you'll see UI frameworks like [React](https://reactjs.org/), [Vue](https://vuejs.org/), and newcomers like [Svelte](https://svelte.dev/) come into play.

!["A Simple Component" example from https://reactjs.org/](/assets/react-component-example.jpg)

They make building apps simpler and more organized by providing component APIs and tooling that compile down to a simple HTML file (or a bunch of them).

Those HTML files include a group of assets like images, CSS, and the actual JS that ultimately get served to a browser via your favorite CDN (content delivery network).

### APIs

Utilizing the strengths of APIs is core to how you make a JAMstack app dynamic. Whether it's authentication or search, your application will use Javascript to make an HTTP request to another provider which will ultimately enhance the experience in one form or another.

[Gatsby](https://www.gatsbyjs.org/) coined the phrase "[content mesh](https://www.gatsbyjs.org/blog/2018-10-04-journey-to-the-content-mesh/)" that does a pretty good job at describing the possibilities here.

![Content Mesh](/assets/content-mesh-gatsby.jpg)

You don't necessarily have to reach out to only one host for an API, but you can reach out to as many as you need (but try not to go overboard).

For instance, if you have a headless [Wordpress](https://wordpress.org/) API where you host your blog posts, a [Cloudinary](https://cloudinary.com/) account where you store your specialized media, and an [Elasticsearch](https://www.elastic.co/) instance that provides your search functionality, they all work together to provide a single experience to the people using your site.

### Markup

This is the critical piece. Whether it's your hand written HTML or the code that compiles down to the HTML, it's the first part you're serving to the client. This is kind of a de facto piece of any website, but how you serve it is the most important piece.

To be considered a JAMstack app, the HTML needs to be served statically, which basically means not being dynamically rendered from a server.

If you're piecing a page together and serving it with PHP, it's probably not a JAMstack app. If you upload and serve a single HTML file from storage that constructs an app with Javascript, it sounds like a JAMstack app.

![Static output from Gatsby on AWS S3](https://www.freecodecamp.org/news/content/images/2020/02/aws-s3-static-files-gatsby.jpg)

But that doesn't mean we have to always build 100% of the app within the browser. Tools like Gatsby and other [static site generators](https://www.staticgen.com/) allow us to pull in some or all of our API sources at build time and render the pages out as HTML files.

Think if you have a Wordpress blog, we can pull in all of the posts and ultimately create a new HTML file for each post. That means we're going to be able to serve a precompiled version of the page directly to the browser which usually equates to a quicker [first paint](https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint) and faster experience for your visitor.

### One note about "hosting"

Using the term hosting here can be misleading if you're new to the concept. Yeah, your site is technically getting hosted somewhere, but it's not in the traditional sense. You don't have a server that you're maintaining where you upload your files to with an [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol) client like [Cyberduck](https://cyberduck.io/).

Instead, whether your doing it yourself with S3 or piping it into Netlify (which is actually [multi-cloud](https://www.netlify.com/blog/2018/05/14/how-netlify-migrated-to-a-fully-multi-cloud-infrastructure/)), your HTML and static assets are getting served from object storage. On the tail end of that you typically have a CDN like [Cloudflare](https://www.cloudflare.com/) which caches those files at locations all over the world making your pages load faster for the people visiting your site.

![CDN distribution map](https://www.freecodecamp.org/news/content/images/2020/02/cdn-distribution-map.jpg)

## So what makes a JAMstack app so great?

JAMstack apps inherently satisfy most if not all of the [5 pillars of the AWS Well-Architected Framework](https://aws.amazon.com/blogs/apn/the-5-pillars-of-the-aws-well-architected-framework/). These are core concepts that AWS considers to deliver fast, secure, high-performing, resilient, and efficient infrastructure.

![AWS Well-Architected](https://www.freecodecamp.org/news/content/images/2020/02/aws-well-architected-framework.jpg)

Let's see how...

### Speed

The fact that you're serving JAMstack apps as static files directly from a CDN (usually) makes it likely your app is going to load super fast. Gone are the days where the server has to spend time building the page before responding; now you serve the page as just plain HTML "as is" or with some type of client side hydration like you'd see with [React](https://reactjs.org/).

### Cost

More often than not, JAMstack sites are going to run cheaper than their server side counterparts. Hosting static assets is cheap and now your page is being served at the same rate.

### Scalability

Since you're serving your files off of static hosting, likely a CDN, that pretty much automatically gives you infinite scalability. Most providers will make this claim, meaning you'll have no trouble letting any influx of people hitting your site in through the front door.

### Maintenance

The foundation of your static site isn't a server, meaning you don't need to maintain it. Whether it's Netlify, S3, or any other provider, your static HTML, CSS, and JS are maintained for you headache-free.

### Security

Doubling down on the lack of server that you have to personally maintain, you don't really need to worry as much about locking down ways for people to intrude.

Instead, you'll need to focus mostly on permissions to lock down private content and assure your users that their personal information isn't publicly available.

### But this also depends on your APIs

As much as these points strike true for the static aspects of your site, keep in mind you still might depend on some type of API for your client-side experience.

Try to take advantage of these requests at compile time when you can, such as with a static site generator. Otherwise you'll need to weigh the amount of hits you're making to a dynamic endpoint and how it impacts all of the points above for your overall experience.

## Is my website considered to be on the JAMstack?

We already talked about the 3 components (Javascript, APIs, Markup), but what we didn't talk about is the fact that you don't necessarily have to use all 3 of them in order to consider your site worthy of the JAM label.

![Wayne's World "we're not worthy"](https://www.freecodecamp.org/news/content/images/2020/02/were-not-worthy.gif)

Really it all boils down to the Markup and how you serve it. Instead of your Rails app rendering your HTML for you, you might host a precompiled React app on S3 that reaches out to Rails via a set of APIs.

But you don't even need to have APIs. You don't even need to have Javascript! As long as you're serving an HTML file without it having to be compiled on a server at request time (aka pre-rendering it), you've got yourself a JAMstack site.

## What are some examples of JAMstack?

### freecodecamp.org

Yes! freecodecamp.org and its learning portal [is a JAMstack site](https://www.freecodecamp.org/news/freecodecamp-jamstack/) built on Gatsby. Even with the complexities of providing an app to take code courses with, freeCodeCamp is able to pull together the power of a static site generator and powerful APIs to bring people around the world the power of learning code.

![https://www.freecodecamp.org/](https://www.freecodecamp.org/news/content/images/2020/02/freecodecamp.jpg)

You can see Quincy from freeCodeCamp talk more about this at the 2018 JAMstack_conf:\
<https://www.youtube.com/watch?v=e5H7CI3yqPY>

*Note: the News and Forum portals are not currently JAMstack sites.*

### Impossible Foods

The main website for [Impossible Foods](https://impossiblefoods.com/) is no other than a Gatsby site! Everything from their recipes to their location finder are all compiled through our favorite "blazing fast" static site generator.

![https://impossiblefoods.com/](https://www.freecodecamp.org/news/content/images/2020/02/impossible-foods.jpg)

### web.dev

Google's [web.dev](https://web.dev/) resource center is built out using the growing [11ty](https://www.11ty.dev/). You can even find the code made open source at: <https://github.com/GoogleChrome/web.dev>

![https://web.dev/](https://www.freecodecamp.org/news/content/images/2020/02/google-web-dev-1.jpg)

## What are some tools I can use to build JAMstack sites or apps?

The good news with all of this buzz is there are a ton of tools currently available and a ton more on the way. They might still be a little rough around the edges, but that's because this is a brave new world of tooling and that takes some smoothing out to get just right.

### Constructing your app

This is the fun part. How are you going to build your app? With [Scully](https://github.com/scullyio/scully) [in the picture](https://www.netlify.com/blog/2019/12/16/introducing-scully-the-angular-static-site-generator/), you can pretty much pick your favorite flavor of UI framework and get off the ground running. Here's a few popular ones to get started, but by no means is it exhaustive.

* [11ty](https://www.11ty.dev/)
* [Gatsby](https://www.gatsbyjs.org/)
* [Hugo](https://gohugo.io/)
* [Nift](https://www.nift.cc/)
* [Scully](https://github.com/scullyio/scully) (for you Angular fans)
* [And many more...](https://www.staticgen.com/)

*Need me to pick one?* Start with Gatsby and [bootstrap with a simple starter](https://github.com/colbyfayock/gatsby-starter-sass).

### Serving your app

I like to think of this as the easy part depending on your setup. Tools like Netlify and Zeit make this a breeze to configure by hooking into your Github repo and building anytime a new commit gets pushed, but of course you have options like AWS if you want more control.

* [AWS](https://aws.amazon.com/getting-started/projects/host-static-website/)
* [Azure](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website)
* [GCP](https://cloud.google.com/storage/docs/hosting-static-website)
* [Github Pages](https://pages.github.com/)
* [Netlify](https://www.netlify.com/)
* [Surge](https://surge.sh/)
* [Zeit](https://zeit.co/)

*Need me to pick one?* Start with Netlify and [take 5 minutes to deploy](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/) that Gatsby site.

### Making your app dynamic

Really this can be anything that can be used as an API making requests from the browser. I'm not going to list a bunch of examples per type, but here are a few tools and places you can find some resources.

* [Auth0](https://auth0.com/) - Authentication
* [Cloudinary](https://cloudinary.com/) - Media management
* [Google Analytics](https://analytics.google.com/analytics/web/#/) - Web traffic analytics
* [headlesscms.org](https://headlesscms.org/) - Endless list of headless CMSs
* [Sanity](https://www.sanity.io/) - CMS
* [Serverless Framework](https://serverless.com/) - DIY, easy to deploy serverless resources
* [Snipcart](https://snipcart.com/) - Ecommerce
* [Stripe](https://stripe.com/) - Payment management
* [And a bunch of other resources...](https://github.com/agarrharr/awesome-static-website-services)
* [And a bunch of other CMS choices...](https://headlesscms.org/)
* [And some general info and tools...](https://jamstack.wtf/)

### And how about general resources to learn?

You can find a lot of resources to get up and running quickly in the JAMstack world.

* [A Step-by-Step Guide: Gatsby on Netlify](https://www.netlify.com/blog/2016/02/24/a-step-by-step-guide-gatsby-on-netlify/) from Netlify
* [Build your own Blog from Scratch using Eleventy](https://www.filamentgroup.com/lab/build-a-blog/) from filament group
* [How to Host your Static Website with AWS - A Beginner's Guide](https://www.freecodecamp.org/news/a-beginners-guide-on-how-to-host-a-static-site-with-aws/) from freeCodeCamp
* [Hugo Tutorial: How to Build & Host a (Very Fast) Static E-Commerce Site](https://snipcart.com/blog/hugo-tutorial-static-site-ecommerce) from SnipCart
* [How to Build Authenticated Serverless JAMstack Apps with Gatsby and Netlify](https://www.freecodecamp.org/news/building-jamstack-apps/) from freeCodeCamp

## Expect to see more

Similar to its serverless counterpart, the days of JAMstack are young. As time goes on, we'll be seeing the tooling mature and expand providing new exciting ways for us to quickly build fast sites that anyone can use.

Join in the conversation on Twitter and [let me know](https://twitter.com/colbyfayock) what your favorite part of building a JAMstack site is!

## Missing something?

Missing your favorite JAMstack tool or an awesome example? [Ping me on Twitter](https://twitter.com/colbyfayock)!
