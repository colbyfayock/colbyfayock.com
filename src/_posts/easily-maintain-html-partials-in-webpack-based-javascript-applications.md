---
template: post
title: Easily Maintain HTML Partials in Webpack Based Javascript Applications
date: '2018-07-08'
category: coding
---
Webpack, even with the [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin), doesn’t necessarily give a graceful way of managing simple HTML snippets without putting together ugly custom templates within inline loaders. Moving them to the application itself is sometimes an option, with things like title tags using [React Helmet](https://github.com/nfl/react-helmet), but that doesn’t necessarily work with requirements such as analytics scripts or A/B testing, where you need the snippet delivered with the HTML directly from the server. Yeah, this can also be done with server side rendering, but there’s usually not a great way of managing the snippets themselves.

That’s where [Partials for HTML Webpack Plugin](https://github.com/colbyfayock/html-webpack-partials-plugin) steps in. Management is super simple: create a directory with your partials and load them up in your configuration.

## How simple is it?
1. After installing and requiring it in your webpack config, add `HtmlWebpackPartialsPlugin` to your plugins after `HtmlWebpackPlugin`:
```
// webpack.config.js
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackPartialsPlugin({
    path: './path/to/partials/body.html'
  })
]
```

2. Create your partial:
```
// path/to/partials/body.html
<h1>Hello World!</h1>
```
3. Profit
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
  </head>
  <body>
  <h1>Hello world!</h1><script type="text/javascript" src="main.js"></script></body>
</html>
```

## What this is not…
This isn’t meant to build your entire application. Though it’s a good candidate for throwing your `<div id=“root”...` to mount your [React](https://reactjs.org/) app without creating a custom template, it’s not advised to try and mange parts of your view within this system.

## More
For more examples and documentation, [check it out on Github](https://github.com/colbyfayock/html-webpack-partials-plugin)!
https://github.com/colbyfayock/html-webpack-partials-plugin
