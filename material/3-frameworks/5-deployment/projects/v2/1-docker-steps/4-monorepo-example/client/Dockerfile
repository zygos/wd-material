# Stage 1: Build our front end
FROM node:20.14.0-alpine3.20 AS builder

WORKDIR /app

# Copy package.json files and install dependencies
COPY ../package*.json .
COPY client/package*.json client/
COPY server/package*.json server/
RUN npm ci

# Copy over the entire monorepo since we need to access the tRPC server
# types for the monorepo build
COPY . .

# If we want to have custom env variables passed to the client build
# we would need to set them here as build args.
# ARG VITE_MY_CUSTOM_FRONT_END_ENV_VARIABLE

# Switch to the client folder
WORKDIR /app/client

# Build the client (HTML, CSS, JS, ...)
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:1.27.0-alpine3.19 as nginx

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
