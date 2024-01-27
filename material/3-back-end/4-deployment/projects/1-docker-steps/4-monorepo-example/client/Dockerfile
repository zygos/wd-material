# Stage 1: Build our front end
FROM node:18.19.0-alpine3.18 AS builder

WORKDIR /app

# Copy package.json files and install dependencies
COPY ../package*.json .
COPY client/package*.json client/
COPY server/package*.json server/
RUN npm ci

# Copy over the entire monorepo since we need to access the tRPC server
# types for the monorepo build
COPY . .

# While we can pass in environment variables before starting a server,
# our client application "bakes in" the environment variables at build time.
# That means that we need to pass in the environment variables before we run
# the build command.
# We would want to pass in a few environment variables for our client application
# to know how it should find the backend server. To do that, we will use two separate
# environment variables: VITE_API_ORIGIN and VITE_API_PATH. ORIGIN is the domain
# name of the server, and PATH is the folder-like path that is the prefix for all
# API routes. For example, if our server is running on http://localhost:3000/api,
# then the origin is http://localhost:3000 and the path is /api.
# We could also pass in the entire URL and split it into origin and path inside
# the client application.
# To make sure that we are not leaking some secret configuration variables to the
# client code, Vite requires to use the VITE_ prefix for public environment variables.
# To not mix up what is used at build time and what is used at runtime, Docker
# calls the environment variables that are passed in at build time ARGs (arguments).
# Here we are specifying that we expect two arguments to be passed in at build time.
ARG VITE_API_ORIGIN
ARG VITE_API_PATH

# Switch to the client folder
WORKDIR /app/client

# Build the client (HTML, CSS, JS, ...)
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:1.25.3-alpine3.18

# Delete the default welcome page.
RUN rm /usr/share/nginx/html/* -rf

# Copy the built client app assets to the Nginx directory
COPY --from=builder /app/client/dist /usr/share/nginx/html

# We will perform some environment variable substitution in the Nginx configuration.
# NGINX does not allow using environment variables in the configuration files.
# However, NGINX allows creating a template file (notice client/nginx/default.conf.template)
# that can be used to generate the actual configuration file. Here we will set
# an NGINX-specific environment variable that will be used to specify the output directory,
# which is the default NGINX config directory.
ENV NGINX_ENVSUBST_OUTPUT_DIR '/etc/nginx/conf.d'

# Copy the Nginx configuration
COPY client/nginx/default.conf.template /etc/nginx/templates/default.conf.template

# Expose port 80 to the outside
EXPOSE 80

# Start Nginx.
CMD ["nginx", "-g", "daemon off;"]
