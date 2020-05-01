---
template: post
title: Set Future You Up for Success with Good Coding Habits
date: 2020-04-16T15:05:44.342Z
category: coding
---
Getting in the habit of being conscious of your coding decisions can make a difference not only as you build out your project, but also when you or your teammates try to revisit that project in the future. What kinds of things can we do to make it a little easier on our future self?

## Revisiting "prior art"

We've all been there. Six months into a project, you're trying to squash a bug, and what you find is shocking. You might be asking yourself, "who would write this kind of code?"

So you dig through your [git](https://git-scm.com/) commit history using `git log -p filename.js`  showing changes for a specific file, trying to see who would come up with something like that, and then your heart drops -- you're the one who wrote it!



<figure><img src="/assets/tituss-burgess-shocked.gif" alt="" /><figcaption>Tituss Burgess shocked</figcaption></figure>

This is a common scenario for any developer, experienced or new. If you haven't hit that scenario, I promise if you stick with coding long enough, you will.

## Becoming more conscious about our coding habits

That six month reflection point is inevitable. That's a lot of time which you've most likely been using to work on other parts of the project or another project completely. Chances are, you've leveled up which has changed the way you write code.

On the other hand, sometimes it takes stepping outside of the code to see the bigger picture and get a better look at how all the pieces fit together. We can naturally dig ourselves too deep into a solution and can become a little narrowly focused as we work to solve those challenges.

But either way, while part of the code journey will simply be gaining more experience and learning more about your craft, there are other small habits you can get used to early on that will help you down the road.

So let's jump in.

## Improving the readability of your code

### What is the challenge?

Part of the fun about our craft is there are a ton of ways you can do the same thing. Think an `if` statement is too many lines? Well we can write it [ternary](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) style!

```
// Example ternary statement
const isFreezing = temperature <= 32 ? true : false;
```

But sometimes this pays a toll on the readability of your code. While it might seem like it looks nice and super clean on one line, imagine as that ternary gets more complex, the more time someone will have to spend understanding what it means.

```
const minutes = 30;
const cookie = {
  color: 'black'
};

const cookieStatus = minutes > 20 ? cookie.color === 'black' ? 'burned' : 'done' : 'not done';
```

### What can we do better?

Now I would imagine most of us can figure out what `cookieStatus` is in this example (spoilers: `burned`), but think about the time you spent figuring it out. Whether an extra 1s or 2s, it forces you to spend additional cognitive energy to read through the code.

On the other hand:

```
const minutes = 30;
const cookie = {
  color: 'black'
};
let cookieStatus;

if ( minutes <= 20 ) {
  cookieStatus = 'not done';
} else if ( cookie.color === 'black' ) {
  cookieStatus = 'burned';
} else {
  cookieStatus = 'done';
}
```

No, it may not be as clean or clever as the 1-line ternary statement, but the next time you visit it, the less you'll have to think about what the answer is. It's also going to make it that much easier for bugs to creep up and get past your code reviewers when all of your code changes are in a 1-line git diff.

And yes, this is a simple example, but imagine this in a real world scenario with important business logic where you could run into these situations frequently.  Say you need to add another condition -- that ternary is just going to keep getting more complex! You're just making it more difficult to debug or extend, where the `if` statements can continue on in an easily readable way.

For what it's worth, ternaries and other shortcuts can be simple and effective in code, but don't abuse that effectiveness and end up making things more difficult.

## Keeping things consistent

### What is the challenge?

We all have our favorite way to code. Though I'd argue not including a semicolon at the end of your Javascript is just completely wrong, you might prefer to write your code ~~the wrong way~~ without them.

```
// Jim's code style

function MyComponent() {
  function handleOnClick() {
    alert('Click!')
  }
  return (
    <button onClick={handleOnClick}>My Button</button>
  )
}

// Creed's code style

const MyComponent = () => <button onClick={() => alert('Click!')}>My Button</button>;
```

But it's not always about what *you* prefer. When working with a team, chances are, everyone's opinion on how code should look is slightly different. You might agree about the semi-colon, but disagree about whitespace.

And no one is wrong (except for the non-semi-coloners)! There are valid arguments to most code styles, whether for or against, but the solution isn't for everyone to write their code their own way.

### What can we do better?

Keeping code consistent is important to maintain code health. A typical goal is to "make the codebase look like one person wrote it."

The point isn't that one person gets their way, it's that the team came to a conclusion about a set of rules they would use that everyone would follow. Having this consistency provides less cognitive overhead as people work through the code. It gives everyone the ability to know what to expect when reading the code.

<figure><img src="/assets/linting-code.jpg" alt="" /><figcaption>Errors from linting code</figcaption></figure>

And achieving this doesn't need to be hard. There are tools that can simply [check for these inconsistencies](https://www.colbyfayock.com/2019/10/what-is-linting-and-how-can-it-save-you-time) like [Eslint](https://eslint.org/) for Javascript. And even better, another level tools like [Prettier](https://prettier.io/) that [will fix it for you](https://www.colbyfayock.com/2019/11/dont-just-lint-your-code-fix-it-with-prettier)!

## Commenting your code

### What is the challenge?

Keeping up with commenting your code is an important way to put context to complex logic. As much as we all want our code to be self-documenting, that's rarely the case.

Too often we find ourselves dealing with a block of code that just doesn't make sense. And even if it makes sense on its own, we might not be able to figure out how it fits in to the rest of the application.

### What can we do better?

By providing a good set of comments, you're setting up the next person who touches that code to have a better understanding of what the code is doing before they make a change.

```
// DONT CHANGE - WILL STOP MAKING MONEY

const shouldMakeMoney = true;

function makeMoney() {
  if ( shouldMakeMoney ) {
    return noMoney;
  }
  return moreMoney;
}
```

While this is a silly example, it brings up a real world case. Businesses are increasingly dependent on being able to maintain a reliable website to make money. Whether this is as an ecommerce business or an ad giant, these websites rely on business logic that determine things like cost, taxes, discounts, and other math related things we tend to not want to think about, but could make or break a business on the internet.

But it's not all about the company you work for. Touching old code can be scary. It's even scarier when no one on your team was around when it was written, so no one knows what it does!

<figure><img src="/assets/patton-oswalt-hands-over-mouth.gif" alt="" /><figcaption>Patton Oswalt hands over mouth</figcaption></figure>

While you might not be the next person who touches that code, try to help out your future friend who's tackling the next ticket involving that code. Because there's also a good chance you will be that person and you'll wish you remembered how it worked.

## Documenting your solutions

### What is the challenge?

Documentation is similar to commenting your code, but from a different perspective. Documentation and commenting are both about finding ways to describe a solution in a human-readable way that will ultimately give more context. But documentation is more about the overall solution rather than the implementation details.

Having a high performing application is everyone's goal. But how did we get there? There's a realistic chance that someone will have to be working on the same project you are like onboarding a new team member. How will they be able to maintain that high performance if they don't know how it works?

### What can we do better?

Whether it's introducing that new team member to the project or trying to share knowledge with another project team, documentation is an important part of maintaining a project. It helps keep everyone on the same page so we all confidently know what we're working towards.

For example, if we're still working with our ecommerce project with our business logic, there will be rules that the code needs to implement. While commenting might give details inline about how the rules were implemented, the documentation would define those rules.

```
/**
 * DOCUMENTATION
 * Order Total >= 25: Discount %10
 * Order Total >= 50: Discount %15
 * Order Total >= 100: Discount %20
 * Order Total >= 75: Free Shipping
 */

const orderSubTotal = 84.00;
let orderTotal = orderSubTotal;

// If the order total is under 75, apply shipping discount

if ( orderTotal < 75 ) {
  orderTotal = addShipping(orderTotal);
}

// If the order total reaches a threshold, apply given discount

if ( orderTotal >= 100) {
  orderTotal = applyDiscount(orderTotal, .2);
} else if ( orderTotal >= 50 ) {
  orderTotal = applyDiscount(orderTotal, .15);
} else if ( orderTotal >= 25 ) {
  orderTotal = applyDiscount(orderTotal, .1);
}
```

This is a minimal example, but we can see the difference between the rules at the top and how we apply them. The documentation should clearly explain what the rules are, but it shouldn't care about how those rules were implemented.

On the other hand, the comments might not care about what the rules are, but need to implement them in an efficient and logical way. We should be able to update the code with the business rules, such as changing the top level discount tier from $100 to $80, without having to rework the code.

But documentation is much more than business rules -- it's providing a way for anyone to understand your work from a higher level. This could include anything from architectural diagrams to the theory behind your core algorithm.

While maybe code isn't the best place for details like this to live, it's really important information that can help instill confidence in your project and give others an opportunity to understand more about the work.

## Creating effective Pull Requests

### What is the challenge?

Pull requests (or merge requests) are a core part of any development team's project lifecycle. It provides a way to package and present your code in a consumable way for your peers to review and understand your work.

There's a lot that can go into a pull request from a single commit to the entirety of the next version of your website. That's a lot of context to expect someone to understand by reading through the commits alone.

### What can we do better?

Pull requests don't need to be an art. There should be one primary goal of the preparation you put into it -- providing context into your changes. At a minimum, it should answer the questions of "what" and "why".

We can even use tools like pull request templates to push us in the right direction. [Define an outline](https://www.freecodecamp.org/news/why-you-should-write-merge-requests-like-youre-posting-to-instagram-765e32a3ec9c/) of what you want explained and chances are, people will follow that outline. This helps avoid the 1-line "closes \[ticket]" description or even worse, an empty description.

With my projects, I hope to have a few questions answered before I dive into a code review:

* What is the change?
* What does it impact?
* How do I reproduce or test the change?

Just a little bit of details around the change set can provide much needed context for those reviewing your code. It's easy to look at code, but it's harder to understand it without knowing how it fits into the bigger picture.

## Hardening your code with tests

### What is the challenge?

Tests are a way to ensure your code runs the same way each time. Being able to prove that the same input will always have the same output will help provide you and your team with a higher level of confidence that your application won't come crashing down with the next small change.

Without them, we're left with human error, where no matter how good your QA Engineer is (shoutout to my testers out there), something will always slip through. And that's not to say your tests will always catch every problem, but we can use the tools available to help prevent it.

### What can we do better?

Where comments are a way of providing the context of how something works, test are a way to ensure they work. Providing test cases that are repeatable helps enforce that.

```
function applyDiscount(value, discount) {
  const discountAmount = value * discount;
  return value - discountAmount;
}

expect(applyDiscount(10, .1)).toEqual(.9);
expect(applyDiscount(532151235, .1054)).toEqual(476062494.831);
```

If I fudge the math on our `applyDiscount` function above, there's a high probability that the test would fail (never say never).

But testing doesn't need to be hard. There are many tools out there that help from different perspectives. Where you might use [Jest](https://jestjs.io/) to run your unit tests or add [Enzyme](https://enzymejs.github.io/enzyme/) on top to test your React components, you can also bring in [Cypress](https://www.cypress.io/) as an integration test solution that will work like a robot clicking through your application to make sure all the components actually work together.

There's also different methodologies of testing. While you probably see most teams write their tests after they have a working solution, some people swear by [test-driven development](https://en.wikipedia.org/wiki/Test-driven_development) and might write their tests first where the code has to pass the tests rather than the other way around. This is a great way to define the requirements of the code before diving right in.

Whatever the method, capture the points that are most likely to break or the functions that add the most business value. You'll be helping to prevent a potential business loss or even simpler, a headache.

## What can we learn from this?

That might be a lot to digest, but they're important points to consider as you grow as a developer. Starting these habits early in your career will help you naturally build these skills and work that way by default.

And if you're late in your career, it's never too late to start. We should all want to strive to be the best developer we can be and do our best to help make our teammate's lives easier, as we're all in this together.

## Looking for more to learn?

* [Put Down the Javascript - Learn HTML & CSS](https://www.colbyfayock.com/2019/08/put-down-the-javascript-learn-html-css)
* [How to Become a Full Stack Web Developer in 2020](https://www.colbyfayock.com/2020/02/how-to-become-a-full-stack-web-developer-in-2020)
* [What is the JAMstack and how do I get started?](https://www.colbyfayock.com/2020/02/what-is-the-jamstack-and-how-do-i-get-started)
* [What is linting and how can it save you time?](https://www.colbyfayock.com/2019/10/what-is-linting-and-how-can-it-save-you-time)
* [Why you should write merge requests like you're posting to Instagram](https://www.freecodecamp.org/news/why-you-should-write-merge-requests-like-youre-posting-to-instagram-765e32a3ec9c/)