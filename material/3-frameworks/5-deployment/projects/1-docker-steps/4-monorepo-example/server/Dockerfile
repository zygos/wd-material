# Start from the updated base image
FROM node:18.19.0-alpine3.18 AS builder

WORKDIR /app

# Copy package.json files and install dependencies
# On the server build we could prune the client dependencies
# and after the build stage we could install only the non-dev
# dependencies, though we will keep this simple.
COPY ../package*.json .
COPY client/package*.json client/
COPY server/package*.json server/
RUN npm ci

# Copy over the server source code
COPY server/ server/

# Build the server
WORKDIR /app/server
RUN npm run build

EXPOSE 3000

# Command Docker runs when it starts the container.
# In our case, this command is specified in server/package.json
# which does migrations and then starts the server.
CMD ["npm", "run", "prod"]
