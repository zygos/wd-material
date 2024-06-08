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
