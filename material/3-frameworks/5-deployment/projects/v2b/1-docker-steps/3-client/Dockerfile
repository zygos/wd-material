# Stage 1: Build our front end
FROM node:20.14.0-alpine3.20 as builder

# Set the working directory
WORKDIR /app

# TODO: Produce a /dist folder that contains
# the built application. This will require copying
# over the source code, installing dependencies and
# running the build command.
# Bonus: could you optimize this process by copying
# over the package.json and package-lock.json files
# first, and then copying over the rest of the source
# code after installing the dependencies? Why would
# this be a good idea?

# Stage 2: Serve the application with Nginx
FROM nginx:1.27.0-alpine3.19 as nginx

# Copy over a minimal server configuration.
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Nginx by default will look for files in /usr/share/nginx/html.
# To keep matters simple, we will copy our built application to that folder.

# Before that, we need to delete the default welcome to nginx page.
RUN rm /usr/share/nginx/html/* -rf

# Copy the built application from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 3001 to the outside
EXPOSE 3001

# When the container starts, Nginx will start as well
CMD ["nginx", "-g", "daemon off;"]
