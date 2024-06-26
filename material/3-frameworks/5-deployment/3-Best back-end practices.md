Part 3: Best Back-end Practices

# Part introduction

In this section, we will delve into some more nuanced aspects of web development that separate amateurish applications from professional ones. By mastering these remaining concepts, you'll be empowered to create web applications that work well and perform efficiently, scale gracefully, and safeguard user data.

Our goal is to introduce you to general good practices in web development, emphasizing scalability, security, logging, and performance optimization.

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

- **Bonus: Indexes:** Try out using indexes to your database for columns that are often used for querying data.

# Directions for further research (1 hour+)

- [12 Factor App](https://12factor.net/) is a well-known methodology for building software-as-a-service apps that emphasizes building scalable and maintainable applications. We have already implemented many of these principles throughout our application. Review the 12 factors and determine which ones are evident in your capstone project and which ones you may need to address further. Consider how you can apply those that are missing to improve your development and deployment processes.
- [OWASP Top Ten](https://owasp.org/www-project-top-ten/) is a critical resource for web application security. It represents a broad consensus about the most critical security risks to web applications. Explore the list to understand the common vulnerabilities and how they might impact your application. Evaluate your project against each point and consider how you could mitigate these risks.

## Optional resources: Security Exercises and additional resources

- [Google Gruyere](https://google-gruyere.appspot.com/) is a code lab that allows you to practice finding and exploiting security flaws in web applications. It's an excellent way to apply your knowledge of web security in a hands-on environment. Use this resource to understand common security issues in web applications and how to prevent them.
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) offers free online training in web security. Through a series of practical exercises and labs, you can learn about different types of web vulnerabilities and how to defend against them. This is a valuable resource for deepening your understanding of web security principles and practices.
