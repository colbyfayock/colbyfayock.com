---
template: post
title: "Lessons Learned: Building My First Ebook 50 Projects for React & the
  Static Web"
date: 2020-10-03T16:41:21.803Z
category: coding
---
The process of writing an ebook provided a lot of value in helping me grow as both a developer and content creator. It’s helped me understand how I can more effectively educate others and reflect on things I already know.

While I’ve ultimately now published a second ebook ([Jamstack Handbook](https://jamstackhandbook.com/)), this post will focus on the my first ebook, [50 Projects for React and the Static Web](https://50reactprojects.com/).

## Playing with the idea of writing a book

Writing a book is an idea that I’ve always played with in my head. I’ve always imagined how cool it would be to be able to call myself an author with a published book for others to read.

While it’s arguable that having “author” next to your name provides a tremendous amount of value for your professional career, it’s something anyone can feel proud of as a personal accomplishment, as writing an ebook is a large undertaking, and as you write, you’re doubling down reinforcing the things you know.

[Manning Publishing](https://www.manning.com/) reached out to me to see if I wanted to put together a proposal for a Jamstack book, and while I gave a proposal a shot, I was ultimately beat to getting one approved, so that didn’t end up working out.

But this didn’t deter me, it actually motivated me a bit more.

The proposal process that Manning asks you to go through, particularly a template that’s required to be filled out, helped me understand everything that went into writing a book. What specifically should the reader walk away with? Who is your target audience? What should they already know?

While I didn’t immediately go off and write a Jamstack book ([well I eventually did](https://jamstackhandbook.com/)), I now felt like writing a book was something I could do should I find the motivation and idea.

## 50 Projects for React & the Static Web

[50 Projects for React & the Static Web](http://50reactprojects.com/) is a free ebook including 50 project ideas complete with project briefs, layout ideas, and resources to get you started “learning by doing”.

50 React Projects was an idea that grew from seeing a variety of courses that offered step-by-step walkthroughs through building different apps.

Particularly, I saw [Chris on Code](https://twitter.com/chrisoncode) put out a new set of courses called [Make React Apps](https://makereactapps.com/) that included 20 awesome walkthroughs. This is super valuable and can help anyone learn new concepts straight from a pro.

But my 50 React Projects came from the thinking that what if instead of giving the answers, I can give the idea with some requirements like you might see in the real-world from a client, even a layout idea for those who might not want to think about design, and let people figure out the solution themselves? Even include some tutorials and resources just in case they get stuck.

## Putting the idea in motion in Bear

As soon as I started thinking about this, I got heads down in trying to develop and flesh out the idea.

Like most writing, I started writing in [Bear](https://bear.app/), where it allowed me to start putting together outlines both of what kinds of projects I wanted to include and what I wanted to include for each project.

<figure><img src="/assets/bear-notes-50-react-projects.jpg" alt="" /><figcaption>Notes for 50 React Projects in Bear</figcaption></figure>

This allowed me to stay sane with figuring out what the flow should look like with each project, what the categories would look like and the ordering, as well as generally take notes so I didn’t forget to do things.

But personally, I get excited about seeing the design of things. Content is king, but I like to be motivated by seeing things work out as I build it.

## Jumping early into design with Figma

So after I created a few written projects, I jumped into Figma and started designing what I wanted this ebook to look like. This included early ideas for a cover and starting to play with what the page looked like. 

I was very quickly able to figure out some issues and spark additional ideas for how I wanted things laid out, including what content I wanted to include

I also learned a lot about what Figma is good at and what it’s not good at.

## What makes Figma great for ebooks?

[Figma](https://figma.com/) is stellar for all things design (except photo editing, which it’s not meant to be for). I was able to easily get my design elements moving, as I only used text and vector shapes to design the layouts.

One thing that made this easier was learning to take full advantage of [Components](https://www.figma.com/blog/components-in-figma/) and text styles. I already knew these concepts from Sketch and web development, so I created some to start, but I quickly learned that pretty much everything should be a component or text style, because you don’t want to be stuck with updating 100 individual pages to tweak the design.

Which leads me to some of the pain points of using Figma to create an ebook.

## What is challenging with ebooks in Figma?

Figma is not meant for ebooks, at least the type that are strongly dependent on copy.

While I still think that my use case made sense using Figma, it was a struggle trying to set up simpler things like managing copy that flowed between pages and the page numbers typical of any ebook.

Figma doesn’t support either of those things. This meant that any time I updated copy, I had to move things around and make sure the copy flowed elegantly from one page to another.

It also meant that any time I created pages or moved things around, I had to manually update the page numbers. Luckily though, while it’s a bit time consuming, creating the page footer including the page number, made it easy to adjust each one without having to recreate them each time.

## Early feedback and prototyping

Once I had some of the core pages and a few projects done, I was able to export my project from Figma to share around and get feedback.

I’m thankful to have made some friends in the community like [Alex Trost](https://twitter.com/trostcodes) and [Arlene Andrews](https://twitter.com/ArleneAndrews_1) that support my work and also believed in this project. They provided some very valuable feedback in helping me craft this to be something stronger.

But this early feedback not only helped me see some blind spots, it helped me validate that this project could be helpful for others. I’m pretty confident that Alex would have told me to put this thing down in the nicest way possible if it wasn’t the [prized horse](https://frontend.horse/) it was.

And this helped motivate me to keep moving on the project. The list of projects quickly grew. I had markdown template for each project (Bear uses markdown) that I could copy and paste and write each project up.

But while Bear is my favorite tool for writing blog posts, I quickly realized it was becoming a bit overwhelming with the amount of content.

## Actually writing the ebook inside of Figma

While I could have probably split this up into multiple pages inside Bear, it just became increasingly complex to organize the content and get a good birds eye view over everything I had.

One of the nice things about Figma, is at any point in time, I can simply zoom up and see everything I have done.

<figure><img src="/assets/50-react-projects-overview.jpg" alt="" /><figcaption>Overview of 50 React Projects</figcaption></figure>

This made it easy for me to fully lay out where I was at and the progress I had.

The issue with this is that I was indeed actually writing this thing in Figma.

But that’s not as bad as it sounds. When creating a text block, you’re given more or less the same writing experience as you would have anywhere else, just without all the bells and whistles. In my particular use case, I wasn’t using text flowing from page to page, so each page was static in nature, making this less complicated to do.

This helped avoid having to copy and paste everything into Figma from Bear any time I wanted to update something or add a new project. It helped me keep changes in sync and it helped me visually piece each project together with the full context of the project. 

<figure><img src="/assets/editing-text-in-figma.jpg" alt="" /><figcaption>Editing text in Figma</figcaption></figure>

Probably the only thing that was a big pain was spell checking. There’s a plugin that exists called [SPELLL](https://www.figma.com/community/plugin/754026612866636376) that worked decently well for it, but it wasn’t as great of an experience as you might find in an actual writing tool.

## Turning a Figma project into an ebook

You can export Figma projects in a few different ways. You can export as image files or PDFs which I used.

To export an entire project though, like an ebook, Figma also has the ability inside of the menu under File to Export Frames to PDFs.

<figure><img src="/assets/exporting-frames-as-pdf-figma.jpg" alt="" /><figcaption>Exporting frames as PDF in Figma</figcaption></figure>

This allowed me to avoid figuring out some hacky solution or try to export each individually, which would have been a nightmare.

But there’s a caveat to that, Figma exports frames in a particular order.

This is important to consider early on when exporting your frames. Depending on how you organize them, they may be completely out of order.

It seems that Figma orders them from left to right, then down, similar to how a book might actually read. This lead me to organize my projects with a single row for each category moving from left to right for each project.

## Discovering you just made an ebomb

I’ve known for a little while now what [ebombs](https://stackingthebricks.com/the-ebomb-recipe-that-works/) were, they’re essentially a piece of educational content that provides a lot of value to someone. Ideally, those ebombs are something that is highly sharable that a lot of people want.

As a content creator wanting to build an audience, I always wanted to come up with a cool ebomb to help grow while helping people learn. This specific project idea didn’t come directly from wanted to create one, it was very quickly obvious it would provide a lot of value as an ebomb.

But realizing the potential, I was able to figure out how I could both leverage it as a way for people to find out who I was to build an audience all while providing value able to help people learn.

## Delivering an ebomb

Given this project was free, I didn’t feel that I was ready to invest money into a solution that would help me deliver it.

I started off by testing the waters with Gumroad. This allowed me to set up my first product for free for people to download.

The first issue with Gumroad though, was that I wasn’t able to easily capture those downloads into my audience that I was trying to build in [Convertkit](https://app.convertkit.com/referrals/l/36ce3fce-f231-48b5-b878-e622d0265c3f).

For this, I was able to resolve the issue with [Zapier](https://zapier.com/). Zapier is an awesome tool that lets you automate the web, where I was able to take purchases from Gumroad and import them directly into Convertkit automatically.

The only issue with that solution, that I quickly realized when sending out my first preview of the ebook, is Zapier only allows you to run 100 tasks per month. This could be more than enough if you’re doing a few simple things, but fortunately my preview had some success, and I quickly exceed that, so anyone above that, I was missing out on.

This lead me to figuring out a Convertkit only solution. Convertkit allows you to create unique forms where you can deliver unique confirmation emails along with it.

One of the options for the unique confirmation email, was that I could provide a piece of content to download. So I set up a form so that when someone signed up with a form, they were emailed their confirmation email, which included a link to download the PDF.

This let me end up with a free solution for delivering my ebook to anyone who signed up for it.

## Launching 50 Projects for React & the Static Web

After getting feedback, launching a preview, getting a landing page set up, and having my delivery system set up, launch day finally came.

I didn’t have high expectations. I don’t have a huge audience, and even less at that time.

I got 1,671 downloads and ultimately new people into my audience on day 1 of launching my book. I was flabbergasted.

<figure><img src="/assets/converkit-subscriber-growth.jpg" alt="" /><figcaption>Subscriber / audience growth in Converkit</figcaption></figure>

The success ultimately came from Twitter. Again, I don’t have a large audience, but as soon as [I posted the tweet](https://twitter.com/colbyfayock/status/1293527859110252544), people came out in masses to help support me. Friends and people I look up to in the community retweeted my post to all of their followers, and those people retweeted it to their followers.

The tweet ultimately got over 650 retweets, and over 1,300 likes. For me, thats huge! That’s way more than any other tweet I’ve ever had.

I also [posted my ebook to Product Hunt](https://www.producthunt.com/posts/50-projects-for-react-the-static-web). It got a little bit of love, and some downloads, but ultimately didn’t contribute as much as Twitter traffic.

While I was extremely happy with how many people downloaded my ebook, my free solution for delivering my ebook ended up not being so free.

## The cost of a successful ebomb

Like I mentioned before, I didn’t have high expectations for how many people would download my ebook. I would have been super happy with 100.

Having a few hundred subscribers in a Convertkit audience places you squarely inside of their free tier.

![Converkit Free Tier](/assets/converkit-free-tier.jpg)

That would mean I could still send some newsletters every week ([like I still do](https://colbyfayock.com/newsletter)), contribute free educational content, and get by without spending any money, only my time

But the success of the ebook quickly launched me outside of that free tier window. Just after that first day, I hit the 1,000 subscriber threshold and immediately got stuck with a $29 per month bill. 

After the first week, I hit the next threshold of 3,000 subscribers, which jumped me up to $49 per month. That’s $588 per year if you don’t pay yearly!

While it sounds like I’m complaining about a successful launch, it’s just a cost that I didn’t expect. It’s part of why I created a [GitHub Sponsor profile](https://github.com/sponsors/colbyfayock), to help offset the cost of the content I’m delivering.

I’m incredibly grateful for the success it has had and the value it’s been able to provide for others on their learning journey. But now that I had built an audience, I needed to do something with it.

## Moving forward with a new audience

I had already been working on a course when my ebook launched. [Building Maps with React Leaflet on egghead.io](https://egghead.io/courses/build-maps-with-react-leaflet?af=atzgap) was my first course and I was super happy to work with the [egghead.io](https://egghead.io?af=atzgap) team on it.

Because egghead pays earnings depending on the amount of people who watch the content of a course, it was an opportunity for me to share something that could again, help offset the costs of my content creation.

http://d.fay.io/nFD9sQ

This was my first time I was sending something outside of my regular email to my new audience. I was nervous. What if they mass unsubscribed?

But ultimately it was a success. Some people did unsubscribe, 20 to be precise. While I don’t know how much I can actually attribute my newsletter to driving traffic, but that helped drive people to learn how to build a map and offset some of the costs of the Convertkit subscription.

## Finding the next project

At that point, I felt pretty good about the work I did. People were happy with how 50 React Projects turned out, felt like they were able to learn, and people enjoyed my course.

But what was next?

[Joe Previte](https://twitter.com/jsjoeio) announced he was starting a two week product challenge.  I mentioned before I already had a Jamstack proposal and I was already looking for a new project. That lead me to [take on that challenge](https://twitter.com/jsjoeio/status/1302727803771650048) and build a new ebook in two weeks.

I’ll talk more about how I built [Jamstack Handbook](https://jamstackhandbook.com/) and what I learned through the process of my second ebook next time.