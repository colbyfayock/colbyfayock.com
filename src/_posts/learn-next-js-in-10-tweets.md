---
template: post
title: Learn Next.js in 10 Tweets
date: 2021-02-18T16:20:46.417Z
category: coding
---
![Next.js in 10 Tweets](/assets/0-intro.jpg)

[Next.js](https://nextjs.org/) has taken the web dev world by storm

It’s the [React](https://reactjs.org/) framework devs rave about praising its power, flexibility, and dev experience

Don't feel like you're missing out!

Here's everything you need to know in 10 tweets

Let’s dive in 🧵

[🐦 View & Share the Tweet Thread](https://twitter.com/colbyfayock/status/1362407526222995456)

## [1. Next.js is a React.js framework from Vercel](https://twitter.com/colbyfayock/status/1362407635904065543)

![React based web framework](/assets/1.-next.js-is-a-react-framework.jpg)

It couples a great dev experience with an opinionated feature set to make it easy to spin up new performant, dynamic web apps

It's used by many high-profile teams like Hulu, Apple, Nike, and more

<https://nextjs.org/>

[🐦 View & Share the Tweet](https://twitter.com/colbyfayock/status/1362407635904065543)

## [2. Next.js was created by and is maintained by Vercel](https://twitter.com/colbyfayock/status/1362407833342537729)

![Created by Vercel](/assets/2.-vercel.jpg)

The team at [Vercel](https://vercel.com/), formerly Zeit, originally and launched v1 of the framework on Oct 26, 2016 in the pursuit of universal JavaScript apps

Since then, the team and community has grown exponentially, including contributions from web leaders like Google

[https://vercel.com/blog/next ](https://vercel.com/blog/next)

[🐦 View & Share the Tweet](https://twitter.com/colbyfayock/status/1362407833342537729)

## [3. Next.js & Jamstack Adoption](https://twitter.com/colbyfayock/status/1362408028767723522)

![58.59% adoption in the Jamstack community](/assets/3.-jamstack-adoption.jpg)

In the [Jamstack](https://jamstackhandbook.com/) world, Next.js pulled a hefty 58.6% share of framework adoption in 2020

Compared to other popular React.js frameworks like Gatsby, which pulled in 12%

\*The Next.js stats likely include some server side rendered, arguably not Jamstack

<https://almanac.httparchive.org/en/2020/jamstack>

[🐦 View & Share the Tweet](https://twitter.com/colbyfayock/status/1362408028767723522)

## [4. Create a new Next.js app with Create Next App](https://twitter.com/colbyfayock/status/1362408221273694211)

![Create Next App](/assets/4.-create-next-app.jpg)

The easiest way to get started with a new Next.js app is with Create Next App

Simply run:

```
yarn create next-app
```

or

```
npx create-next-app
```

You can even start from a git-based template with the `-e` flag

```
yarn create next-app  -e https://github.com/colbyfayock/next-sass-starter
```

<https://nextjs.org/docs/api-reference/create-next-app>

[🐦 View & Share the Tweet](https://twitter.com/colbyfayock/status/1362408221273694211)

## [5. Next.js Routing](https://twitter.com/colbyfayock/status/1362408377847054341)

![File system based router](/assets/5.-routing.jpg)

Next.js uses a file-system based router

Meaning the files you create and their names, are what's used to create your website pages

```
/pages/index.js
\=> / (homepage)

/pages/about.js
\=> /about (About)
```

You can also add dynamic routes for more complex apps

<https://nextjs.org/docs/routing/introduction>

[🐦 View & Share the Tweet](https://twitter.com/colbyfayock/status/1362408377847054341)

## [6. Next.js was built on Server Side Rendering](https://twitter.com/colbyfayock/status/1362408518066860032)

![Server side rendering](/assets/6.-ssr.jpg)

The foundation of Next.js comes from SSR

SSR = Server Side Rendering

On each browser request, Next.js renders the React page  and serves the HTML to the browser

If any data is needed, `getServerSideProps` can be used to fetch dynamic data during render

<https://nextjs.org/docs/basic-features/pages#server-side-rendering>

[🐦 View & Share the Tweet](https://twitter.com/colbyfayock/status/1362408518066860032)

## [7. Next.js supports statically generating apps](https://twitter.com/colbyfayock/status/1362408735293997056)

![Static Site Generation](/assets/7.-ssg.jpg)

It's also capable of SSG

SSG = Static Site Generation

`next export` takes the Next.js website, renders the project similar to how it would on the server, and saves it as static files and assets

`getStaticProps` allows you to fetch data at build time

<https://nextjs.org/docs/basic-features/pages#static-generation-recommended>

[🐦 View & Share the Tweet](https://twitter.com/colbyfayock/status/1362408735293997056)

## [8. Next.js hybrid approach with Incremental Static Regeneration](https://twitter.com/colbyfayock/status/1362408899123494913)

![Incremental Static Generation](/assets/8.-isg.jpg)

There's also a hybrid approach with ISR

ISR = Incremental Static Regeneration

Caching mechanisms serve pages statically while refreshing stale content in the background on the server

Setting revalidate on `getStaticProps` defines how often it refreshes

<https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration>

[🐦 View & Share the Tweet](https://twitter.com/colbyfayock/status/1362408899123494913)

## [9. Serverless functions with Next.js](https://twitter.com/colbyfayock/status/1362409060281298948)

![Serverless Functions](/assets/9.-api.jpg)

Next.js can also create APIs with serverless functions

It also uses file-system based routing to create new routes

```
/pages/api/my-endpoint.js
=> /api/my-endpoint
```

Inside, you export a handler function to handle the request and response

<https://nextjs.org/docs/api-routes/introduction>

[🐦 View & Share the Tweet](https://twitter.com/colbyfayock/status/1362409060281298948)

## [10. Next.js & Plugins](https://twitter.com/colbyfayock/status/1362409214015131650)

![Plugins & Packages](/assets/10.-plugins-packages.jpg)

Instead of a dedicated plugin ecosystem, Next.js maintains opinionated packages that get bundled into the framework

[next/image](https://nextjs.org/docs/api-reference/next/image) provides a range of optimizations like compression, automatic modern formats, and responsive sizing

<https://nextjs.org/docs/basic-features/image-optimization>

[🐦 View & Share the Tweet](https://twitter.com/colbyfayock/status/1362409214015131650)

## [Learn Next.js by building an online store](https://twitter.com/colbyfayock/status/1362409386891767816)

![eCommerce with Next.js](/assets/11.-course.jpg)

Next.js is a flexible framework that gives you as a developer a lot of power over creating great experiences on the web.

Want to dive more into Next.js & React?

Check out my [egghead.io](https://egghead.io/?af=atzgap) course [Create an eCommerce Store with Next.js and Stripe Checkout](https://egghead.io/projects/create-an-ecommerce-store-with-next-js-and-stripe-checkout?af=atzgap)

[https://egghead.io/projects/create-an-ecommerce-store-with-next-js-and-stripe-checkout](https://egghead.io/projects/create-an-ecommerce-store-with-next-js-and-stripe-checkout?af=atzgap)

[🐦 View & Share the Tweet](https://twitter.com/colbyfayock/status/1362409386891767816)