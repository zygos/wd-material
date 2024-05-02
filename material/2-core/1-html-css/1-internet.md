Part 1: Internet

You have just received an email from your project manager informing you that you will need to start working on a travel agency website redesign in approximately a week. However, you realize you need to learn more about front-end web development. So, you decide to start a crash course that covers everything you need to know to accomplish this task - how do websites work, what's HTML, CSS, and how to use them to build a website?

# Part description

This part's primary goal is to develop a strong foundation in internet-related concepts. Although this part won't include hands-on coding exercises, understanding how the internet works is crucial to becoming a successful web developer.

In this part, we'll cover some fundamental concepts like the internet's workings, including data transmission through TCP/IP, understanding the Domain Name System (DNS), differences between HTTP and HTTPS, and making requests using tools like `curl` and visual REST tools.

# Key learning topics & resources for this part

## [CS50 Week 8 (up to 48:20)](https://cs50.harvard.edu/x/2023/weeks/8/) (1.5 hours)

Before diving into the lecture, get comfy and make sure your coding environment with a terminal is up and running. Keep an eye out for answers to the following questions:

- Which problems does TCP/IP solve?
- What's the purpose of DNS?
- What is the main difference between HTTP and HTTPS?

While using the following reference materials, remember that you don't have to memorize everything. Instead, use them to clarify concepts and answer questions that arise when working on projects or exploring new ideas.

- [HTTP reference (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP)

## IP and DNS (1 hour)

- [How DNS works (video)](https://www.youtube.com/watch?v=uOfonONtIuk)

**DNS propagation**

Some tools can help you inspect the current mapping of IP addresses and domain names, like [whatsmydns.net](https://www.whatsmydns.net/). This tool can be helpful when changing DNS records, as it shows you if your changes have propagated throughout the global DNS servers.

For now, try entering `www.turingcollege.com` into the query bar and check the IP addresses of [Turing College](https://www.turingcollege.com/).

## Inspecting requests with Developer Tools (1 hour)

- [Inspect Network Activity](https://www.youtube.com/watch?v=e1gAyQuIFQo)

As a web developer, you'll frequently rely on your browser's Developer Tools. Today, let's take a look at the Network tab, which lets you view all requests made to web servers by the website you're visiting.

Open up the developer tools in your browser, switch to the Network tab, and visit `https://www.turingcollege.com`. See if you can determine the following:

- What types of files are downloaded for the website to load? Which ones are familiar, and which are new to you?
- How many requests were made in total to load the homepage?
- Can you identify any underlying websites and services used by the homepage?

## Exploring Developer Tools (1 hour)

- [Simulate mobile devices in Chrome with Device Mode](https://www.youtube.com/watch?v=f7kokNyRe7U)

Before delving deeper into web development, let's get familiar with the Inspect and Console tabs in Developer Tools. You'll use them extensively when learning HTML, CSS, and JavaScript later.

First, watch the video on simulating mobile devices in Chrome with Device Mode. This feature is useful for testing how your websites will look and behave on different devices. Next, spend some time exploring the Chrome DevTools documentation. You can also browse the Firefox and Safari documentation if you prefer to use those browsers.

For a fun exercise, go to your favorite websites, open the Developer Tools, switch to the Console tab, type `document.designMode = 'on'`, and press `enter`. This command enables in-page content editing, allowing you to play around with the content of any website temporarily. Try clicking on some headlines and typing some text to see what happens!

## Making requests (1 hour)

**curl**

You've investigated what's happening under the hood; now it's time to make some HTTP requests ourselves. While you've already made requests with Python, let's practice doing them in the terminal using `curl`.

Using `curl` can be advantageous for a few reasons: it provides a fast way to make requests in the terminal, is essential when working in server environments, and is great for sharing request data with other developers for debugging purposes.

Remember how we called public APIs in Python to get machine-readable data? We can make those requests with `curl`, the most popular tool for making such requests, usually built into most systems.

```sh
curl https://www.boredapi.com/api/activity
```

`curl` has many different options for file transfer, passwords, and more. Skim through the [curl Tutorial](https://github.com/curl/curl/blob/master/docs/MANUAL.md) to understand its possibilities and use-cases.

While `curl` is powerful, you might wonder if there's a more user-friendly way to work with requests and responses.

**GUI client**

One approach is to use an app with a Graphical User Interface (GUI), such as [Thunder Client](https://www.thunderclient.com/) or others like [Insomnia](https://insomnia.rest/) and [Postman](https://www.postman.com/). These tools can make requests and display responses in a structured manner, making it easier to interact with APIs without writing any code.

After installing your preferred tool, use the [Thunder Client tutorial](https://www.youtube.com/watch?v=c3sqFK7zBKE) as a starting point (the concepts should be transferable to other GUI clients as well). When making requests through this client, consider the differences between these requests and directly visiting a website through your browser.

These GUI clients also often have the ability to import `curl` commands, which can be helpful when collaborating with other developers or debugging requests.

# Direction for further research (2 hours+):

To further expand your knowledge and understanding of internet-related concepts, consider exploring the following topics:

**What would it take to set up your machine to serve websites?**

What is your IP address? Tip: try Googling it!

If you typed your IP address into a browser and tried to visit it, you’d probably get an error. That happens because your IP address might not have a web server configured to respond to HTTP requests.

Let's say you really want your website to be displayed when somebody types your IP address into their browser. What would you need to do?

Your IP address might be a little hard to remember and share. To get a more human-friendly address, you would buy a domain from a domain registrar and configure its DNS settings to point to your IP address. This way, when someone accesses your domain, their browser will send an HTTP request to your IP, where your server can respond with your site's content.

Once you have a domain pointing to your home IP address, you might realize that hosting your website on your personal computer isn't the most practical solution, especially when needing 24/7 uptime. What would be a solution that would (for the most part) ensure your website remains available even when your computer is turned off?

Let's say you tried an alternative hosting solution, but your friend can't immediately access your website using the domain. What could be the problem?

**How does TLS work?**
Dive deeper into the differences between HTTP and HTTPS, specifically focusing on the role of TLS (Transport Layer Security) in securing web communications.

**Learn More About Internet Protocols**
In addition to HTTP and HTTPS, learn more about other internet protocols like FTP (File Transfer Protocol), SMTP (Simple Mail Transfer Protocol), and SSH (Secure Shell).

**DNS**

When using [whatsmydns.net](https://www.whatsmydns.net/), you might have noticed that by default it checks for `"A"` records. There are many more record types. Figure out what `AAAA`, `MX`, `CNAME`, and `TXT` records are for.

You also might have noticed that there can be multiple IP addresses for the Turing College website and that they differ between various regions. Investigate why this might be the case and how it affects web performance and accessibility.
