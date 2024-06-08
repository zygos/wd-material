# Stage 1: Build our front end
FROM node:20.14.0-alpine3.20 as builder

# Set the working directory
WORKDIR /app

# Because installing dependencies is a slow process that doesn't change often,
# we can install them first, let Docker cache the result, and then copy over
# the rest of the source code. This way, if we change our source code, but we
# do not change our dependencies, Docker will not have to reinstall them.
# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies using a npm ci - Clean Install, which
# will install dependencies from package-lock.json, and fail if the
# package-lock.json file is out of sync with package.json.
RUN npm ci

# Copy the rest of the Vue application source code
COPY . .

# Build the application for production, this will generate a dist folder
# containing static HTML, CSS, JS and image files.
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:1.27.0-alpine3.19 as nginx

# Copy over a minimal server configuration.
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Nginx by default will look for files in /usr/share/nginx/html.
# To keep matters simple, we will copy our built application to that folder.

# Before that, we need to delete the default welcome to nginx page.
# Delete the default welcome to nginx page.
RUN rm /usr/share/nginx/html/* -rf

# Copy the built application from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 3001 to the outside
EXPOSE 3001

# When the container starts, Nginx will start as well
CMD ["nginx", "-g", "daemon off;"]
