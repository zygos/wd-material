Part 2: Deploying Containers with Cloud Services

# Part introduction

In this part of the module, we aim to equip you with the knowledge and skills to deploy your web application to a cloud service. We will use Amazon Web Services (AWS), one of the most popular cloud platforms, to host and manage our application.

**Goals:**

- Understand the concept of managed infrastructure and how it benefits web development.
- Familiarize yourself with AWS and its key services.
- Learn to set up an AWS account and navigate its user interface.
- Gain hands-on experience in deploying a web application to AWS using Lightsail.
- Understand the process of setting up a Continuous Integration/Continuous Deployment (CI/CD) pipeline.
- Learn to automate the deployment process using GitHub Actions.
- Apply the learned concepts and skills to deploy your capstone project.

**Limitations:**

- While exploring AWS in this part, we will not cover other cloud platforms like Google Cloud Platform or Microsoft Azure. However, the principles you learn here can also be applied to these platforms.
- We will use AWS Lightsail, a beginner-friendly service, for deployment. AWS offers other more complex services for container orchestration, like Elastic Kubernetes Service (EKS) and Elastic Container Service (ECS), which we will not cover.
- We will not delve deep into configuring custom servers. We will focus on using managed services that balance ease of management and professional workflow.
- We will not cover advanced topics like Infrastructure as Code (IaC), advanced deployment strategies, and cost management on AWS in detail. These are important topics for a professional web developer who wants to specialize in DevOps, and we encourage you to explore them on your own.

While we will guide you through the process, setting up a CI/CD pipeline requires careful attention to detail and a willingness to troubleshoot and solve problems as they arise. While we will guide you through the process, you must be able to troubleshoot and fill in some gaps yourself.

# Key learning topics & resources for this part

## Managed infrastructure (0.5 hours)

