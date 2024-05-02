Part 3: CSS

# Part description

In this part, we will learn about CSS, the powerful styling language that makes the web look beautiful. Topics covered include basic CSS syntax, selectors, specificity, layout techniques, responsive design, and style frameworks. Additionally, we will explore CSS preprocessors, variables, and upcoming features. This guide will provide you with all the necessary resources, exercises, and tips to excel in implementing CSS on your web projects.

# Key learning topics & resources for this part

## CSS example

Before diving deep into CSS concepts, we’ll start with a code example. The following code snippet demonstrates some commonly used CSS properties that style common HTML elements. Look through the code and try to intuitively guess what each line would do? By the end of this part, you should be able to understand this code example.

```css
body {
  color: #333;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
  padding: 0;
}

h1, h2, h3 {
  color: #444;
  font-weight: bold;
  margin-bottom: 10px;
  padding-bottom: 10px;
}

a {
  color: blue;
  text-decoration: none;
}

a:hover {
  color: purple;
  text-decoration: underline;
}
```

## Syntax, Classes, Pseudo-Classes, and Properties (2 hours)

Open up your coding environment and follow along the **[CS50W Week 0 video](https://cs50.harvard.edu/web/2020/weeks/0/)** from **37:14 to 1:25:06**. You should have at least one HTML file from the HTML part. Follow along what's presented in the video and try to:

- add styles to your HTML file
- move the styles to a separate CSS file and link it in the HTML file
- try adding more styles - `background`, `font-size`, `color`, `margin`, `padding`.

## CSS selector game (1.5 hours)

CSS code works by targeting specific HTML elements and then apply various properties (styles) to them. First, we'll learn how to target the HTML elements we want.

The first game you should try to ace is **[CSS Diner](https://flukeout.github.io/)**. It will teach you how to select various types of HTML elements with CSS selectors.

## CSS Properties Reference (0.5 hour)

Now, that you know how CSS selects the right HTML elements, we'll focus on applying appropriate style to these elements.

Open up the [W3Schools CSS Reference](https://www.w3schools.com/cssref/index.php). You will see a lot of new CSS properties. But don't worry, you won't need to memorize them. You will need to use this reference for upcoming tasks and exercises.

Search for the following properties on the page and check a few examples in their pages:
- `background`
- `display`
- `font-family`
- `padding`
- `margin`

## Responsive Design, Media Queries and Mobile-first design (1 hour)

As the web continues to be accessed on various devices, it's essential to create web pages that look good on all screen sizes. Media queries help achieve this goal.

Follow along the **[CS50W Week 0 video](https://cs50.harvard.edu/web/2020/weeks/0/)** from **1:25:06 to 1:30:54**.

Watch this 5-minute tutorial how to preview your web page on different devices using Chrome DevTools: [Simulate mobile devices in Chrome with Device Mode](https://www.youtube.com/watch?v=f7kokNyRe7U).

Open up [a page on Wikipedia](https://en.wikipedia.org/wiki/Web_design), use the element inspection tool to select the sidebar and then observe how its `Styles` section on the right side of the screen change once you reduce the device resolution to a mobile device size.

It's important to note that as more and more web traffic comes from smaller devices, the web design has shifted towards **Mobile First Design**. That means designing User Interfaces for mobile devices first and then adapting the mobile design for larger devices instead of trying to cram desktop viewport onto a mobile screen.

As a general rule of thumb, design for a mobile view and then use media queries to indicate design changes as the device resolution grows by using `min-width` media queries (or a more modern `width >= ...` condition).

## Layout Techniques: Flexbox and Grid (1.5 hours)

In this section, we will investigate modern CSS techniques for creating flexible and responsive layouts using CSS Flexbox and Grid. Flexbox and Grid are key to modern website layouts. It's important to get a grasp of these techniques. You will need to use them in your hands-on exercise.

Follow along the **[CS50W Week 0 video](https://cs50.harvard.edu/web/2020/weeks/0/)** from **1:30:54 to 1:38:20** (yes, ~8 minutes). Then, watch the following videos to get a better understanding of each:
- [Learn Flexbox](https://www.youtube.com/watch?v=fYq5PXgSsbE)
- [Learn Grid](https://www.youtube.com/watch?v=9zBsdzdE4sM)

Don't try to memorize all the properties. Try to get a grasp of what's possible with these techniques and how they differ from each other.

## Layout Techniques Practice: Flexbox and Grid (3 hours)

For the next couple of hours, play the following interactive games to learn how to move elements with flexbox and grid properties:
  - [Flexbox Froggy](https://flexboxfroggy.com)
  - [CSS Grid Garden](https://cssgridgarden.com)

Just don't forget to manage your time. You don't have to finish all levels, but try to get as far as possible. If you get stuck on a particular level, it's possible to skip it and come back later.

## Bootstrap (0.5 h)

Front-end developers often deal with similar problems, such as responsive layouts, consistent element styling, reusable components, and more. This often leads to repeatedly trying to "reinvent the wheel" to solve these common problems.

This issue was recognized by a group of developers at Twitter who aimed to promote consistency across their internal web-based tools. They created Bootstrap, which is an open-source CSS framework designed to help streamline and simplify the process of creating responsive and mobile-first websites and applications.

Watch the **[CS50W Week 0 video](https://cs50.harvard.edu/web/2020/weeks/0/)** from **1:38:54 to 1:47:54** to understand what Bootstrap is. In the video, you will be introduced to Bootstrap rows and columns. Right now, we recommend sticking with the CSS Grid and Flexbox techniques you learned earlier. But you can use Bootstrap to style other elements - inputs and buttons, for example.

Try out Bootstrap yourself!

1. Open up the HTML and CSS files in your coding environment.
2. Include a stylesheet link in the `<head>` element to the Bootstrap CSS file:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
```

3. Open a new tab with the [Bootstrap documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/).
4. Try to find the applicable **Bootstrap CSS classes** for inputs, tables and buttons. What Bootstrap classes could you use to change the color of a button?

## Advanced (optional)

If you're already familiar with CSS and you're looking for more in-depth topics or challenges, consider exploring the following areas:

**CSS Preprocessors (Sass)**

Follow along the **[CS50W Week 0 video](https://cs50.harvard.edu/web/2020/weeks/0/)** from **1:47:54**.

CSS preprocessors like Sass extend CSS with advanced features such as variables, nesting, and mixins. These tools can help improve code maintainability and reduce repetition in your stylesheets.

At this stage in your learning, you do not need to adopt Sass for your projects. However, it's good to be aware of such tools, as they can be valuable in more significant projects and collaborations. For now, continue using CSS as your primary styling language.

If you decide to incorporate Sass into your projects, you'll need to compile your SCSS files into CSS. While there are online tools to compile files one-by-one, it's recommended to [install Sass](https://sass-lang.com/install) on your machine and use it to automatically compile your SCSS files into CSS.

**Other CSS frameworks**

Apart from Bootstrap, there are many more CSS frameworks, such as:
- [Tailwind](https://tailwindcss.com/)
- [Bulma](https://bulma.io/)

**CSS resets**

Although styling frameworks can provide a solid foundation for your designs, you might prefer a more customized approach. In that case, consider using a "CSS reset" ruleset to establish consistent styling across different browsers and devices. Popular CSS resets include [Normalize.css](https://necolas.github.io/normalize.css/) and [reset.css](http://meyerweb.com/eric/tools/css/reset/).

**Style linting**

Style linting tools like [Stylelint](https://stylelint.io/) can help enforce a consistent style guide across your stylesheets. They can also identify and fix common problems, making your code more maintainable and robust.

**New CSS features**

Modern CSS includes features that were previously only available through preprocessors like Sass. If you want to see what's new, here are some new CSS features:

- variables
- color mix
- nesting

You can use the **["Can I Use"](https://caniuse.com) website** to check the browser compatibility of these features.

## A new email from your project manager (2 hours)

```
From: Owen Overbudget, Project Manager
To: You
Subject: Fwd: Re: Site redesign
---
Hi,

Designers informed me that they're almost done with the design
for the new landing page. So hang in tight!

Remember that booking form we talked about? They said they want to
make it responsive. I don't know what that means, but they said
it's important.

They've sent me 2 screenshots of the form design and they asked
for you to start working on it. They said something about
"media queries". I'm sure you'll figure it out.

Thanks,
Owen
```

Narrow view (under 768px):

![Form design 2](https://imgur.com/9ktV3Xx.png)

Wide view (over 768px):

![Form design](https://imgur.com/A7yaotL.png)

Continue on your HTML form implementation from the previous part. Implement the form layout from the screenshots above. Try to make it responsive using media queries. What would be the best way to implement the layout? Flexbox or grid?

Depending on your implementation, you may need to add some additional classes to your HTML elements.

# Directions for further research (1 hour+):

As you become more comfortable with CSS, you may encounter some quirky behaviors or unique challenges that pique your interest. Here are some possible directions for further research:

- What happens if you have 2 CSS files and some style rules conflict with each other?
- How would you display one element on top of an another element?
- There are many different units in CSS to express the size of an element. While the most common is `px`. There are many good reasons to use other units in various situations. When would a developer use a `vh` or `rem` units instead of `px`?
- CSS supports many ways to specify colors. What are the differences between `white`, `#ddd`, `rgba(255, 255, 255, 0.8)` and `rgb(255 255 255 / 0.8)`? Try to use each of them in your HTML page or a [JSBin](https://jsbin.com/?html,css,output) and see how they look.
