---
template: post
title: Learn Next.js in 10 Tweets
date: 2021-02-18T16:20:46.417Z
category: coding
---




![](/assets/0-intro.jpg)

Next.js has taken the web dev world by storm

It’s the @reactjs framework devs rave about praising it's power, flexibility, and dev experience

Don't feel like you're missing out!

Here's everything you need to know in 10 tweets

Let’s dive in 🧵

## 1. Next.js is a React.js framework from Vercel

![](/assets/1.-next.js-is-a-react-framework.jpg)

It couples a great dev experience with an opinionated feature set to make it easy to spin up new performant, dynamic web apps

It's used by many high-profile teams like @hulu, @apple, @Nike, and more

<https://nextjs.org/>

## 2. Next.js was created by and is maintained by Vercel

![](/assets/2.-vercel.jpg)

The team at Vercel, formerly Zeit, originally and launched v1 of the framework on Oct 26, 2016 in the pursuit of universal JavaScript apps

Since then, the team and community has grown expotentially, including contributions from web leaders like Google

[https://vercel.com/blog/next ](https://vercel.com/blog/next)

## 3. Next.js & Jamstack Adoption

![](/assets/3.-jamstack-adoption.jpg)

In the #jamstack world, Next.js pulled a hefty 58.6% share of framework adoption in 2020

Compared to other popular React.js frameworks like Gatsby, which pulled in 12%

\*The Next.js stats likely include some server side rendered, arguably not Jamstack

<https://almanac.httparchive.org/en/2020/jamstack>

## 4. Create a new Next.js app with Create Next App

![](/assets/4.-create-next-app.jpg)

The easiest way to get started with a new Next.js app is with Create Next App

Simply run:

```
yarn create next-app
```

or

```
npx create-next-app
```

You can even start from a git-based template with the -e flag

```
yarn create next-app  -e https://github.com/colbyfayock/next-sass-starter
```

<https://nextjs.org/docs/api-reference/create-next-app>

## 5. Next.js Routing

![](/assets/5.-routing.jpg)

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

## 6. Next.js was built on Server Side Rendering

![](/assets/6.-ssr.jpg)

The foundation of Next.js comes  from SSR

SSR = Server Side Rendering

On each browser request, Next.js renders the React page  and serves the HTML to the browser

If any data is needed, `getServerSideProps` can be used to fetch dynamic data during render

<https://nextjs.org/docs/basic-features/pages#server-side-rendering>

## 7. Next.js supports statically generating apps

![](/assets/7.-ssg.jpg)

It's also capable of SSG

SSG = Static Site Generation

`next export` takes the Next.js website, renders the project similar to how it would on the server, and saves it as static files and assets

`getStaticProps` allows you to fetch data at build time

<https://nextjs.org/docs/basic-features/pages#static-generation-recommended>