---
template: post
title: What is Gatsby and why it's time to get on the hype train?
date: 2019-09-25T03:14:22.904Z
category: coding
---
Frameworks come and go, and while Gatsby may eventually drift as tech does, the performance and productivity boosts are strong arguments for diving in right away.

## Wait up, what is Gatsby?

> [Gatsby](https://www.gatsbyjs.org) is a free and open source framework based on React that helps developers build blazing fast **websites** and **apps**

Their emphasis (I’ll explain later). I like to describe it as [Create React App](https://facebook.github.io/create-react-app/) on steroids, where it’s an easy way to bootstrap a React application and focus on getting productive with the truly different parts of your application. At it’s core, it’s a glorified [Webpack](https://webpack.js.org/) app, where everything gets built upon that same Webpack pipeline that you’ve struggled to write and fully understand til this day (or maybe that’s just me).

The beauty though is that what it outputs is a static website (simple HTML file) with your application prerendered for optimal delivery. This means it can essentially run anywhere like simply dumping it in [S3](https://aws.amazon.com/s3/) and [serving it as a static webpage](https://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html) or even easier, have [Netlify](https://www.netlify.com/) [build and serve it for you](https://www.netlify.com/blog/2016/02/24/a-step-by-step-guide-gatsby-on-netlify/).

### It’s all in the scripts

![Chubbs teaching Happy Gilmore](/assets/chubbs-happy-gilmore.jpg)

Gatsby is one of the many tools available that supports the [JAMstack](https://jamstack.org/) architecture. For the unfamiliar, JAM stands for Javascript APIs and Markup, or pretty much a static HTML website that utilizes javascript to make the magic happen.

JAMstack apps have a lot of benefits right out of the box including:

* Easy to host
* Cheap to host
* It loads super quick (most of the time)

This means generally more often than not, you’re going to have a fast site that doesn’t cost you a lot of money to both host and maintain.

### Sound a bit familiar?

It’s easy to compare this to [Rails](https://rubyonrails.org), as I hear often from others on my team, and rightfully so. There’s a lot of magic behind the scenes in Gatsby!

But unless you’re purely leaning on plugins and themes (which is fine), at the end of the day you’re still building a React application as you would anywhere else. Your app can /pretty much/ be ported to any other framework (aside from the data sourcing and page generation part). Components are components, styles are styles.

```
const Nav = () => {
  return (
    <nav>A normal nav component in a normal Gatsby app.</nav>
  )
}
```

Gatsby is opinionated on many aspects, but those opinions mostly fall outside of the idea that you’re still building a webpack app and those conventions are of webpack and the config behind it, not necessarily Gatsby.

## So, what actually makes it so great?

### Literally bootstrap in under a minute

![Literally - Rob Lowe in Parks and Recreation](/assets/literally.gif)

Seriously.  Spinning up a new Gatsby site is the literal definition of all those click bait articles saying you can do something in 5 minutes. [Install the CLI](https://www.gatsbyjs.org/tutorial/part-zero/#using-the-gatsby-cli) and you’re 3 commands away from your app spun up locally or statically built.

For example, if you wanted to spin up a new barebones project with [Sass](https://sass-lang.com/):

```
$ gatsby new my-cool-gatsby-project https://github.com/colbyfayock/gatsby-starter-sass
$ cd my-cool-gatsby-project
$ yarn develop
```

![Bootstrapping a Gatsby app](/assets/gatsby-bootstrap-app.gif)

 A community of Starters provides an easy entry point to your new app (or the whole thing you want). 

_Note: the whole “under a minute” depends on what kind of connection you’re on, as you’ll need to wait for the dependencies to download and install._

### Bringing it all together in the content mesh

One of the concepts behind Gatsby is the idea of the “[content mesh](https://www.gatsbyjs.org/blog/2018-10-04-journey-to-the-content-mesh/)” and Gatsby being the solution to pull it all together. Many apps, and growing, are being built with the JAMstack architecture, which helps with the idea that we can source as much of our content from as many places as we want and bring it into one application in a performant way. 

![Gatsby and the "content mesh"](/assets/content-mesh.jpg "https://www.gatsbyjs.org/blog/2018-10-04-journey-to-the-content-mesh/")

When all is said and finished, you can pull in data from many sources into one statically compiled application. That is indeed blazing fast. 🔥

### Free performance boost!

Out of the box you get your supercharged webpack config including [code splitting](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/code-splitting/), [prefetching](https://developers.google.com/web/fundamentals/performance/resource-prioritization), inline styles, minification of assets, and a [ton of other greatness](https://www.gatsbyjs.org/docs/gatsby-internals/). Upgrade that easily with a wealth of plugins that are easy to configure like setting up your app as a [PWA](https://www.gatsbyjs.org/docs/progressive-web-app/) ([progressive web app](https://developers.google.com/web/progressive-web-apps/)) and providing the ability for [offline mode](https://www.gatsbyjs.org/packages/gatsby-plugin-offline/>) 

Lots of buzzwords in there, but at the end of the day, that means your website should be snappy based on mostly best practices that are optimizing all of your site’s assets for speed and delivery, all while making it as accessible as possible by [transpiling for older browsers](https://www.gatsbyjs.org/docs/babel/) and making sure slow connections aren’t wasting valuable resources.. It’s difficult to confirm as a hard stat, but [Kyle Mathews](https://twitter.com/kylemathews) (Gatsby Founder) claims [Gatsby sites are 2-3x faster than similar types of sites](https://www.gatsbyjs.org/blog/2017-09-13-why-is-gatsby-so-fast/). 

### Increased productivity!

No longer do you have to concern yourself with the complexities of making sure your application is performant by rewriting and tweaking your webpack config to the new best practices for each new app you bootstrap. Gatsby does this all for you. It lets you focus on the import bits that makes your app special, not the scaffolding. 

This is taken a step further with Gatsby’s [plugins](https://www.gatsbyjs.org/plugins/) and the addition of [Themes](https://www.gatsbyjs.org/docs/themes/). Themes are not what you would expect in the traditional sense, or what you would expect from [Wordpress](https://wordpress.org/), but they provide a way to abstract any part of your Gatsby application so you can reuse it app to app.

Have a core component library you use every time? Make it a theme. Have [a particular configuration for data sourcing](https://www.gatsbyjs.org/packages/gatsby-source-wordpress/) that you don’t want to rewrite every time? Make it a plugin. Being able to abstract these key pieces to your app saves you time and stress on each new project you spin up, not to mention the ability to maintain those pieces in one place, fixing bugs and improvements with a simple package update.

### Large community

Gatsby itself has a decently large community already, but on top of that you have Webpack and React, which have been around for a while. React is the [most popular UI framework](https://2018.stateofjs.com/front-end-frameworks/overview/) at the moment, which makes debugging via a simple Google search much easier. It’s hard to find a problem that you’re the first and only to stumble upon.

If you have a Gatsby question in particular, their Github Issues is swarming with people willing to help you debug or tackle the next bug. All they ask is that you politely provide them a way to reproduce, which just makes it easier for them to help you in the first place!

### Friend of Hackerman

Like to roll up your sleeve and tweak the pipeline yourself? Gatsby provides easy ways to patch into the processing whether it’s [hooking into the lifecycle of the build](https://www.gatsbyjs.org/docs/node-apis/) or tweaking the [webpack config](https://www.gatsbyjs.org/docs/add-custom-webpack-config/). This allows the core of your app to be as easy or advanced as you want, though if you’re that advanced, maybe [help write a plugin](https://www.gatsbyjs.org/docs/creating-plugins/) or two!


![Hackerman](/assets/hackerman.gif)

## The maybe not so great…

### Building fast yields more bugs

You should expect that you’ll hit some snags here and there staying on the latest and greatest, after all it is open source software developing for more than just your individual site.

The Gatsby team has been [building very rapidly](https://github.com/gatsbyjs/gatsby/pulse/monthly), which is awesome, but moving fast is prone to overlooking things as they build. Luckily, they’re starting to push automated testing all over to help harden the code and they’re intentionally trying to slow things down to address this type of concern.

Just make sure to be thorough on testing your package upgrades and don’t be afraid to downgrade and lock your package version if you’re running into issues.

### Static sites are first class, not web apps

Gatsby pens itself as an all inclusive solution for static and non-static apps alike, but is it? Support for client only routes requires a [plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-create-client-paths/) or [page creation tweak](https://www.gatsbyjs.org/docs/client-only-routes-and-user-authentication/) which is fine, but their [tone](https://github.com/gatsbyjs/gatsby/issues/15398) on [issues](https://github.com/gatsbyjs/gatsby/issues/16097) tends to suggest they’re not always equally focused on the two.

Really the only argument here is why would you use Gatsby over Create React App for that use case? Although it may not be first class, it’s still quite functional with a bonus of the standard underlying Gatsby benefits, but clearly bugs and features aren’t going to be prioritized towards that goal.

## Just give it a shot already!

My opinion or any other’s doesn’t matter until you try it. Worst case you literally wasted 5 minutes between installing the dependencies and deleting the folder with the project in it, which on a positive note is a learning experience. Best case you just discovered an awesome tool that’s going to help you do great things.

![Lego - we could build a spaceship!](/assets/lego-build.gif)

Go build, go experiment, and share what great things you make!
