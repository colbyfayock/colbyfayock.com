---
template: post
title: Reliable and Maintainable Google Analytics in Webpack
date: 2018-08-05T20:53:44.767Z
category: coding
---
One of the messier bits of a new app setup is trying to figure out where to stash your Google Analytics initialization scripts. There are some existing options, like [React Helmet](https://github.com/nfl/react-helmet), to manage the head of your document or you can simply toss it in your monolithic `index.html` file, but those setups don’t really ever work out the way you want them to and end up as ugly blocks of HTML strings in your Javascript or you end up having to manage that earlier mentioned monolithic `index.html` file throughout your project’s lifecycle.

## Why this actually matters

Beyond how you manage your code, if analytics is truly important to you and your business, you want to make sure the setup is reliable and properly installed. A lot of developers assume that because it’s a JS snippet, that best practice is to toss it at the bottom of the page. The issue with this is, throwing it at the end leaves a greater risk that you miss tracking a hit before a user exits the page, as Analytics won’t initialize until the rest of the page loads. That’s why Google itself recommends [installing the snippet as high in the head as possible](https://support.google.com/analytics/answer/1008080?hl=en).

As important as I say this is, you might not care as much if you’re more relaxed about it and just want to get a general idea about how things are running on your portfolio site, but if you expand your reach into A/B testing with [Google Optimize](https://marketingplatform.google.com/about/optimize/), it’s even more critical to have GA recognize the page and the experiment running to avoid additional delays or worse, page flickering. 😱

## How we’ll fix this

[Partials for HTML Webpack Plugin](https://github.com/colbyfayock/html-webpack-partials-plugin) is an extension of [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin) that simplifies your partial management. It’s goal is specifically to avoid trying to maintain an `index.html` file and instead defer to maintainable partials simplifying your setup.

For now, we’re going to focus on getting Google Analytics set up, but I recommend checking out [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) for managing tags generally, which I’ll cover later in a followup post.

If you want to jump straight to the solution, [you can grab the code here](https://github.com/colbyfayock/html-webpack-partials-plugin/tree/master/examples/analytics).

## Getting started

We’ll want to start out with a basic Webpack setup with HTML Webpack Plugin already configured. This guide won’t walk you through that setup, but here are a couple of starting points if you don’t know where to start:

* [Webpack’s Getting Started guide](https://webpack.js.org/guides/getting-started/#basic-setup)
* [Webpack’s guide for HTML Webpack Plugin](https://webpack.js.org/plugins/html-webpack-plugin/)

Otherwise, there are a ton of awesome tutorials out there you can find by [Googling around a little bit](https://www.google.com/search?q=webpack+html+tutorial).

Lastly, if you already have an `index.html` set up, I won’t judge you for now, but hopefully this inspires you to approach other snippets the same way and remove the need for a managed `index.html` file at all.

## Installing Partials for HTML Webpack Plugin

Once you already have your basic setup and HTML Webpack Plugin installed, our Partials plugin is an easy add:

```
yarn add html-webpack-partials-plugin -D
```

/Note: make sure to properly set up the package dependency based on your project configuration./

## Set up your partial

Next we’ll want to create our partial. My preference for generally managing any partials is to create a new directory called `partials`  in the source root. For example, if your entry point lives at `src/main.js`, your partials directory would be right next to it at `src/partials`.

![Partial directory setup](/static/assets/c6eafed8-3215-42f2-92b5-c83a57e3da8d.png)

Once you have your preferred location, let’s create an `analytics.html` file in our new partials directory. For now, let’s just throw in some test code so we know it works:

```
<style>
body { background-color: #5F4B8B; }
</style>
```

## Configure your partial

Open up your `webpack.config.js` and let’s set up the partial to get included in our build.

First, require the plugin at the top of your config:

```
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
```

Next, and this is very important, include a new instance of the plugin _AFTER_ your instance of `HtmlWebpackPlugin()`:

```
...
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackPartialsPlugin({
      path: './path/to/src/partials/analytics.html'),
      location: 'head',
      priority: 'high'
    })
...
```

Now let’s break that config down first before moving on:

* _path_: this is what it sounds like, the path to the partial file in our project. Make sure to update this to the right location so the plugin can find it.
* _location_: the HTML tag the plugin looks for.
* _priority_: this determines whether at compile time, our plugin adds our partial at the beginning of the `location` tag or at the end (opening vs closing).

Like we covered earlier, we want to add this as high in the `<head>` as possible. For most HTML tags used in `location`, Partials will simply add it right after the opening tag if the priority is `high`, but with the `<head>` tag, Partials looks for your `charset` meta tag and injects it immediately after, as it’s important to render that in the document first.

## Test it out

Compile webpack, open your project in your browser, and you should now see a nice, ultra violet background. 👌

![Page with ultra violet background](/static/assets/19596e02-7d0c-4438-828c-23aa3d75043d.png)

If you take a look at the source, you should see the snippet get added right after the `charset` tag!

## Now to Analytics

Let’s update our `analytics.html` file to look something like this:

```
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-XXXXXXXX-X');
</script>
```

/Note: make sure to update the IDs to your match your property’s values. Your Analytics snippet may also vary depending on your setup./

You should now be able to compile Webpack again and see your page start to ping Google Analytics! 🙆

## Let’s take it a step further

This is great and all, but when dealing with Google Analytics, it’s nice to have a few different properties, such one for development and and one production. This helps avoid polluting the production property with data from your development team (or you) poking around the application.

## Setting up partial variables

Let’s go back to our `webpack.config.js` file and set up a variable to pass our property ID in:

```
...
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackPartialsPlugin({
      path: './path/to/src/partials/analytics.html'),
      location: 'head',
      priority: 'high',
      options: {
        ga_property_id: 'UA-XXXXXXXX-X'
      }
    })
...
```

Next, update your `analytics.html` file to recognize this value. Similar to HTML Webpack Plugin, Partials uses [Lodash templating](https://lodash.com/docs/#template) to make this work.

```
<script async src="https://www.googletagmanager.com/gtag/js?id=<%= ga_property_id %>"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '<%= ga_property_id %>');
</script>
```

Now compile your project and you should be in the same position as before, GA posting your page views, but now in a bit more manageable way.

## Setting this up for different property IDs

From here, you can create an environment config (ex: `env.config.js`) that allows you to import the settings, giving you the opportunity to have different setups between your local development and production server.

Just remember to not store your env file in git if you’re going to add sensitive data. 😅

## So what are we getting out of this?

The ideal scenario is you take this and run with it for the rest of your HTML living in `index.html`. This will help split your code up into more manageable pieces and will additionally let Webpack generate the file for you rather than you trying to override and manage it yourself.

Specifically for Google Analytics, we have a few benefits:

* Ensuring the snippet is loading in a reliable location
* Providing a more reasonable way to maintain the snippet itself
* Managing your property ID through your Webpack config
* And bonus: loading it as an env variable through your Webpack config

To see the full solution with some example code, [check out the example in the Github repo.](https://github.com/colbyfayock/html-webpack-partials-plugin/tree/master/examples/analytics)
