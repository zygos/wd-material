# Stage 1: Build our front end
FROM node:18.19.0-alpine3.18 as builder

# TODO: Produce a /dist folder that contains
# the built application. This will require installing
# dependencies, running the build command and a few
# steps in between.

# Stage 2: Serve the application with Nginx
FROM nginx:1.25.3-alpine3.18 as nginx

# Now we are inside a different container.

# Copy over the server config that we created.
# Learning how to create a custom Nginx config is out
# of scope for this module.
# However, we recommend to read the provided nginx/default.conf
# file to understand what it does. It has a few very simple
# settings.
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Delete the default welcome to nginx page.
RUN rm /usr/share/nginx/html/* -rf

# By default, Nginx serves files from /usr/share/nginx/html.
# To keep things simple, we will copy our built application
# to that directory.
# Then, when someone will request Nginx for a file, it will
# try to look for it in this directory.
# We are copying some files from the "builder" (see the 2nd line
#  of this file) container to this container.
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 3001.
EXPOSE 3001

# Start Nginx. Daemon off means run in the foreground,
# which is what we want in a container.
CMD ["nginx", "-g", "daemon off;"]