- Watch: [Platform as a Service](https://www.youtube.com/watch?v=QAbqJzd0PEE)
- Watch: [Serverless](https://www.youtube.com/watch?v=vxJobGtqKVM)

There are various options for deploying our web application on the internet, and we will primarily explore managed infrastructure options that allow us to avoid diving too deeply into configuring custom servers. While a deeper understanding of back-end server configuration is valuable, to build a solid general knowledge base, we will focus on practical options that balance ease of management and professional workflow.

Among the cloud providers, the largest ones include Amazon Web Services (AWS), Google Cloud, and Microsoft Azure. Our focus will be on AWS, which is [the most popular](https://survey.stackoverflow.co/2023/#most-popular-technologies-platform), often uses open-source tools for its services, and it is [most liked](https://survey.stackoverflow.co/2023/#section-admired-and-desired-cloud-platforms) out of the Big 3.

## Introduction to Cloud Services and AWS (1 hour)

- Watch: [Introduction to AWS Services](https://www.youtube.com/watch?v=Z3SYDTMP3ME)
- Watch: [Top 50+ AWS Services Explained](https://www.youtube.com/watch?v=JIbIYCM48to)

Your main goal is to familiarize yourself with the possibilities of AWS and the general uses of its services. It is fine if you don't understand what each service does at this stage. For now, you need to know the following four services:

- EC2 - virtual machines
- S3 - static file hosting
- RDS - SQL databases
- IAM - AWS permissions
- Lambda - serverless functions

These services are so commonly used that they have become part of the cloud computing lexicon.

While you might use a few more services than these, it is not necessary to memorize all of them. Rather than knowing each service's function, it is more useful to recognize when you need a particular service (such as a database) and then to [explore the available options](https://aws.amazon.com/products/databases/) (like RDS, DynamoDB, Aurora, Redshift, ElastiCache, MemoryDB, DocumentDB, Keyspaces, Neptune, Timestream). Then, you can select a few that seem most appropriate and compare them to find the best fit for your use case. Of course, you could also ask an AI chatbot for recommendations while figuring out what does what.

## Signup for AWS account (0.5 hours)

This step is quite self-explanatory. Since we will guide you through deploying your web application on Amazon Web Services, you must create an account.

Some tips:
- Sign up for the **Free Tier**, which allows you to use various services for free within certain limits. This capacity is usually sufficient for applications with up to hundreds or thousands of users.
- While we will utilize free tools, AWS will request a credit card number and make a nominal charge (which is later refunded) of $1. As there is a small risk of inadvertently starting services and forgetting to shut them down, we recommend using services such as Revolut, N26, Monzo, Privacy, etc., to create virtual cards with spending limits.

## Deployment (0.5 hours)

Your goal here is to use the provided step-by-step guide for AWS container hosting so that you can replicate the process with your capstone project.

We aim to establish a simple pipeline:

![Developer to AWS](https://imgur.com/pwUmqVr.png)

If set up correctly, all you will need to do is push your code to GitHub. GitHub will then test and build it, and subsequently push it to AWS, which will host it on the web.

![GitHub to AWS](https://imgur.com/WD6usTh.png)

This process will require us to answer several questions:

1. How will GitHub know what to do?
2. How will it connect to AWS? We can connect to GitHub because we have logged in from our machine. Will we need to log in to AWS from a containerized machine on GitHub?
3. Where will we push our containers?
4. Will we use containers for our database as we did in our tests? Will we use Docker volumes or another machine to host our database?

Since the answers to these questions are interdependent, it is best to address them in reverse order. For example, once we know where our containers will reside on AWS, we will know where to direct GitHub. So, we will tackle these issues in this sequence:

- **Set up a place for our database.**
- **Set up a place for our containers to run.**
- **Set up a way to connect to AWS from the command line.**
- **Add a GitHub workflow** that instructs GitHub to containerize our application and push it to AWS with the credentials we provide.

**Set up a place for our database.**

While our database could live on the same machine as our application code, it is recommended to keep it separate for several reasons:

- You can scale your application independently from your database.
- You can provide access to your database without providing access to your running application.
- You reduce the risk of losing data if your application machine crashes.

Various services can host your database. Since you are working with SQL in your capstone, you could use AWS RDS. However, it is a bit more tricky to set up and maintain. If your app will not perform queries 24/7, then a "serverless" user-friendly service, such as [Neon](https://neon.tech/) would be your best bet. These services provide "set it and forget it" cloud databases, and they have a sufficient free tier for most capstone projects.

For our example, we will use a "serverless" database provider.

**Task.** Sign up for [Neon](https://neon.tech/) and create a database. Neon will provide you with the environment variables that you will need to add to your project. Make sure you can connect to this database from your machine.

**Note.** When creating a database, choose a server closest to your users. For example, if you are developing an application primarily for European users, we recommend `eu-central-1`. We will host our app on AWS, which also has regions, and it is best to keep our database as close to our application server as possible due to request latency.

**Note.** In business applications, you would have more granular control over how your database is accessed. For example, if you are using AWS RDS, you could set it up in a private network, which is not accessible from the internet but is accessible for your application. However, for our purposes, we will keep it simple and allow access to our database from the internet. Of course, internet access does not mean it is publicly accessible. We will still need to provide a password to access it.

## [AWS Lightsail](https://www.youtube.com/watch?v=6S2brobgmBA) (1 hour)

Watch the presentation. It will show a few examples of deploying containers to AWS using Lightsail. We will perform a similar deployment in the next section.

Since this is the first time most of you will be dealing with AWS or hosted servers, we will not start with the full suite of cloud services. We will guide you through one of the most straightforward container deployment tools available on AWS - Lightsail container services. It allows deploying containers through the command line and manages various pesky issues, such as providing a public address and an SSL/TLS certificate for HTTPS requests. While beginner-friendly, it will expose you to some of the core building blocks behind hosting a web application on the cloud that goes beyond just uploading built source code.

## Exercise: Deployment (2 hours)

**Set up a place for our containers to run: AWS Lightsail**

1. Navigate to https://aws.amazon.com/ and sign in to your AWS account.
2. Search for the "Lightsail" service.
3. Select "Containers" from the left menu.
4. Click "Create container service".
5. Choose a region for hosting your application. For example, if you are from Europe, we recommend deploying to `eu-central-1`.
6. Choose a Micro instance, which should be "Free for the first 3 months". Depending on whether you want to host this application long-term, you can set a reminder to terminate this app.
7. Skip setting up your first deployment. We will build a container and push it to the container registry through the command line.
8. Give a name to your service; it will be used in the public URL of your service, unless you buy a domain.
9. Click "Create container service".
10. It will take a few minutes to create the service.

![Lightsail deployment](https://imgur.com/NwZa5BG.png)

Assuming that we are working with a monorepo with two containers (front-end web `client` and back-end API), we will push both containers to Lightsail and expose one to the internet so people can connect to it.

How can we push our containers there? The most basic method would be to use the UI to provide links to our Docker images. Unfortunately, using the UI for deployment is not recommended as it cannot be automated and is not as flexible as command-line tools.

Deployment through the command line requires three steps:

1. **Authenticate** our account so AWS knows that our machine can perform specific actions.
2. **Push built containers** to AWS.
3. Command Lightsail to **run these containers** with a set of environment variables.

Let's start with the first step - **Authentication**.

**Set up a way to connect to AWS from a command line: AWS IAM**

To connect any machine to AWS, you need some credentials. While you used your email and password to log in to the AWS Management Console (UI), it is not the way to authenticate yourself through the command line, as logging in with your email and password is equivalent to having permissions for anything within your AWS account.

Instead, we will create a new user under our "root" user (the one we signed up with for AWS). This user would be permitted to push and deploy containers to Lightsail, but not much more. Instead of authenticating with a username and a password, this user will use an **access key and secret access key**.

To do that, we will use **AWS Identity and Access Management (IAM)** service.

**Note.** Since the AWS platform evolves, some steps might not match exactly what you see on the AWS UI.

1. **Sign in to the AWS Management Console:**

- Navigate to https://aws.amazon.com/ and sign in to your AWS account.

2. **Open the IAM Console:**

- In the AWS Management Console, search for and open the IAM (Identity and Access Management) service.

3. **Create a New IAM User in a Group with a Policy.**

In general, it is not recommended to add permissions to a user directly. Instead, it is recommended to have a group with specific permissions for a particular task. That group contains users that can deploy your application. For example:

![Deployment permissions](https://imgur.com/KnHsxVr.png)

**Let's create a user inside of a group:**

- Click "Users" in the left sidebar in the IAM dashboard.
- Click the "Create user" button.
- Enter a user name (e.g., `GithubCapstoneDeployer`).
- Select "Add user to group".
- Click "Create group".
- Enter a group name (e.g., `CapstoneDeployers`).
- Click on "Create policy". This should open up a new tab. Policy is a document that controls what actions an identity (users, groups of users, and roles) can perform, on which resources, and under what conditions. You can view it as a set of permissions.
- Click on the "JSON" tab.
- Copy and paste the following policy document into the JSON editor. It describes a list of permissions we will provide to our group and, in turn, to the user. The user will be able to interact with Lightsail in a meaningful manner. If you already have some Lightsail projects in your AWS account, you might want to restrict the "Resource" to include only a particular Lightsail instance.

```json
{
   "Version": "2012-10-17",
   "Statement": [
      {
         "Effect": "Allow",
         "Action": [
            "lightsail:GetContainerServices",
            "lightsail:CreateContainerService",
            "lightsail:UpdateContainerService",
            "lightsail:CreateContainerServiceDeployment",
            "lightsail:GetContainerServiceDeployments",
            "lightsail:GetContainerServicePowers",
            "lightsail:GetContainerServiceMetricData",
            "lightsail:GetContainerImages",
            "lightsail:RegisterContainerImage",
            "lightsail:CreateContainerServiceRegistryLogin"
         ],
         "Resource": "*"
      }
   ]
}
```

- Click "Next".
- Add a Policy name that describes what the policy does (e.g., `LightsailContainerDeployment`).
- Click "Create policy".
- It should take a few seconds for the policy to be created. Once it is created, ensure that if you search the policy by its name (e.g., `LightsailContainerDeployment`), it appears in the search results. You can then close the policy tab.
- Go back to the IAM user creation tab.
- Search for your policy by name (e.g., `LightsailContainerDeployment`). You might need to click the refresh button beside the "Create policy" button to see the policy in the search results.
- Click on the checkbox next to the policy to select it.
- Click "Create user group".
- Make sure that the group is selected.
- Click "Next".
- Click "Create user".
- It should redirect you to a page showing a list of users.

4. **Generate access key and secret:**

- Click on the user you have just created.
- Click on the "Security credentials" tab.
- Click on "Create access key".
- You can select any use case, but we will assume you selected "Third-party service". AWS might recommend other access methods; however, using the AWS access key is the most conventional way to access AWS resources from third-party services and the one that you will find the most documentation.
- Check the confirmation box and click "Next".
- You can add some description, such as "Deploy capstone project from GitHub Actions."
- Click on "Create access key".
- **Copy the Access key and copy the secret access key**. You will not be able to see the secret access key again, so copy it now. You will need these keys to connect to the AWS from the command line as that particular user. We will later on provide these keys to GitHub Actions. Of course, you can always create a new key if you lose it. You should immediately delete/revoke the old key on AWS IAM.

**Deploy from your machine.**

While we will delegate all deployments to GitHub Actions, we can perform our first deployment manually to understand what is happening.

To deploy, we will need:

1. Authenticate our machine to use the AWS command-line interface.
2. Build front-end and back-end containers.
3. Push containers to AWS Lightsail.
4. Prepare a few files on how to launch these containers (similar to `docker-compose`).
5. Run a few AWS CLI commands for pushing and deploying containers.

**Step 1.** Install [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) on the same system that you use for your terminal. If that is WSL, then install AWS CLI on the Linux subsystem.

Once installed, run `aws configure` and add your access key ID, secret key, and region that you used in Lightsail, and you can pick an output format, for example, `json.` Here is an [AWS page on configuring your credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-authentication-user.html).

**Step 2.** Using `docker build`, build front-end and back-end containers, and tag them however you like, for example, `dogs/client`, `dogs/server`.

**Note for Mac users.** As most servers, our server will run on a Linux server using the AMD/Intel x86-64 architecture. Docker expects that the container is built for the matching architecture. Since modern Macs use ARM-based processors, you must specify that you want to build for x86-64. You can pass a `platform` flag to your docker build command (`docker build --platform linux/amd64`). Alternatively, you could add it to your Dockerfile - `FROM --platform=linux/amd64 node:...`, or set it as the default platform by adding a [permanent environment variable](https://stackoverflow.com/questions/22502759/mac-os-x-10-9-setting-permanent-environment-variables) `DOCKER_DEFAULT_PLATFORM="linux/amd64"` in your terminal.

**Step 3.** Push containers to Lightsail.

To push the front-end container, you would need to run:

```sh
aws lightsail push-container-image \
  --service-name {{ YOUR LIGHTSAIL SERVICE NAME ON AWS }} \
  --label client-1 \
  --image {{ HOW YOU HAVE TAGGED CLIENT IMAGE }}
```

Similarly, push the server image.

These commands should print some information. The most important piece to take note of is the container name. We will refer to these names as "LIGHTSAIL_CLIENT_IMAGE" and "LIGHTSAIL_SERVER_IMAGE".

**Step 4.** Specify deployment configuration.

If you would search for "aws lightsail deploy container", you would quickly find the [create-container-service-deployment](https://docs.aws.amazon.com/cli/latest/reference/lightsail/create-container-service-deployment.html) aws cli command. It has lots of arguments, but primarily it needs to know what is the Ligthsail service name (`--service-name`), which containers it should deploy (`--containers`) and which container will be responsible for routing all public traffic (`--public-endpoint`). Specifying the service name is easy, however the other two arguments are a bit more tricky and it is easier to specify them as JSON files, which we will pass to the `aws` cli.

Create 2 new files in the root of our mini project:

`containers.json`, which is a Lightsail-specific file that does pretty much the same job as `docker-compose.yml` for starting up containers:

```json
{
  "client": {
    "image": "{{ LIGHTSAIL_CLIENT_IMAGE }}",
    "command": [],
    "ports": {
      "80": "HTTP"
    },
    "environment": {
      "API_PROXY_PASS": "http://localhost:3000"
    }
  },
  "server": {
    "image": "{{ LIGHTSAIL_SERVER_IMAGE }}",
    "ports": {
      "3000": "HTTP"
    },
    "environment": {
      "NODE_ENV": "production",
      // DB_SSL is a new environment variable that is accepted by server/config.ts
      // and passed to TypeORM to enable encrypted connection to the database.
      // You might not have it in your capstone, so please check the server/config.ts in
      // the provided monorepo examples.
      "DB_SSL": "true",
      "DB_SYNC": "true",
      // add your NEON credentials here
      "DB_HOST": "{{ ... }}",
      "DB_NAME": "{{ ... }}",
      "DB_USER": "{{ ... }}",
      "DB_PASSWORD": "{{ ... }}"
    }
  }
}
```

Make sure to fill in your database credentials and the image names. Since this file contains secrets such as the database password, **do not commit it to your git repository**! We will use this file only for demonstration purposes, and you should delete it right after you are done with the exercise.

Then, create `public-endpoint.json`, which tells Lightsail which container should be public. In our case, we are keeping the `client` container public, and it will be responsible for serving the front end and proxying all `/api` requests to the back-end container:

```json
{
  "containerName": "client",
  "containerPort": 80,
  "healthCheck": {
    "intervalSeconds": 15,
    "path": "/api/health"
  }
}
```

Here, we have specified that the `client` will deal with public traffic and that Lightsail should keep an eye on it by calling `/api/health` (which we have added to the `server/app.ts`) every 15 seconds. This will let Lightsail know that deployment was successful and that a container is ready to receive traffic. This could be used for monitoring, scaling up to more server instances, etc.

**Note.** There is no requirement on how we should structure our containers. We could build a single custom container containing both the front and back end; we could make the back end server public instead, or we could use a proxy server that would route some requests to BE and some to FE... there are plenty of options.

**Step 5.** Deploy the server to production.

Now, AWS has all the necessary containers, and we have all the instructions on how to start these containers (`containers.json`) and which container should be responsible for handling public traffic.

If you have created these 2 files, set up your AWS cli and your terminal is in the same directory as these files, you can run:

```sh
aws lightsail create-container-service-deployment \
  --service-name {{ YOUR LIGHTSAIL SERVICE NAME ON AWS }} \
  --containers file://containers.json \
  --public-endpoint file://public-endpoint.json
```

This command will take some time to complete. You can check the status of the deployment in the AWS Lightsail UI. If you face any issues, refer to the [AWS Lightsail documentation](https://docs.aws.amazon.com/cli/latest/reference/lightsail/create-container-service-deployment.html).

Remember to move these files outside your repository (or even delete them). You do not want to expose your database credentials in your source code. You could keep the `public-endpoint.json` file, but it is not necessary.

## Example: GitHub Actions to build and deploy a monorepo (1 hour)

We have ported the same process you just went through manually to an automated GitHub Actions workflow. You [download it here](https://drive.google.com/file/d/12df8nG9DpdIw2iSpUQ5yzcI90krHsSPV/view?usp=sharing). It is built for the `monorepo-example` example in the previous sprint part.

For it to work, you must copy over this workflow and add the necessary variables/secrets configuration in your GitHub Actions configuration.

1. In your GitHub repository, select the "Settings" tab.
2. Select "Secrets and variables" in the sidebar, then click on "Actions".
3. There are two types of variables: plain [Variables](https://docs.github.com/en/actions/learn-github-actions/variables) and [Secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions). Secrets, such as keys, tokens, passwords, etc., should be used for sensitive data. Variables should be used for everything else - your application URL, service names, etc. Based on the `.github/workflows/main.yml`, fill in all the `vars.VARIABLE_NAME` to Variables and all `secrets.SECRET_NAME` to Secrets. These variables and secrets should be entered through this GitHub UI, not into a file!
4. Push the code to GitHub, to the `main` branch.
5. Check if the GitHub workflow passes and deploys the application.
6. Open the AWS Lightsail UI and check if your application is deployed. That can take a few minutes. If there are any issues, go to the "Deployments" tab in Lightsail UI and look for the "Open log" link, which could help you investigate the issue. You should also check if you have entered the correct values for variables and secrets in GitHub.
7. Once your application is deployed (Status: **Running**), visit the provided public domain.

**Note.** In general, you would prefer to avoid passing your production variables through GitHub Actions as this provides sensitive data to machines running GitHub Actions. While the secrets are encrypted, it is best not to provide them at all and instead manage all secrets as close to the server. We want to keep our secrets centralized and gated under tight permission control, using either [AWS Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) or [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/). For our purposes, these services are overkill, and it is perfectly fine to use the demonstrated workflow for these exercises and your capstone project.

## Exercise: Setup GitHub Actions to build and deploy your capstone project (2 hours+)

Now is your time to apply what you have learned to your capstone project.

Your task is to:

- create a new database that can be accessed from your deployed server (Amazon RDS, Neon, Planetscale, ...);
- extend your capstone project GitHub Actions workflow to include building and deploying your application to Lightsail (or you can choose a different AWS service, if you are already familiar with AWS);
- configure your capstone project to include the necessary configuration;
- push to the `main` (`master`) branch of your capstone repo to trigger the GitHub Actions pipeline, which deploys your web application;
- make sure that your application works as expected.

The difficulty of this task depends on how similarly you have structured your project to the provided examples throughout the module. For some, it might take 30 minutes, and for some, 3 - 4 hours. If you go beyond 2 hours, look for help from your peers.

# Directions for further research (1 hour+)

- Right now, we are delegating everything surrounding our deployment to AWS Lightsail. In a larger application, you might want more control over this step. Look into possible [Deployment strategies](https://www.youtube.com/watch?v=AWVTKBUnoIg).
- There have been many horror stories of companies or developers unknowingly spending too much money on Amazon services due to not knowing how much some services cost or having eager scaling policies. While Lightsail instances on their own will not blow up your budget, there are various other services that could, if used carelessly. How could you add some alerts and account spending limits to your AWS account?
- While we have gone through the AWS UI to spin up our Lightsail container service, there are better approaches than this, as it leaves our infrastructure in a hard-to-reproduce and manage state. To manage this, we could interact with our cloud services through Infrastructure as Code (IaC). For example, Amazon offers a few proprietary tools, such as CloudFormation and CDK. There are some provider-agnostic tools, such as Terraform. How do these tools work, and why would companies use them?
- What is Kubernetes? Which Amazon Web Service would you choose to get started with Kubernetes?
