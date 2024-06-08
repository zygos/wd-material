Part 3: Best Back-end Practices

# Part introduction

In this section, we will delve into some more nuanced aspects of web development that separate amateurish applications from professional ones. By mastering these remaining concepts, you'll be empowered to create web applications that work well and perform efficiently, scale gracefully, and safeguard user data.

Our goal is to introduce you to general good practices in web development, emphasizing scalability, security, logging, error management, and performance optimization.

# Key learning topics & resources for this part

## [Scalability and Security](https://cs50.harvard.edu/web/2020/weeks/8/) (2 hours)

The video introduces some of the key concepts around scalability and security. It does not mean you need to overengineer your capstone to address most of these areas. Some of them, such as HTTPS, are already addressed if you have deployed your project on AWS Lightsail.

## HTTP, SSL, and TLS (1.5 hours)

While AWS Lightsail handles HTTP, SSL, and TLS before directing the traffic to our containers, it is still important to understand how it works.

- Watch: [Secure Web Browsing](https://www.youtube.com/watch?v=E_wX40fQwEA) (15 min)
- Watch: [How TLS Works?](https://www.youtube.com/watch?v=THxIyHz191A) (15 min)
- Watch: [Transport Layer Security](https://www.youtube.com/watch?v=0TLDTodL7Lc) (15 min)
- Watch: [TLS Handshake Explained](https://www.youtube.com/watch?v=86cQJ0MMses) (20 min)

## Logging (1.5 hours)

- Read: [Node.JS Best practices](https://betterstack.com/community/guides/logging/nodejs-logging-best-practices/) (1.5 hours)

Once something goes wrong, you can go wrong on your development machine; you can see the issues immediately in your console. If something is not working right, you can hook up a debugger in VS Code or add a few console statements to figure out what is happening.

However, you do not have the same conveniences in a production server. To ensure you can trace back what happened before something went wrong, you want to keep track of various events in your application.

## Exercise: Set up a logger (3 hours)

- Video: [Example of how to set up pino](https://www.youtube.com/watch?v=2kKeQl_m8iY)

Setup [pino](https://www.npmjs.com/package/pino) or [winston](https://www.npmjs.com/package/winston) to log various events in your application based on the best practices that you were introduced in the previous section. Of course, not all best practices are worth our time for a project with a one-person team. Try to apply the ones that do not require any significant code refactoring or setting up external services.

At this point, we expect you to be able to set up this library on your own by looking up the package on npm and reading its documentation.

Make sure that:

- you have at least a few logging levels
- you can deploy your application
- you can see these logs in your app

**What should be logged?** We recommend starting lean and clean - a few key logs before and after some "error-prone" operations, such as establishing a database connection, performing external requests, etc. Trying to log everything will not necessarily make it easier to understand what is going on.

**Pro tip.** Logs can pollute your test runs. To prevent this, you can mock out the logger in your tests so it does not print anything or log anything in a test environment (based on the `NODE_ENV` environment variable, which is set automatically by Vitest to be `test`).

## Exercise: Error management with Sentry (3 hours)

While logs are great for investigating issues, you'd want to be immediately notified when new errors occur so that you can track them and ensure they get fixed promptly. This proactive approach to error management is crucial for maintaining a high-quality user experience and ensuring the stability of your web application.

One of the most popular tools for error tracking and management is Sentry. Sentry provides real-time error tracking, which gives you insight into production deployments and information to reproduce and fix crashes.

**Task.** Set up Sentry to log your errors in your application's front end (FE) and backend (BE). Although it's possible to set them up as a single project, it's best practice to configure them as separate projects following [Sentry guidelines](https://blog.sentry.io/organizing-projects/).

For testing purposes, deliberately throw some errors in your application code and ensure they are being logged to Sentry from your development machine. This will allow you to familiarize yourself with Sentry's dashboard and features.

Here's how you can get started:

**Development side**

1. Sign up for a Sentry account.
2. Create two new projects in Sentry, one for your front end and one for your back end.
3. Follow the Sentry documentation to install the necessary Sentry packages in your projects. For Vue, you would use `@sentry/vue,`, and for Node, you would use the `@sentry/node` package.
4. Add a call to Sentry in your error logging middleware. There are plenty of official and non-official guides on how you might do it in your project. You might start with Sentry's official [Express](https://docs.sentry.io/platforms/node/guides/express/), [tRPC Middleware](https://docs.sentry.io/platforms/node/configuration/integrations/pluggable-integrations/#trpc-middleware) and [Vue](https://docs.sentry.io/platforms/javascript/guides/vue/) examples.
5. Find some simple scenario that would throw an error in your application. You could even create an endpoint or a view to throw a dummy error. Verify that it appears in your Sentry project dashboard. Bonus challenge - how could you test it in an automated manner?

**Environment variables and deployment**

6. Pass in your Sentry keys through environment variables. Ideally, these keys should follow the same configuration management as your other env variables. For example, you might have a config.ts file validating and managing these variables. You would need to pass the front end with a `VITE_` prefix, so it is exposed to the client code. Exposing the front-end app key is not an issue, as Sentry will reject error reports from unknown domains. Make sure everything still works.
7. Add the right environment variables in your GitHub variables and secrets configuration. Update your Actions workflow to pass these variables to your container build stage.

Finally, you might want to avoid triggering real Sentry calls in your tests and development environment. Also, requiring a valid Sentry API key to start up your app in development seems overly strict and cumbersome. You could make the Sentry API key optional in your application configuration (or required only in production) and trigger Sentry calls only when a Sentry API key is present. Then, your peers and STLs will not need to provide a Sentry key just to run your project.

8. Update your Sentry calls so your app does not call Sentry if no Sentry key is present. This should make Sentry error reporting an opt-in feature.
9. Push your code; ensure it passes the tests and gets deployed.
10. Make sure you can trigger an error on Sentry with your deployed application in the FE and the BE.

Remember to handle errors gracefully in your application, providing user-friendly error messages and fallbacks where appropriate. Using Sentry doesn't replace the need for good error-handling practices; it augments them by giving you a window into the application's health in a production environment.

**Note.** Be mindful of sensitive information when sending data to Sentry. Avoid logging personally identifiable information (PII) or any other sensitive data that could compromise user privacy or security.

## Performance Optimization (0.5 hours)

- Watch: [Optimising Code](https://www.youtube.com/watch?v=K62EMzueWwA) **up to 1:30** (or on a slightly more serious note, up to **3:50**).

We recommend against overthinking performance optimizations before you have actual metrics indicating a problem. Premature optimization can lead to complex code, which is harder to change over time, which could be counterproductive even for performance. It's essential to strike a balance between performance and code maintainability. When in doubt, prefer maintainability. When performance becomes a problem, you would need to profile your application, measure how much time all function calls take, and then you could say for certain that a piece of code X takes up n% of response time/computing time/memory and whether it is worth it to optimize it.

Here are some key points to consider with performance:

- **Measure before optimizing:** Don't guess where the bottlenecks are. Use tools to measure performance and base your optimizations on empirical data.
- **Optimization trade-offs:** Every optimization comes at a cost, whether it's code complexity, development time, or maintainability. Ensure that the benefits outweigh the costs.
- **Ease of use and change:** Prioritize a clean and understandable codebase that can be easily modified and maintained by squeezing out every last drop of performance. Once in a while, ease of change and performance come hand-in-hand, but that is not often the case.
- **Product improvement:** Focus on improving the product for the user. A fast but unusable product is worthless. Conversely, a slower product that effectively solves a user's needs may be more successful.
- **When performance becomes an issue:** If your application becomes slow and the performance impacts user experience, it's time to measure and optimize. Profiling tools can help identify slow functions or components.
- **Easy wins:** Some optimizations have minimal trade-offs, such as batching database requests, using `Promise.all` to parallelize asynchronous calls, and caching frequently accessed data.
- **Going beyond code:** Remember that performance is not just about the code. Utilizing Content Delivery Networks (CDNs), leveraging edge computing, and compressing images can significantly improve performance. However, these tools are not necessary for your capstone project. Just make sure your front-end images are of a reasonable size (under 500 KB).

Here are some practical tips for easy performance wins:

- **Promise.all for parallelization:** When you have multiple independent asynchronous operations, you can use `Promise.all` to run them concurrently rather than sequentially. This can significantly speed up the overall execution time when dealing with multiple I/O-bound tasks.

```js
// we first get user, then once we have the user, we get the project
const user = await getUser(userId)
const project = await getProject(projectId)

// we can get both at the same time
const [user, project] = await Promise.all([
  getUser(userId),
  getProject(projectId),
])
```

- **Database optimizations:** Consider using eager loading or joins to fetch related data in a single query rather than making separate queries for each relationship. Avoid making queries in a loop, which can quickly lead to performance issues.

```js
userRepository.findOne({
  where: { id: userId },
  relations: { projects: true },
})
```

- **Caching:** Instead of performing a (relatively) slow request, you can remember the result of the previous request and return it the next time the same request is made. This is called caching. It could be used for data that does not change often or it is not critical to keep it completely up-to-date. Caching can be implemented on the back end or the front end. Most large projects have various caching mechanisms on both sides.

```ts
const cache = {} // or Map
const HOUR_MS = 60 * 60 * 1000

async function getWeatherForCity(city: string) {
  // Check if we have fetched this city before in the last hour
  if (cache[city]?.timestamp > Date.now() - HOUR_MS) {
    // Return cached data if it's less than an hour old
    return cache[city].data
  }

  // This will be called only once per city per hour
  const weather = await fetchWeatherAPI(city)
  cache[city] = { data: weather, timestamp: Date.now() } // Update cache
  return weather
}
```

- **Bonus: Indexes:** Try out using indexes in your database entities schema for keys that are often used for querying data.

# Directions for further research (1 hour+)

- [12 Factor App](https://12factor.net/) is a well-known methodology for building software-as-a-service apps that emphasizes building scalable and maintainable applications. We have already implemented many of these principles throughout our application. Review the 12 factors and determine which ones are evident in your capstone project and which ones you may need to address further. Consider how you can apply those that are missing to improve your development and deployment processes.
- [OWASP Top Ten](https://owasp.org/www-project-top-ten/) is a critical resource for web application security. It represents a broad consensus about the most critical security risks to web applications. Explore the list to understand the common vulnerabilities and how they might impact your application. Evaluate your project against each point and consider how you could mitigate these risks.

## Optional resources: Security Exercises and additional resources

- [Google Gruyere](https://google-gruyere.appspot.com/) is a code lab that allows you to practice finding and exploiting security flaws in web applications. It's an excellent way to apply your knowledge of web security in a hands-on environment. Use this resource to understand common security issues in web applications and how to prevent them.
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) offers free online training in web security. Through a series of practical exercises and labs, you can learn about different types of web vulnerabilities and how to defend against them. This is a valuable resource for deepening your understanding of web security principles and practices.
