Part 2: HTML

# Part description

In this part, we will dive into HTML - the very foundation of the web. You will learn the purpose and structure of an HTML file, explore common HTML tags and elements, and understand accessibility best practices. Finally, we will touch on forms, media elements, and learn how to inspect and modify HTML structure using browser developer tools.

The HTML and CSS parts in this sprint might seem a bit overwhelming. Don't worry if you don't understand everything right away. The goal is to get a general understanding of the concepts and to learn how to use resources like references and documentation pages effectively. You will have plenty of opportunities to practice and solidify your knowledge in the following parts (hands-on task and the coding exercise).

Let's kick off with an introduction to HTML.

# Key learning topics & resources for this part

## Introduction to HTML (1.5 hours)

Begin by watching the **[CS50 Week 8 video (52:10 - 1:42:48)](https://cs50.harvard.edu/x/2023/weeks/8/)** and try setting up an `http-server` on your own VS Code workspace. If that's not possible, you can use an [HTML playground](https://jsbin.com/?html,output) to get started.

## HTML tags and elements (2 hours)

Now that you have a basic understanding of an HTML file's structure, you can explore more tags. Some commonly-used HTML tags include:

- Division: `<div>` and `<span>`
- Headings: `<h1>` to `<h6>`
- Paragraphs: `<p>`
- Links: `<a href="...">`
- Lists: `<ul>` (unordered list), `<ol>` (ordered list), `<li>` (list item)
- Images: `<img src="..." alt="...">`

Watch the [CS50 HTML Short](https://cs50.harvard.edu/x/2023/shorts/html/). This video uses a different coding environment, so when implementing the examples mentioned, remember to use the `http-server` setup that was covered in the CS50 Week 8 video. Follow along and be sure to type out the HTML source code displayed in the video.

Remember, you don't need to memorize these tags; instead, familiarize yourself with the resources where you can find information on the various tags and their usage. Keep the [HTML Tags reference](https://www.w3schools.com/html/html_intro.asp) as an additional tab in your browser when working with HTML.

## HTML examples (1 hour)

Next, skim through the [HTML examples](https://www.w3schools.com/html/html_examples.asp).

## Working with HTML Forms (1 hour)

- [HTML Forms (W3 Schools)](https://www.w3schools.com/html/html_forms.asp)
- [Learn HTML Forms](https://www.youtube.com/watch?v=fNcJuPIZ2WE)

Follow along with the video and build an HTML file with various `form` elements.

## Meta tags (0.5 hour)

- [Meta tags (video)](https://www.youtube.com/watch?v=pJRP1G5bsUE)
- [Meta tags for Social Media](https://css-tricks.com/essential-meta-tags-social-media/)

Apart from the tags discussed in the video, there are numerous additional tags that inform social media sites, search engines, and devices about your site. For instance, you can use meta tags to suggest how your page should appear in Google results or when shared on platforms like Facebook, Twitter, and LinkedIn. These often use prefixes such as `og:` (Open Graph) or `twitter:`.

## Accessibility best practices (0.5 hour)

Web development encompasses making your content usable and comprehensible to everyone, including those with disabilities and limited devices. Adhere to these best practices when creating web pages:

1. Instead of always relying on `<div>` for structure, use elements that provide a clear structure, such as `<header>`, `<nav>`, `<main>`, `<aside>`, and `<footer>`. This helps machines to better understand the page. These are examples of **semantic elements** - tags that provide some context about its content.
2. Supply alt text for images using the `alt` attribute, which is read by screen readers and displayed if the image fails to load.

To learn more, explore the [Accessibility overview](https://developer.mozilla.org/en-US/docs/Web/Accessibility) and [WAI-ARIA basics](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics). You don't need to use these practices right now, but you should be aware of them, so when you start working on publicly available websites, you'll know that there are ways to improve accessibility.

## Inspecting page structure with Dev Tools (0.5 hour)

- [How to inspect HTML with Chrome DevTools](https://www.youtube.com/watch?v=TUpsyv9A9vU)

You're already acquainted with Developer Tools, but now that you know more about HTML, try inspecting the HTML content of your favorite websites to see how certain features are implemented. Explore these capabilities:

1. Inspect the HTML structure of the page.
2. Use the element picker to select an element on the page and examine its code.
3. Modify, add, or delete the content or attributes of an HTML element and watch the real-time changes.

Keep in mind that inspecting sites may not always reveal best practices or ideal code structure, as most sites today serve dynamically generated HTML code.

## Exercises (1 hour)

To become proficient with HTML tags and attributes, you'll need to put them into practice. Although it's crucial to have a strong foundation in HTML, you don't have to memorize everything. Learning to use resources like W3 Schools or MDN HTML documentation effectively is an essential skill for every web developer.

To practice HTML, spend ~1 hour on the first exercises from the [HTML Exercises (W3 Schools)](https://www.w3schools.com/html/exercise.asp). Try to complete around 10 exercises or as many as you can complete in an hour. Skip the exercises related to CSS (the `"style"` attribute and `.css` file links) and JavaScript. Focus on learning HTML tags and attributes.

Don't worry if you can't write all the answers yourself - use [a HTML reference](https://www.w3schools.com/html/html_intro.asp) to look up new tags that you've not yet seen in the video lecture.

By working through these exercises, you'll solidify your understanding of HTML while also learning how to reference and navigate essential resources when you need to look up or clarify information about a tag or attribute.

## New HTML features and browser compatibility

The frontier of new web features and their support is constantly moving forward. But web, unlike a programming language or a versioned piece of software, relies on the web browsers to implement new features. This means that the support for new features is not always consistent across browsers. For example, a new feature may be supported in Chrome, but not in Firefox, or vice versa.

95% of the time you don't have to worry about it as we will not rely on using the latest cutting-edge HTML/CSS features. But, as you become more familiar with HTML, you may want to explore new features that are not yet widely supported.

In the future, before using any feature in live project (called "production environment"), it's wise to consult the ["Can I Use"](https://caniuse.com) website to check the support for each feature. For example, a new, highly supported feature is the "Dialog element". Enter it into the "Can I Use" search bar to see the support for this feature.

## A new email from your project manager (2 hours)

```
From: Owen Overbudget, Project Manager
To: You
Subject: Re: Site redesign
---
Hey,

how's my favorite rockstar developer doing?

About that site redesign... designers still need a few days to finish
up the design for the new landing page.

But I have some good news! You can start working on the HTML form for
booking a trip right away. 😎

I've attached a screenshot of the design for the form and an HTML
template I've ripped from our competitors. Could you build the form
on top of it?

I'll send you more details later this week.

Catch you later,
Owen Overbudget
```

![Form design](https://imgur.com/A7yaotL.png)

```html
<form>
  <div>
    <!-- label -->
    <!--
      destination select:
      "Select destination, Paris, Tokyo, Sydney, San Francisco"
    -->
  </div>
  <div>
    <!-- label -->
    <!-- from date -->
  </div>
  <div>
    <!-- label -->
    <!-- to date -->
  </div>
  <div>
    <!-- label -->
    <!-- guests -->
  </div>
  <div>
    <button type="submit">
      -&gt;
    </button>
  </div>
</form>
```

Create a new HTML file and implement the form fields displayed in the provided design. Don't worry about the design for now, just focus on the HTML structure. You can use input with `type="date"` for the date fields.

# Directions for further research (1 hour+):

- Is there a difference between `<input>` and `<input />`?
- How do you embed video and audio in HTML?
- If you're unsure whether your HTML is valid, how can you check?
- You see 3 links in the HTML source code: 'https://mysite.com/file.pdf', './file.pdf', and '/file.pdf'; what's the difference?
- If you want to embed one website inside another, what HTML tag could you use?
