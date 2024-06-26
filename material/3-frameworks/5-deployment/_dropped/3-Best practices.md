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

## Optional Exercise: Set up a process manager (1 hour)

Long-running Node processes can sometimes crash due to a mistake in error handling, exhausting available RAM and crashing the process.

We would like to keep our container resilient and able to self-restart any Node processes that have been started.

To manage this, we'll use PM2, a process manager for Node.js applications with a built-in load balancer. PM2 allows you to keep applications alive forever, reload them without downtime, and facilitate common system admin tasks.

Start by installing PM2 in your project using `npm install pm2` (we recommend this over installing it globally).

We will not cover all the commands and features of PM2, as you can find them on [pm2 documentation](https://pm2.keymetrics.io/docs/usage/quick-start/). Instead, we will touch upon a few relevant examples of our use case.

First, you might consider creating a configuration file for `pm2`, which will allow you to specify the settings for your application.

Here is an example configuration for PM2, which you can place in a file named `ecosystem.config.cjs` (cjs for CommonJS):

```js
module.exports = {
  apps: [
    {
      name: 'server',
      script: './src/index.ts',
      exec_mode: 'cluster',
      // This will use as many instances as there are CPU cores
      instances: 'max',
      // Optional: Restarts the app if it reaches the memory threshold
      max_memory_restart: '512M',
      interpreter: 'node',

      // If you are running TypeScript directly.
      // You could use --loader for older Node versions.
      interpreter_args: '--import tsx',
    },
  ],
}
```

**Note.** You might need to ignore your ESLint `ignorePatterns: ['**/*.js', '**/*.cjs']` to avoid linting errors.

To launch your application with PM2 in a Docker container, you can use the following command:

```
npx pm2 start ecosystem.config.cjs --no-daemon
```

This command will start your Node.js application with the settings defined in your `ecosystem.config.cjs` file. The `--no-daemon` flag is particularly useful in a Docker environment because it keeps PM2 running in the foreground, which is the behavior expected by Docker. Also, it will print out the logs to the standard output, which is what we want when checking the logs in the Docker container.

Not only will PM2 restart our Node process when it crashes, but it can also be used if we decide to scale our application vertically.

**Launching multiple processes**

Let's say our application becomes popular, and we need to scale it. The first option we should consider is **vertical scaling**. Vertical scaling means increasing the capacity of a single machine. So, instead of renting an instance with 1 CPU core, we could rent out a machine with 2 CPU cores or more.

With Lightsail, vertical scaling would mean selecting a more powerful instance. For example, choosing a Large (2 vCPUs) or Xlarge (4 vCPUs) instance. vCPUs stands for **virtual** CPU, as we are still only getting a slice of a real server-grade processor that might have 32, 64, or even more cores.

Meanwhile, the scale slider would mean having more separate instances of the same machine - **horizontal scaling**. Horizontal scaling is generally a bit more tricky to implement as it requires a load balancer that would route some requests to one machine and some requests to another.

![Scaling](https://imgur.com/vOkN96T.png)

Let's say we scaled vertically by choosing a Large instance that includes 2 vCPUs.

Unfortunately, Node is single-threaded, so it will not take full advantage of our upgrade. We would need to launch multiple Node processes, and each one could use its own dedicated core.

`pm2` allows us to do that. By setting `instances` to "max" in the `ecosystem.config.cjs` file, PM2 will automatically spawn as many processes as there are available CPU cores, allowing our application to take full advantage of the multi-core system. This is a simple form of load balancing within a single running machine that can significantly improve the performance of your application under load. You could try out running it on your development machine.

**Note.** Do not unnecessarily add more instances than you have CPU cores. This might even slow down your application or even crash it if you run out of memory.

## Optional: NGINX and Express configuration (1 hour)

In a production environment, it's common to place a reverse proxy like NGINX in front of a Node.js application. If you are using the previously provided monorepo container examples, your client NGINX server acts as a reverse proxy for your Node.js application.

To prevent some possible attacks, you can fortify your NGINX configuration with some additional security headers.

**Setting Up HTTP Headers**

HTTP headers are crucial for securing your application and ensuring that communication between the client and server is as intended. Here are some headers you should consider configuring in NGINX:

- **Content Security Policy (CSP)**: This header helps prevent cross-site scripting (XSS) attacks by specifying which dynamic resources are allowed to load.
- **X-Content-Type-Options**: Set this to "nosniff" to prevent the browser from trying to guess ("sniff") the MIME type, which can have security implications.
- **X-Frame-Options**: Use this to control whether your site can be framed. Typically, you'd set this to "SAMEORIGIN" to allow framing by pages on the same origin.
- **Strict-Transport-Security (HSTS)**: Enforce secure connections to the server by telling browsers that they should only interact with your application using HTTPS, not HTTP.
- **Cross-Origin Resource Sharing (CORS)**: If your API is accessed from other domains, you need to configure CORS headers to specify which domains are allowed.

Here's an example of how you might configure some of these headers in your NGINX server block:

```conf
server {
  # ... other configuration ...

  add_header X-Frame-Options always;
  add_header X-Content-Type-Options always;
  add_header X-XSS-Protection always;
  add_header Strict-Transport-Security always;

  # CSP example (you need to tailor this to your application's requirements)
  # NOTE: https://trusted.cdn.com is a placeholder for some trusted external domain that you want to allow to load scripts
  add_header Content-Security-Policy always;

  # ... other configuration ...
}
```
