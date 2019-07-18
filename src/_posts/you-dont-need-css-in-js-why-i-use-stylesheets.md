---
template: post
title: You Don't Need CSS-in-JS - Why I Use Stylesheets
date: 2019-07-18T13:23:58.193Z
category: coding
---
CSS-in-JS is all the rage. But is it really the best option?

## Solving problems you don't need to solve
Don't get me wrong, CSS-in-JS is a great solution, but it's for a problem most people don't have. Maintaining your components in a very siloed approach absolutely helps things like:

* Unintentional side effects of cascading styles
* Helping teams organize their rules
* Avoiding stepping on each other’s toes while developing

But those really only become problems with large teams with many developers and a vast library of components. 

## So what do you want me to use?
To start from a slightly higher point of view, you can get in the habit of a few basic ideas:

* Set and follow some basic rules for writing
* Use tooling or set standards for organization
* Developing with methodologies like [BEM](http://getbem.com/)

This will eliminate any of those concerns on a smaller project (or large) and can actually make life easier.

## What CSS-in-JS is good at...
**Helping large teams preserve sanity:** part of why this solution exists is because very large teams have a hard time avoiding conflicts when they have a huge library to deal with. Being able to have your component and anything that impacts it in one compartmentalized area helps people avoid stepping on each other's feet and potentially rolling out tweaks that unintentionally cascade throughout the app. This is great but more likely than not, you're 1 of a few (or alone) working on a small app. If you and you're team aren't communicating about some basic rules and standards, I'd argue you have bigger problems. 

**Kind of eliminates the need to learn CSS (kind of):** some developers mock CSS saying it's not real code, others are scared about it's magic (don't be, embrace it). Only having to worry about a few rules in one component helps put people's mind at ease knowing it's just a little more JS that changes how it looks a bit.

## What both do?
**Hot Module Reloading (HMR)**: Though some say an advantage to CSS-in-JS is HMR, you'll find this works fine with stylesheets. Sometimes it actually works a little nicer if you're working on a component that requires a rerender such as those with a network request as a dependency, where the CSS changes won't force that rerender.

**Variables, Global Settings**: If someone is making an argument that CSS can't do that, it's because they haven't been paying attention for a while. Not only does Sass provide this, [it's native to modern browsers](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

**Encapsulation**: Yes, you don't need JS to do this. Add a classname to the top level element of the component or page, nest all styles inside, and you have your encapsulation.

```
.page-about {
  .header {
    background-color: red;
  }
}

.navigation {
  .button {
    background-color: blue;
  }
}
```

**Linting**: [https://stylelint.io/](https://stylelint.io/)

## What stylesheets and SASS do better...
**Rule sharing and configuration:** SASS allows you to configure variables, custom functions, and mixins that take your CSS development to the next level.

Ingnoring the bad selector names:

```
// settings.scss

$color-ultraviolet: #5F4B8B;

// colbys-styles.scss

@import "settings";

.colbys-text-color {
  color: $color-ultraviolet
}

.colbys-background-color {
  background-color: $color-ultraviolet
}
```

While the syntax and configuration of this is arguably easier than setting up a bunch of object configurations in JS, this greatly allows you to provide consistent visual experiences and DRY up your code.

**Responsive design:** one of the many things that adds to the role of a good front end engineer is paying attention to how the project will look across multiple devices and sizes. Overall, UX is everyone's job. Developing with a responsive-first mindset not only makes that process easier, it helps build a better product.

Trying to make your components responsive in JS means more Javascript and more event listeners. Not only does this add complexity, it hits performance. We can do this much easier with media queries baked right into CSS.

```
.colbys-sidebar {
  width: 100%;
}

// NO EVENT LISTENERS

@media (min-width: 1024px) {
  .colbys-sidebar {
    width: 25%;
  }
}
```

Instead of having to throttle the event listeners, making sure your event listeners unregister on unmount, and just dealing with organizing that all in "the react way", media queries trigger on demand and will flip your styles as needed in a more consistent manner.

**Less complexity of your components:** being able to focus on the functionality and the rendered output allows you to avoid pulling in libraries or complex methods to essentially patch CSS into your JS, not to mention the JS hack or two or three that you're using to get it working in the first place.

```
// This is an exaggeration

const styles = {
  color: blue;
}

if ( whos_favorite === 'Colby' || whos_favorite === 'Lord Commander' ) {
  styles.color = 'ultraviolet';
} else if ( whos_favorite === 'The Gary' ) {
  styles.color = 'red';
} else if ( whos_favorite === 'Mooncake' ) {
  styles.color = 'green';
} else if ( whos_favorite === 'HUE' ) {
  styles.color = 'blue';
} else if ( whos_favorite === 'KVN' ) {
  styles.color = 'yellow';
}

<MyCompnent styles={styles} />

```

**Performance:** [Less Javascript is always a win](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4). It's less your browser has to load, less your browser has to compile, which will ultimately translates to quicker page speed. When the browser loads a page, it tries to optimize the HTML and CSS as much as possible. Yes, you probably are loading more CSS up front, but more JS is very costly and also is more likely to [force a full rerender](https://developers.google.com/web/fundamentals/performance/rendering/);

A lot of the little magic bits you do with Javascript can be done with some pretty powerful CSS animation methods, just browse Codepen a bit or check out something like [Animista](http://animista.net/).


I don't actually have any numbers on this, but you can see some of these results getting high depending on the library: https://github.com/A-gambit/CSS-IN-JS-Benchmarks/blob/master/RESULT.md

Has anyone done the legwork on this?

## At the end of the day, do what's effective
**Everyone has personal preference, everyone is productive in a different way.** Do what's best for you, do what's best for your team, and avoid treating what other developers say as dogmatic rights and wrongs.

If you're a lone developer on a project and want to practice CSS-in-JS to get used to it for when you're on a big team, go for it! If you're on a huge, huge team at Facebook and want to use stylesheets, well you might run into issues if everyone's not following the same guidelines, but do what's best for you and your team.

The only way you can figure that out is with experience and experimentation. Play with both solutions and figure out why YOU think one is better than the other. You never know where you’ll end up after landing that gig at Google or your new startup in your garage.
