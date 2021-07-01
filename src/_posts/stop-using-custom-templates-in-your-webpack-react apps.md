---
template: post
title: "Stop using custom templates in your Webpack React apps"
date: 2018-07-09T00:00:00.674Z
category: coding
---
Google "webpack react" and you'll notice the top result guides all have one thing in common: they create custom HTML templates for their React applications.

See, React apps need a root node that serves as a mounting point when rendering to the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction), so most times you'll simply see a `<div>` with an ID of `root` inside a basic HTML page with not much else in the file.

```
// main.js
ReactDOM.render(<h1>Hai!</h1>, document.getElementById('root'));
```
```
// index.html
...nothing unique...
<div id="root"></div>
...nothing unique...
```

## Why is that bad?

Well, bad is a strong word… Creating that template might seem necessary to get the app started, but while doing that, you're overwriting some of the default functionality [HTML Webpack Plugin provides](https://github.com/jantimon/html-webpack-plugin), such as setting up essential meta tags like `charset` without needing to maintain them yourself and generating the application HTML on the fly.

## There's a better way!

[Partials for HTML Webpack Plugin](https://github.com/colbyfayock/html-webpack-partials-plugin) is an extension for HTML Webpack Plugin that provides HTML partial support out of the box. Simply set up your HTML file with only the snippet you need, toss the path in your Webpack configuration, and you're done!

Less of:

```
// index.html
...cookiecutter...
<script async src="...googletagmanager.com/gtag/js..."></script>
...cookiecutter...
<div id="root"></div>
...cookiecutter...
```
And more of:
```
// partials/body.html
<div id="root"></div>
```
```
// partials/analytics.html
<script async src="...googletagmanager.com/gtag/js..."></script>
```
```
// path/to/output.html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script async src="...googletagmanager.com/gtag/js..."></script>
<title>Webpack App</title>
</head>
<body>
<div id="root"></div><script type="text/javascript" src="main.js"></script></body>
</html>
```

This removes the need to create your standard `index.html` and let's Webpack do all of the work for you now and in the future.

## How does one add these partials?

This assumes you already have a basic React app set up. For more info on getting a React Webpack app spun up from scratch, try one of those [top results on Google](https://www.google.com/search?q=react+webpack).

Let's get to it! We'll start by adding our dependency:
```
yarn add html-webpack-partials-plugin -D
or
npm add html-webpack-partials-plugin --save-dev
```
Create your partial:
```
// path/to/partials/body.html
<div id="root"></div>
```
Require your newly installed dependency at the top of your Webpack config:
```
// webpack.config.js
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
```
Add the partial config anywhere after HTML Webpack Plugin in the plugins list:
```
// webpack.config.js
new HtmlWebpackPlugin(),
new HtmlWebpackPartialsPlugin({
path: './path/to/partials/body.html'
})
```
If you have an HTML file already set up in your configuration, nows the time to remove it. For now, just comment it out so we can easily reference it later.
```
// webpack.config.js
plugins: [
..
new HtmlWebPackPlugin({
// template: "./path/to/index.html",
// filename: "index.html"
}),
...
]
```
Assuming you don't have anything else critical in your index.html file, you should now be able to run your Webpack build script and you're done!
## What about the other stuff in my template?
You're in luck, you can set up as many partials as you'd like to manage the rest of the code.
Let's say you have an analytics script that you critically need to add directly to the page:
```
// path/to/index.html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-XXXXXXXX-X', 'auto');
ga('send', 'pageview');
</script>
<title>My Awesome App</title>
</head>
<body>
<div id="root"></div>
</body>
</html>
```
First, create a partial, similar to the React root file we created:
```
// /path/to/partials/analytics.html
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-XXXXXXXX-X', 'auto');
ga('send', 'pageview');
</script>
```
Set it up in your config:
```
// webpack.config.js
new HtmlWebpackPartialsPlugin([
{
path: './path/to/partials/body.html'
},
{
path: './path/to/partials/analytics.html',
priority: 'high',
location: 'head'
}
)
```

Run your Webpack build script and you're done!

Notice we updated the single object to an array of objects. Both ways will work.

## And the rest of index.html…

Any of the other HTML snippets in your custom template, you can follow the same pattern as the above. Once you're all done and feel confident you have all of the critical elements migrated, you can remove that file and take out those 2 commented lines out of your Webpack config.

**If you're not confident, make a backup!** Don't make an assumption and lose your work.

## Find some examples more useful?

For more examples of working code and basic setup guides, check out the [Partials for HTML Webpack Plugin Github page](https://github.com/colbyfayock/html-webpack-partials-plugin).
