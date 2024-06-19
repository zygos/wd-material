# We could use a raw Linux image (Ubuntu, or some other distro,
# like Alpine, Debian, etc.)
# However, we will use a Node.js image which already has Node.js
# installed. This will save us some time. We could something like
# node:20, however, one day that might mean pulling Node.js 20.11,
# another day it might mean Node.js 20.12.
# Vast majority of the time that is not a problem, as Node.js
# is backwards compatible. However, sometimes we might get some
# unexpected issues if our version starts drifting over time.
# It is best to set the exact version of the image that we want to use,
# including the OS version. Then, once in a while, we can revisit this
# file and update the version to get latest security or feature updates.

# TODO: Go to https://hub.docker.com/_/node/ and pick some recent-ish
# Node image and use it in a FROM statement. You might want to use a
# version that closely resembles the version that you have installed on
# our machine. In our case, we recommend using an Alpine image, as it
# is much smaller than the default image and it does not have any
# clear downsides for this project.

# Set some directory inside the container as the working directory
# which will be used for all subsequent commands.
WORKDIR /app

# We could copy over the entire project folder and install dependencies
# inside the container.
# However, we should try layering our Dockerfile in a manner that keeps
# the less frequently changing commands at the top. This will allow Docker
# to cache the results of those commands and speed up the build process.
COPY package*.json ./

# Special type of npm install (ci - clean install) for automated environments.
RUN npm ci

# Copy everything else.
COPY . .

# build JS files
RUN npm run build

# TODO: By default, our application starts up on port 3000 (src/config.ts).
#       Make sure that port 3000 is exposed to the outside.

# TODO: When start the back-end server, we want to do 2 things:
#       1. Run database migrations (if any)
#       2. Start the server
#       Since we need a single command to do both, we have created a
#       custom command `npm run prod`. Which will do both of these things.
#       Make sure that the container runs this command using CMD.
