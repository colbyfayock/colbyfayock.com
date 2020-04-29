---
template: post
title: Put Down the Javascript - Learn HTML & CSS
date: 2019-08-28T13:04:42.005Z
category: coding
---
A growing trend in front end development is the idea that you can dive right in to Javascript and succeed. Honestly, for better or worse you probably can, but you’re just building on top of a fragile foundation that will come back to bite you.

## Why do I need HTML or CSS?

The UI frameworks that we know today like [React](https://reactjs.org/) and [Vue](https://vuejs.org) build on top of the basic building blocks of a webpage: HTML and CSS. Though these UI frameworks supercharge these basics through some cool tools and Javascript, what you’re building is fundamentally the same thing as the [Space Jam website](https://www.spacejam.com/) from 1996.

But I get it, writing HTML and CSS manually is dated right?

## Understand what your tools are doing

Having at least a basic understanding of what’s going on under the hood will help you immensely as you develop and debug your applications.

You might have ran into a few odd things in the browser, such as why does HTML transform code in my browser? Using the following as an example:

```
<style>
p {
  color: purple;
}
</style>
<h1>My Cool Page</h1>
<p>
  Some cool stuff
  <div>Is this still cool?</div>
</p>
```

When you load this up in Chrome, you’ll notice some changes…

![Example of fixed HTML](/assets/image-on-2019-08-17-at-20-15-44.png)

Why isn’t all of my paragraph cool and purple?

Well, turns out your browser is a good guy and automatically fixes your code. A paragraph tag (`<p>`) [can not contain another block level element](https://www.w3.org/TR/html401/struct/text.html#h-9.3.1),  so Chrome and other browsers will adjust your HTML on the fly to make it valid. HTML is very lenient this way! But this is a common bug that stumps developers old and new who just aren’t familiar with how HTML works.

![Good Guy Browser](/assets/image-on-2019-08-17-at-20-19-34.png)

## Learn the magic of CSS

CSS can do a whole heck of a lot these days. It’s so much more than setting a few colors, but gives you the ability to provide consistent UI patterns throughout your application.

Don’t be afraid of it! If you started in Javascript, you might be tempted to do everything there, but you’ll quickly find managing all of the real power of CSS within your JS is a pain, and frankly, [unnecessary unless you’re Facebook](https://www.colbyfayock.com/2019/07/you-dont-need-css-in-js-why-i-use-stylesheets).

What can you do? Build [the Alien movie title scene](https://www.colbyfayock.com/2019/07/you-dont-need-css-in-js-why-i-use-stylesheets) with pure CSS. Grab some [hover effects for your buttons](https://ianlunn.github.io/Hover/). Or just [animate anything](https://daneden.github.io/animate.css/)!

A favorite of mine is creating a fancy Facebook-like loading animation class that will apply an animated gradient background to anything you add it to:

```
.loading {
  background: linear-gradient(90deg, #eff1f1 30%, #f7f8f8 50%, #eff1f1 70%);
  background-size: 400%;
  animation: loading 1.2s ease-in-out infinite;
}

@keyframes loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
```

![CSS loading animation](/assets/loading-animation.gif)

Crack open [a codepen](https://codepen.io/colbyfayock/pen/aKKoJP) and try it yourself!

## Make your search results relevant

Search engines do their best to figure out how the content you write is relevant to users searching for it, but how you write your HTML makes a difference with helping them determine that value. A common mistake I see is using [Heading](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) elements incorrectly or simply not using them at all.

```
<h1>All</h1>
<h1>My</h1>
<h1>Content</h1>
<h1>Is</h1>
<h1>Important</h1>
```

Consider the outline of this blog post:

```
- Put Down the Javascript - Learn HTML & CSS
  - Why do I need HTML or CSS?
  - Understand what Your tools are doing
  - Learn the magic of CSS
...
```

“Learn the magic of CSS” is not the key takeaway from the page, so I wouldn’t want to feature that as the most important. The title of the post however, “Put Down the Javascript - Learn HTML & CSS”, reflects the overall story, making it the most important, so I would want to make it #1.

So with my HTML, I would want to make it look something more like:

```
<h1>Put Down the Javascript - Learn HTML & CSS</h1>
<h2>Why do I need HTML or CSS?</h2>
<h2>Understand what Your tools are doing</h2>
<h2>Put Down the JS - Learn HTML & CSS/h2>
```

This lets Google, Bing, and all the other search engines know exactly what should be the most important part of the page and help identify the general hierarchy.

## Drive accessibility by inclusive development

By not coding responsibly, we automatically exclude people from accessing the site we work so hard to build. Often these people care about what’s getting built just as much if not more than you and I do. By doing a little homework the first time and spending an extra second thinking about what we’re writing, we can be inclusive to all friends visiting our sites.

Take a simple navigation list commonly seen in most websites today. You might be tempted to write out a few `div`s because they work right?

```
<div className="nav">
  <div><a href="#">Link 1</a></div>
  <div><a href="#">Link 2</a></div>
  <div><a href="#">Link 3</a></div>
</div>
```

The issue is, they’re not as easy for screen readers to pick up on. To fix this, you /technically/ can write even less HTML (`div` is 3 characters, `ul` and `li` are 2 🙄).

```
<ul className="nav">
  <li><a href="#">Link 1</a></li>
  <li><a href="#">Link 2</a></li>
  <li><a href="#">Link 3</a></li>
</ul>
```

Taking it a step further, if this is your navigation menu, wrap it in an [HTML 5 navigation element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) (`<nav>`) and [users will now be able to directly access the menu](https://www.w3.org/WAI/tutorials/menus/structure/#identify-menus).

Check out [The A11y Project](https://a11yproject.com) for more good tips on accessibility.

## Simplify your code, embrace native functionality

You would be surprised how much functionality [exists natively in modern browsers](https://dev.to/ananyaneogi/html-can-do-that-c0n), with more browser support than you probably need (sorry to those of you who still support IE9).

With some basic HTML, you can build a text input that has searchable, autocomplete-like text in a dropdown:

```
<label>My Favorite Color</label>
<input type="text" name="color" list="colors">
<datalist id="colors">
  <option value="Magenta">
  <option value="Purple">
  <option value="Ultraviolet">
</datalist>
```

![Favorite color picker example](/assets/screen-capture-on-2019-07-30-at-21-49-55.gif)

Taking advantage of CSS pseudo selectors, we can dynamically style a checkbox-type element depending on if it’s checked:

```
<style>
.is-checked {
	display: none;
}

#my-checkbox:checked + span .is-checked {
	display: inline;
}

#my-checkbox:checked + span .not-checked {
	display: none;
}
</style>

<label for="my-checkbox">
  <input id="my-checkbox" type="checkbox" />
  <span>
    <span class="not-checked">Not Checked</span>
    <span class="is-checked">Checked</span>
 	</span>
</label>
```

![Dynamic checkbox](/assets/screen-capture-on-2019-07-30-at-21-48-43.gif)

## This is Your Craft, Pay Attention to It

![Tweet from @markdalgleish](/assets/screen-shot-2019-08-28-at-09.11.40.png)

 <https://twitter.com/markdalgleish/status/1155430223963234304> 

I’d wager the majority of the people reading this are doing so because they care about their code and are super passionate about what they do. Just like any other craft that came before development, practicing and focusing on the fundamentals will strengthen your ability as a developer. Bonus, you’ll be getting an easy win by helping be more inclusive with your work and getting more people to your application!