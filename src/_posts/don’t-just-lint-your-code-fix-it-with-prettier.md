---
template: post
title: 'Don’t just lint your code, fix it with Prettier'
date: 2019-11-06T02:05:14.314Z
category: coding
---
Linting makes everyone’s lives easier by telling us what’s wrong with our code, but how can we avoid doing the actual work that goes into fixing it?

[Previously I wrote about linting](https://www.freecodecamp.org/news/what-is-linting-and-how-can-it-save-you-time/), what it is, and how it makes your life easier. At the end, I actually included a way that you could automatically fix your code, so why am I writing this?

## What do you mean fix it?

Before we roll into it, let’s hit this quick. Linters are powerful and provide an easy way to scan your code for syntax errors that could lead to bugs or can simply help keep a codebase clean, healthy, and consistent. When ran, it will show all the issues and let you go through each one individually to fix it.

Taking that to the next level, some linters will actually allow you to pass in an argument to the command running the linter and allow it to fix it for you automagically. This means you don’t have to manually go through and make all of those little whitespace and semicolon (add them! 🔥) tweaks yourself!

![Ron Swanson happy](/assets/ron-swanson-happy.gif)

## So what more can I do to fix things?

If you already use the fix option, thats a good start, but there are tools out there that have been developed specifically to tackle this problem beyond just a flag into your command. The one I’m going to cover is Prettier.

## What is Prettier?

[Prettier](https://prettier.io/) pegs itself as “an opinionated code formatter." It takes an input of your code and outputs it in a consistent format stripping any of the original code style. It actually converts your code to a [syntax tree](https://github.com/benjamn/recast), then rewrites it using the styles and rules you and Prettier provide together via your ESLint config and Prettier’s default rules.

You can easily use Prettier alone just to format your code, which works just fine, but combine this with an underlying ESLint process and you get both a powerful linter and a powerful fixer. I’m going to show you how to make those work together.

## Getting started

For this walkthrough, I’m going to assume that you have ESLint set up and configured in an application. Particularly, I’m going to pick up where I left off in my previous walkthrough where [we installed ESLint to a React application](https://www.freecodecamp.org/news/what-is-linting-and-how-can-it-save-you-time/).

Additionally of note, Prettier tells us right from the start, it's an opinionated code formatter. You should expect that it will format your code in  a consistent, but maybe different way, than you currently have it configured to. But don’t fret! You can tweak this configuration.

So what are we starting off with? We already:

* Have installed [ESLint](https://github.com/eslint/eslint)
* Have added [Babel](https://github.com/babel/babel-eslint) as our parser
* Added a [plugin](https://github.com/yannickcr/eslint-plugin-react) that includes React configurations

Next, let’s get started by installing a few packages:

```
yarn add prettier prettier-eslint prettier-eslint-cli -D
```

_Note: the command above is similar to using `npm`. If your project doesn't use `yarn`, swap out to `npm` as appropriate._

Above, we’re installing:

* [prettier](https://github.com/prettier/prettier): core Prettier package and engine
* [prettier-lint](https://github.com/prettier/prettier-eslint): passes the Prettier result to ESLint to fix using your ESLint config
* [prettier-eslint-cli](https://github.com/prettier/prettier-eslint-cli): helps Prettier and ESLint work together on various files across your project
  And we’re installing them as a dev dependency, as we don’t need it outside development.

## Configuring your new formatter

Now that our packages are installed, we can set up `yarn` to run this command for us.

Previously, we set up a `lint` script to look like this in our `package.json`:

```
“scripts”: {
  …
  “lint”: “eslint . —ext .js”,
  …
}
```

We’re going to leave that as it is, but we’ll do something similar and create a new script right next to it called `format` for our formatter Prettier:

```
“scripts”: {
  …
  “format”: “prettier-eslint —eslint-config-path ./.eslintrc.js --write '**/*.js’”,
  “lint”: “eslint . —ext .js”,
  …
}
```

So what’s going on there? We’re:

* Adding a new script called `format`, that we can run as `yarn format`
* We’re utilizing our `prettier-eslint-cli` package to run the formatting for us
* We’re passing in our ESLint config located next to our `package.json` in the root of the project (change this if it’s in a different location)
* And finally, we’re telling prettier to write all files matching `**/*.js`, or any JS files it finds recursively through our project

## Run your formatter!

Now that we’re all set up, let’s run it! Run this following:

```
yarn format
```

and immediately, we see that it works:

![Successful run of Prettier](/assets/prettier-command-line-success.png)

## Hey, my code looks different!

![Pitchforks for an angry mob](/assets/spongebob-pitchforks.gif)

As I mentioned earlier, Prettier tells us straight up, it’s an opinionated formatter. It ships with it’s own rules, sort of like it’s own ESLint config, so it will go through and make those changes as well.

Don’t abandon your code! Instead, you can review the changes, see if maybe it makes sense to keep it that way (it will be very consistent) or you can update your ESLint config (`.eslintrc.js`) to overwrite the rules you don’t like. This is also a good way to maybe learn some new things that you might not have expected to get caught before.

## So where does this leave us?

If you’ve followed along so far, we now have two commands:

* `lint`: which will check your code for you and tell you what's wrong
* `format`: will automatically try to fix the problems for you

When using these in practice, your best bet is to always run `format` first to let it try to automatically fix anything it can, then immediate run `lint`, to catch anything Prettier wasn’t able to fix automatically.

## What’s next?

Now that we can format our code automatically, we should be able to automatically fix our code automatically!

![Eddie from Fresh of the Boat's mind blown](/assets/fresh-off-the-boat-mind-blown.gif)

Next time we’ll take this a step further and set up a `git` hook that will allow this to run before you commit, making you not have to ever worry about forgetting to run this again!
